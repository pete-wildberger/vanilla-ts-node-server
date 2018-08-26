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
    this.reqCallbacks['GET:' + path] = callback;
  };

  post = (path: string, callback: Function) => {
    this.reqCallbacks['POST:' + path] = callback;
  };

  put = (path: string, callback: Function) => {
    this.reqCallbacks['PUT:' + path] = callback;
  };

  patch = (path: string, callback: Function) => {
    this.reqCallbacks['PATCH:' + path] = callback;
  };

  delete = (path: string, callback: Function) => {
    this.reqCallbacks['DELETE:' + path] = callback;
  };

  use = (callback: Function) => {
    this.middlewareCallbacks.push(callback);
  };

  setDefaultResponse = (callback: Function) => {
    this.reqCallbacks.default = callback;
  };

  setNotFoundResponse = (callback: Function) => {
    this.reqCallbacks.notFound = callback;
  };
}
