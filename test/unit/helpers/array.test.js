import testCase from '../../cases/testCase';

testCase()

import { ifArray, ifNotArray } from '../../../src/helpers/array.js';

describe('Array helper', function () {

	context('ifArray function', function () {
		context('takes an item, determines if array, and the callback is', function () {

			it('invoked if instance of Array', function () {

				const testItem = ["this is an array"]

				let isArray = false

				ifArray(testItem, () => {
					isArray = true
				})

				expect(isArray).deep.equals(true)
			});

			it('Not invoked if Not instance of Array', function () {

				const testItem = {object: "this is an object"}

				let isArray = false

				ifArray(testItem, () => {
					isArray = true
				})

				expect(isArray).deep.equals(false)
			});
		});
	});

	context('ifNotArray function', function () {
		context('takes an item, determines if array, and the callback is', function () {

			it('invoked if Not instance of Array', function () {

				const testItem = {object: "this is an object"}

				let isArray = false

				ifNotArray(testItem, () => {
					isArray = true
				})

				expect(isArray).deep.equals(true)
			});

			it('Not invoked if instance of Array', function () {


				const testItem = ["this is an array"]

				let isArray = false

				ifNotArray(testItem, () => {
					isArray = true
				})

				expect(isArray).deep.equals(false)
			});
		});
	});
});
