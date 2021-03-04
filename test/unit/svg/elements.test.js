const testCase = require('../../cases/testCase')
const generateDom = require("../../app/dom");

testCase()
generateDom('app.html')

const elements = require("../../../dist/svg/elements.js")

const testpack = require('../packs/testpack')

describe("Svg elements", function () {
	context("create method", function () {
		it("creates a new svg type of element", function () {

			const expected = "path";
			const actual = elements.create('path').tagName;

			expect(expected).deep.equals(actual)
		})
	})

	context("generate method", function () {
		it("generates hydrated element and attaches to svg element", function () {

			const svg = document.getElementById('target');
			const iconObject = testpack[0]

			expect(null).deep.equals(svg.childNodes.item(0))

			const actual = elements.generate(svg, iconObject).childNodes.item(0).tagName

			expect('path').deep.equals(actual)
		})
	})
})
