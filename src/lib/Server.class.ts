import * as url from 'url';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import { parseRequestData, parseQueryFromUrl, endpointBuilder } from './utils/parse';
import { Response, response } from './utils/response.class';
import { Router } from './Router.class';

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
        throw new Error('use method requires callback if the first argument is a sring');
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
    if (arr[0] === '' && arr[1] === '') {
      return '/:' + method;
    } else {
      arr.shift();
      arr.push('/:' + method);
      let v: Icallbacks = this.reqCallbacks;
      for (var i = 0; i < arr.length; i++) {
        if (!v) {
          return null;
        }
        v = v[arr[i]];
      }
      return v;
    }
  };
}
// routeFinder = (arr: string[], method: string | undefined): any => {
//   console.log('rf', arr);
//   console.log('<<<<', method);
//   if (arr[0] === '' && arr[1] === '') {
//     return '/:' + method;
//   } else {
//     let v: Icallbacks = this.reqCallbacks;
//     console.log('>>>>>>>>>', v);
//     let fin_idx: number = arr.length - 1;
//     arr.forEach((path, i) => {
//       if (!v) {
//         return null;
//       } else if (i === fin_idx && method !== undefined) {
//         let end: string = arr[i];
//         v = v[end + ':' + method];
//       } else {
//         let end: string = arr[i];
//         if (end === '') {
//           end = '/';
//         }
//         v = v[end];
//       }
//     });
//   }
//   console.log('vvvvvvvv', v);
//   return v;
// };
