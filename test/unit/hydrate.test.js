import testCase from '../cases/testCase.js';
import objectFilter from "../helpers/objectFilter.js";
import hydratedDom from "../dom/hydratedDom.js";
import attributesObject from "../../src/utils/attributesObject.js";
import getById from "../helpers/getById.js";
import attributesFilteredObject from "../helpers/attributesFilteredObject.js";

testCase()

const packs = {
	"feather": {
		"activity": {
			"xmlns": "http://www.w3.org/2000/svg",
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"class": "feather feather-activity",
			"path": [{"d": "M22 12h-4l-3 9L9 3l-3 9H2"}]
		}
	}
}

const iconObject = packs.feather.activity;

describe("hydrate function", function () {

	it("will set attributes", function () {
		const initAttributes = {}

		hydratedDom(packs, `<svg pack="feather" icon="activity" id="target"></svg>`,
			() => Object.assign(initAttributes, attributesObject(getById('target'))))

		const expected = objectFilter(iconObject, value => !Array.isArray(value));

		const actual = attributesFilteredObject(getById('target'),
				name => !Object.keys(initAttributes).includes(name))

		expect(actual).deep.equals(expected);
	})

	it("will merge existing attributes", function () {
		hydratedDom(packs, `<svg pack="feather" icon="activity" id="target" class="existing"></svg>`)

		const target = document.getElementById('target');

		const expected = `existing ${iconObject.class}`
		const actual = target.getAttribute("class")

		expect(actual).deep.equals(expected);
	})
})
