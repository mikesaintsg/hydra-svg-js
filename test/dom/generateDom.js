import jsdom from 'jsdom';

const {JSDOM} = jsdom;

function generateDom(string) {
	const dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body>` + string + `</body></html>`);
	global.window = dom.window;
	global.document = dom.window.document;
}

export default generateDom;
