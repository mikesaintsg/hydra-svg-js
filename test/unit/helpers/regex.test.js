import testCase from '../../cases/testCase';
import generateDom from '../../app/dom';

testCase()
generateDom('app.html')

import { escapeSpecialCharacters, exactString, exactStringInClass } from '../../../src/helpers/regex.js';

describe('Regex helper', function () {
	context('escapeSpecialCharacters function', function () {
		it('escapes special characters that can be injected into regular expressions', function () {

			const expected = 'test\\-\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|\\#\\\\s\\,\\/\\:\\!\\<\\=';
			const actual = escapeSpecialCharacters('test-[]{}()*+?.\\^$|#\\s,/:!<=')

			expect(expected).deep.equals(actual)
		});
	});

	context('exactString function', function () {
		it('creates a regular expression around the string of the parameter provided', function () {

			const expected = "/(?<![\\w])test(?![\\w])/"
			const actual = `${exactString("test")}`

			expect(expected).deep.equals(actual)
		});
	});

	context('exactStringInClass function', function () {
		context('searches the class of an element for a specific string and', function () {
			it('returns true if found', function () {

				const targetElement = document.getElementById('target')
				const actual = exactStringInClass(targetElement, 'targetClass')

				expect(true).deep.equals(actual)
			});

			it('returns false if not found', function () {

				const nottargetElement = document.getElementById('nottarget')
				const actual = exactStringInClass(nottargetElement, 'targetClass')

				expect(false).deep.equals(actual)
			});
		})
	});
});
