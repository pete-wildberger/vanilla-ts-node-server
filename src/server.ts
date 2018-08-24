import http from 'http';
import { App } from './App.class';

const server = http.createServer().listen(process.env.PORT, Number(process.env.HOST), () => {
  console.log(`listening on port ${process.env.PORT}`);
});

const app = new App(server);
