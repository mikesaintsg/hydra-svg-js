import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';
const {JSDOM} = jsdom;

function htmlFileString(file) {
	return fs.readFileSync(path.join(__dirname, './doms/' + file)).toString('utf-8');
}

function generateDom(file) {
	const dom = new JSDOM(htmlFileString(file));

	global.window = dom.window;
	global.document = dom.window.document;
}

export default generateDom;
