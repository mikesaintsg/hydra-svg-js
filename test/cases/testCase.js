import * as chai from "chai";

function testCase() {
	const {expect, should, assert} = chai
	chai.should()

	global.expect = expect;
	global.assert = assert
}

export default testCase;
