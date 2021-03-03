const fs = require('fs')
const path = require('path');

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

function htmlFileString(file) {
	return fs.readFileSync(path.join(__dirname, './doms/' + file)).toString('utf-8');
}

function generateDom(file) {
	const dom = new JSDOM(htmlFileString(file));

	global.window = dom.window;
	global.document = dom.window.document;
}

module.exports = generateDom
