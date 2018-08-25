import * as request from 'request';

const BASE_URL: string = 'http://localhost:3000/';
const MESS_URL: string = 'http://localhost:3000/message';

describe('Typescript Server', () => {
	describe('GET /', () => {
		it('hit returns status code 200', done => {
			request.get(BASE_URL, (error, response, body) => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	});

	describe('GET /message', () => {
		it('GET /message returns status code 200', done => {
			request.get(MESS_URL, (error, response, body) => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
		it('GET /message returns json message', done => {
			request.get(MESS_URL, (error, response, body) => {
				expect(body).toBe(JSON.stringify({ message: "LET's Go" }));
				done();
			});
		});
	});

	describe('POST /message', () => {
		const req_body = { dog: 'Otto' };
		const query: string = 'id=1223';

		it('POST /message returns json message', done => {
			request.post(`${MESS_URL}?${query}`, { body: req_body }, (error, response, body) => {
				expect(response.statusCode).toBe(200);
				expect(body).toBe(
					JSON.stringify({
						message: "LET's Go",
						bounce: {
							dog: 'Otto'
						},
						query: {
							id: '1223'
						}
					})
				);
				done();
			});
		});
	});
});
