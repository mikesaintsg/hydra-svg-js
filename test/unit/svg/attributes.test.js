import testCase from '../../cases/testCase';
import generateDom from '../../app/dom';

testCase()
generateDom('app.html')

import {setAttributesFromObject, setWithExistingAttributes} from '../../../src/svg/attributes.js';

describe('Svg attributes', function () {
	context('setAttributesFromObject method', function () {
		it('adds attributes from the object to the element', function () {

			const expected = 'addedAttribute';
			const actual = (element) => element.getAttribute('addedAttribute')

			Array.from(document.getElementsByTagName('svg')).forEach((element) => {

				setAttributesFromObject(element, {
					addedAttribute: "addedAttribute",
				})

				expect(expected).deep.equals(actual(element))
			})
		});

		it('appends attributes and does not replace existing values', function () {

			const actual = (element) => element.getAttribute('class')

			Array.from(document.getElementsByTagName('svg')).forEach((element) => {

				const expected = 'appendedAttribute ' + element.getAttribute('class');

				setAttributesFromObject(element, {
					class: "appendedAttribute",
				})

				expect(expected).deep.equals(actual(element))
			})
		});

		it('it does not append attributes whose value is an Array', function () {

			const actual = (element) => element.getAttribute('path');

			Array.from(document.getElementsByTagName('svg')).forEach((element) => {

				setAttributesFromObject(element, {
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

				setWithExistingAttributes(element, "class", "appendedAttribute")

				expect(expected).deep.equals(actual(element))
			});
		});
	});
});
