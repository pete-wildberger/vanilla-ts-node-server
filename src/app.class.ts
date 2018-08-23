import { Server } from 'http';
import { Router, request, response } from '../lib/Router.class';

export class App extends Router {
	constructor(server: Server) {
		super(server);
		this.routes();
	}
	routes() {
		this.get('/', (req: request, res: response) => {
			console.log('base url hit');
			res.json({ message: "LET's Go" });
		});
	}
}
