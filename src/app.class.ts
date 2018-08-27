import { join } from 'path';
import { Server } from 'http';
import { Application, request } from './lib/Application.class';
import { Router } from './lib/Router.class';
import { response } from './lib/utils/Response.class';

export class App extends Application {
  private PUBLICDIR: string = join(process.cwd(), 'public');
  constructor(server: Server) {
    super(server);
    this.middleware();
    this.routes();
  }
  private middleware() {}
  private routes() {
    // send html
    this.get('/', (req: request, res: response) => {
      console.log('base url hit');
      res.sendFile(join(this.PUBLICDIR, 'index.html'));
    });

    let message = new Router();
    // send json
    message.get('/', (req: request, res: response) => {
      console.log('/message get hit');
      res.json({ message: "LET's Go" });
    });
    message.post('/', (req: request, res: response) => {
      console.log('/message post hit');
      res.json({ message: "LET's Go", bounce: req.body, query: req.query });
    });
    message.put('/', (req: request, res: response) => {
      console.log('/message put hit');
      res.json({ message: "LET's Go", bounce: req.body, query: req.query, params: req.params });
    });
    this.use('/message', message);
    console.log(this.reqCallbacks);
  }
}
