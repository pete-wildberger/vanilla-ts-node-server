import * as url from 'url';
import { parseRequestData, parseQueryFromUrl } from '../src/lib/utils/parse';

const mock_req = {
	url: '/message?id=1223',
	headers: { ['content-type']: 'application/x-www-form-urlencoded' }
};

describe('parseQueryFromUrl', () => {
	const urlParsed = url.parse(mock_req.url);
	const query: any = urlParsed.query;
	it('should parse the url query to correct format', done => {
		const result: { [key: string]: any } = parseQueryFromUrl(query);
		expect(result).toBe({ id: '1223' });
		done();
	});
});
