const attributes = require("./attributes");
const elements = require("./elements");

const Svg = {

	inDocument() {

		return Array.from(document.getElementsByTagName('svg'));
	},

	attributes() {

		return attributes;
	},

	elements() {

		return elements;
	}
}

module.exports = Svg;
