import * as request from 'request';

const BASE_URL: string = 'http://localhost:3000/';

describe('Typescript Server', () => {
  describe('GET /', () => {
    it('hit returns status code 200', done => {
      request.get(BASE_URL, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('hit returns json message', done => {
      request.get(BASE_URL, (error, response, body) => {
        expect(body).toBe(JSON.stringify({ message: "LET's Go" }));
        done();
      });
    });
  });
});
