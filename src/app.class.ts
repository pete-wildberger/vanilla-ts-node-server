import { join } from 'path';
import { Server } from 'http';
import { Router, request, response } from './lib/Router.class';

export class App extends Router {
	private PUBLICDIR: string = join(process.cwd(), 'public');
	constructor(server: Server) {
		super(server);
		this.routes();
	}
	private routes() {
		// send html
		this.get('/', (req: request, res: response) => {
			console.log('base url hit');
			res.sendFile(join(this.PUBLICDIR, 'index.html'));
		});
		// send json
		this.get('/message', (req: request, res: response) => {
			console.log('/message get hit');
			res.json({ message: "LET's Go" });
		});
		this.post('/message', (req: request, res: response) => {
			console.log('/message post hit');
			res.json({ message: "LET's Go", bounce: req.body, query: req.query });
		});
	}
}
