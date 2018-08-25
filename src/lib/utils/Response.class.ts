import { Server, IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';

export interface response extends ServerResponse {
  sendFile: (path: string) => void;
  json: (res: any) => void;
}
export class Response<response> extends ServerResponse {
  constructor(req: IncomingMessage) {
    super(req);
  }
  sendFile(path: string): void {
    this.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readFile(path, (err: any, data: any) => {
      if (err) throw err;
      this.end(data);
    });
  }

  json(body: any): void {
    let json = JSON.stringify(body);
    this.writeHead(200, {
      'Content-Length': Buffer.byteLength(json),
      'Content-type': 'application/json'
    });
    this.write(json);
    this.end();
  }
}
