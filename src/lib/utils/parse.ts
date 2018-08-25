import { parse } from 'querystring';
import { request } from '../Router.class';

// 'body-parseresque' implementation TODO support more types
export function parseRequestData(req: request, data: any): any {
	const FORM_URLENCODED = 'application/x-www-form-urlencoded';
	let body: string = '';
	if (req.headers['content-type'] === FORM_URLENCODED) {
		body += data.toString();
		return parse(body);
	} else {
		throw new Error('Unsupported body type');
	}
}
// parse url query strings
export function parseQueryFromUrl(query: string): { [key: string]: any } {
	let result: { [key: string]: any } = {};
	query.split('&').forEach(part => {
		let item: string[] = part.split('=');
		result[item[0]] = decodeURIComponent(item[1]);
	});
	return result;
}
