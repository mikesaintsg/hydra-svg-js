import testCase from '../../cases/testCase';

testCase()

import { forIn } from '../../../src/helpers/object.js';

describe('Object helper', function () {
	context('forIn function', function () {
		it('takes an object and callback should return value and key parameter', function () {

			const testObject = {key1: "value1", key2: "value2"}

			forIn(testObject, function (value, key) {
				expect(value).deep.equals(testObject[key])
			});

		});
	});
});
