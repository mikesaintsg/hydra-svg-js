const chai = require('chai');

function testCase() {
	const {expect, should, assert} = chai
	chai.should()

	global.expect = expect;
	global.assert = assert
}

module.exports = testCase;
