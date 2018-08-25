import * as url from 'url';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import { parseRequestData, parseQueryFromUrl } from './utils/parse';
import { Response, response } from './utils/response.class';

export interface request extends IncomingMessage {
  body: any;
  params: any;
  query: { [key: string]: any };
  url: string;
}
export interface IreqCallbacks {
  [key: string]: any;
}

export class Router {
  private reqCallbacks: IreqCallbacks;
  constructor(server: Server) {
    this.reqCallbacks = {};
    this.events(server);
  }
  events = (server: Server) => {
    server.on('request', (req: request, res: response) => {
      const Res = new Response(req);
      const method = req.method;
      const urlParsed = url.parse(req.url);
      const query = urlParsed.query;
      let data = '';

      res.json = function(path) {
        Res.json.call(res, path);
      };

      res.sendFile = function(path) {
        Res.sendFile.call(res, path);
      };

      req.on('data', (chunk: any) => {
        data += chunk;
      });

      req.on('end', () => {
        const callback = this.reqCallbacks[method + ':' + urlParsed.pathname];

        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
          if (data) {
            if (query) {
              req.query = parseQueryFromUrl(query);
            }
            req.body = parseRequestData(req, data);
          }
        }

        if (callback) {
          callback.call({}, req, res);
        } else if (this.reqCallbacks.default) {
          this.reqCallbacks.default.call({}, req, res);
        } else if (this.reqCallbacks.notFound) {
          this.reqCallbacks.notFound.call({}, req, res);
        } else {
          this.defaultNotFoundCallback.call({}, req, res);
        }
      });
    });
  };
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

  setDefaultResponse = (callback: Function) => {
    this.reqCallbacks.default = callback;
  };

  setNotFoundResponse = (callback: Function) => {
    this.reqCallbacks.notFound = callback;
  };

  defaultNotFoundCallback(req: request, res: response) {
    res.json({
      message: 'URL not found!',
      method: req.method,
      url: req.url
    });
  }
}
