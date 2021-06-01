const testCase = require('../cases/testCase.js');
const generateDom = require('../dom/generateDom.js');
const hydrate = require("../../src/main.js");

testCase()
generateDom(`
<svg pkg="heroicons" icon="academicCap" id="target"></svg>
<svg pkg="fontawesome" icon="atom" id="nottarget"></svg>`)


describe("hydra", function () {
	it("main", function () {
		hydrate({
			'fontawesome': require('../packs/fontawesome.js'),
			'heroicons': require('../packs/heroicons.js')
		})

		document.getElementById('target').setAttribute('icon', 'something')

	})
})
