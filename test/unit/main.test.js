const testCase = require('../cases/testCase.js');
const generateDom = require('../dom/generateDom.js');
const hydra = require("../../src/main.js");

testCase()
generateDom(`
<svg pkg="heroicons" icon="academicCap"></svg>
<svg pkg="fontawesome" icon="atom"></svg>`)


describe("hydra", function () {
	it("main", function () {
		hydra.hydrate({
			'fontawesome': require('../packs/fontawesome.js'),
			'heroicons': require('../packs/heroicons.js')
		})
	})
})
