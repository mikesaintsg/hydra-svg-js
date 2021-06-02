const testCase = require('../cases/testCase.js');
const generateDom = require('../dom/generateDom.js');
const hydrate = require("../../src/main.js");

testCase()
generateDom(`
<svg pkg="feather" icon="activity" id="target"></svg>`)


describe("hydra", function () {
	it("main", function () {
		hydrate({
			'feather': require('../packs/feather.json'),
			'zondicons': require('../packs/zondicons.json')
		})

		//const target = document.getElementById('target')
	})
})
