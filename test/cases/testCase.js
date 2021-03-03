function testCase() {
	const chai = require('chai')
	const {expect, should, assert} = chai
	chai.should()

	global.expect = expect;
	global.assert = assert
}

module.exports = testCase
