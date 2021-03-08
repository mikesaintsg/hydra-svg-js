import testCase from '../../cases/testCase';

testCase()

import heroicons from '../../../src/packs/heroicons';

describe('Heroicons pack', function () {
	it('is an Array', function () {

		const actual = Array.isArray(heroicons)

		expect(true).deep.equals(actual)
	})

	it('with many Objects', function () {

		heroicons.forEach((object) => {

			expect('object').deep.equals(typeof object)
		})
	})

	it('but not with Arrays', function () {

		heroicons.forEach((object) => {

			const actual = Array.isArray(object)

			expect(false).deep.equals(actual)
		})
	})
})
