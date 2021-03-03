const testCase = require('../../cases/testCase')

testCase()

const fontawesome = require('../../../dist/packs/fontawesome')

describe('Fontawesome pack', function () {
	it('is an Array', function () {

		const actual = Array.isArray(fontawesome)

		expect(true).deep.equals(actual)
	})

	it('with many Objects', function () {

		fontawesome.forEach((object) => {

			expect('object').deep.equals(typeof object)
		})
	})

	it('but not with Arrays', function () {

		fontawesome.forEach((object) => {

			const actual = Array.isArray(object)

			expect(false).deep.equals(actual)
		})
	})
})
