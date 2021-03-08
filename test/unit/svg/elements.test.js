import testCase from '../../cases/testCase';
import generateDom from '../../app/dom';

testCase()
generateDom('app.html')

import {createElement,generateElementAndAppend} from '../../../src/svg/elements.js';
import testpack from '../packs/testpack';

describe("Svg elements", function () {
	context("create method", function () {
		it("creates a new svg type of element", function () {

			const expected = "path";
			const actual = createElement('path').tagName;

			expect(expected).deep.equals(actual)
		})
	})

	context("generate method", function () {
		it("generates hydrated element and attaches to svg element", function () {

			const svg = document.getElementById('target');
			const iconObject = testpack[0]

			expect(null).deep.equals(svg.childNodes.item(0))

			const actual = generateElementAndAppend(svg, iconObject).childNodes.item(0).tagName

			expect('path').deep.equals(actual)
		})
	})
})
