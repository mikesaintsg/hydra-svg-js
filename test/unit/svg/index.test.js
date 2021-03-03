const testCase = require('../../cases/testCase')
const generateDom = require("../../app/dom");

testCase()
generateDom('app.html')

const Svg = require("../../../dist/svg/index.js")

describe('Svg class', function () {
	context('inDocument method', function () {
		it('returns an array of SVG elements', function () {

			Svg.inDocument().forEach(function (item) {
				expect(item.tagName).deep.equals('svg')
			});
		});
	});
});
