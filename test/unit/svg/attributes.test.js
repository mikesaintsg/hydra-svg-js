const testCase = require('../../cases/testCase')
const generateDom = require("../../app/dom");

testCase()
generateDom('app.html')

const attributes = require("../../../dist/svg/attributes.js")

describe('Svg attributes', function () {
	context('setAttributesFromObject method', function () {
		it('adds attributes from the object to the element', function () {

			const expected = 'addedAttribute';
			const actual = (element) => element.getAttribute('addedAttribute')

			Array.from(document.getElementsByTagName('svg')).forEach((element) => {

				attributes.setAttributesFromObject(element, {
					addedAttribute: "addedAttribute",
				})

				expect(expected).deep.equals(actual(element))
			})
		});

		it('appends attributes and does not replace existing values', function () {

			const actual = (element) => element.getAttribute('class')

			Array.from(document.getElementsByTagName('svg')).forEach((element) => {

				const expected = 'appendedAttribute ' + element.getAttribute('class');

				attributes.setAttributesFromObject(element, {
					class: "appendedAttribute",
				})

				expect(expected).deep.equals(actual(element))
			})
		});

		it('it does not append attributes whose value is an Array', function () {

			const actual = (element) => element.getAttribute('path');

			Array.from(document.getElementsByTagName('svg')).forEach((element) => {

				attributes.setAttributesFromObject(element, {
					path: ["an Array instead of string"],
				})

				expect(null).deep.equals(actual(element))
			})
		});
	});


	context('setWithExistingAttributes method', function () {
		it('appends attributes and does not replace existing values', function () {

			const actual = (element) => element.getAttribute('class')

			Array.from(document.getElementsByTagName('svg')).forEach((element) => {

				const expected = 'appendedAttribute ' + element.getAttribute('class');

				attributes.setWithExistingAttributes(element, "class", "appendedAttribute")

				expect(expected).deep.equals(actual(element))
			});
		});
	});
});
