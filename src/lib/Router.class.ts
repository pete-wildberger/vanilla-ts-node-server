import * as url from 'url';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import { parseRequestData, parseQueryFromUrl } from './utils/parse';
import { Response, response } from './utils/response.class';
import { VServer, Icallbacks } from './Server.class';

export class Router extends VServer {
  constructor(server: Server) {
    super();
  }
}
