import * as url from 'url';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import { parseRequestData, parseQueryFromUrl } from './utils/parse';
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
    let endpoint: string = '';
    let path_arr: string[] = path.split('/');
    if (path_arr.length === 2) {
      endpoint = path_arr[1];
    }
    this.reqCallbacks[endpoint + ':POST'] = callback;
  };

  post = (path: string, callback: Function) => {
    let endpoint: string = '';
    let path_arr: string[] = path.split('/');
    if (path_arr.length === 2) {
      endpoint = path_arr[1];
    }
    this.reqCallbacks[endpoint + ':POST'] = callback;
  };

  put = (path: string, callback: Function) => {
    let endpoint: string = '';
    let path_arr: string[] = path.split('/');
    if (path_arr.length === 2) {
      endpoint = path_arr[1];
    }
    this.reqCallbacks[endpoint + ':PUT'] = callback;
  };

  patch = (path: string, callback: Function) => {
    let endpoint: string = '';
    let path_arr: string[] = path.split('/');
    if (path_arr.length === 2) {
      endpoint = path_arr[1];
    }
    this.reqCallbacks[endpoint + ':PATCH'] = callback;
  };

  delete = (path: string, callback: Function) => {
    let endpoint: string = '';
    let path_arr: string[] = path.split('/');
    if (path_arr.length === 2) {
      endpoint = path_arr[1];
    }
    this.reqCallbacks[endpoint + ':DELETE'] = callback;
  };

  use = (arg: string | Function, router?: any) => {
    if (typeof arg === 'string') {
      if (router) {
        this.reqCallbacks[arg] = router;
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
    let v: Icallbacks = this.reqCallbacks;
    let fin_idx: number = arr.length - 1;
    arr.forEach((path, i) => {
      if (!v) {
        return null;
      } else if (i === fin_idx && method !== undefined) {
        v = v[arr[i] + ':' + method];
      } else {
        v = v[arr[i]];
      }
    });
    return v;
  };
}
