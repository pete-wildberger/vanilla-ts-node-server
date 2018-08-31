import { endpointBuilder } from './utils/parse';

export interface Icallbacks {
	[key: string]: any;
}

export abstract class VServer {
	public reqCallbacks: Icallbacks;
	public middlewareCallbacks: Icallbacks;
	constructor() {
		this.reqCallbacks = {};
		this.middlewareCallbacks = [];
	}
	// http methods
	get = (path: string, callback: Function) => {
		const endpoint: string = endpointBuilder(path);
		this.reqCallbacks[endpoint + ':GET'] = callback;
	};

	post = (path: string, callback: Function) => {
		const endpoint: string = endpointBuilder(path);
		this.reqCallbacks[endpoint + ':POST'] = callback;
	};

	put = (path: string, callback: Function) => {
		const endpoint: string = endpointBuilder(path);
		this.reqCallbacks[endpoint + ':PUT'] = callback;
	};

	patch = (path: string, callback: Function) => {
		const endpoint: string = endpointBuilder(path);
		this.reqCallbacks[endpoint + ':PATCH'] = callback;
	};

	delete = (path: string, callback: Function) => {
		const endpoint: string = endpointBuilder(path);
		this.reqCallbacks[endpoint + ':DELETE'] = callback;
	};

	use = (arg: string | Function, router?: any) => {
		if (typeof arg === 'string') {
			if (router) {
				const endpoint: string = endpointBuilder(arg);
				console.log('use endpoint', endpoint);
				console.log('use callbacks', router.reqCallbacks);
				this.reqCallbacks[endpoint] = router.reqCallbacks;
			} else {
				throw new Error('use method requires callback if the first argument is a string');
			}
		} else {
			this.middlewareCallbacks.push(arg);
		}
	};

	setDefaultResponse = (callback: Function) => {
		this.reqCallbacks.default = callback;
	};

	setNotFoundResponse = (callback: Function) => {
		this.reqCallbacks.notFound = callback;
	};
	routeFinder = (arr: string[], method: string | undefined): any => {
		let v: Icallbacks = this.reqCallbacks;
		if (arr[1] === 'favicon.ico') {
			v = v['favicon.ico:GET'];
		}
		if (arr[0] === '' && arr[1] === '') {
			v = v['/:' + method];
		} else {
			arr.shift();
			arr.push('/:' + method);
			for (var i = 0; i < arr.length; i++) {
				if (!v) {
					return null;
				}
				v = v[arr[i]];
			}
		}
		return v;
	};
}
