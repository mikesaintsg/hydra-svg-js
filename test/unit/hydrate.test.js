import objectFilter from "../helpers/objectFilter.js";
import getById from "../helpers/getById.js";
import attributesFilteredObject from "../helpers/attributesFilteredObject.js";
import hydrate from "../../src/hydrate.js";

const packs = {
	"feather": {
		"hash": {
			"xmlns": "http://www.w3.org/2000/svg",
			"width": "24",
			"height": "24",
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"class": "feather feather-hash",
			"line": [{"x1": "4", "y1": "9", "x2": "20", "y2": "9"}, {
				"x1": "4",
				"y1": "15",
				"x2": "20",
				"y2": "15"
			}, {"x1": "10", "y1": "3", "x2": "8", "y2": "21"}, {"x1": "16", "y1": "3", "x2": "14", "y2": "21"}]
		}
	}
}

const iconObject = packs.feather.hash;

beforeEach(() => {
	document.body.innerHTML = `<svg pack="feather" icon="hash" id="target"></svg>`
})

test("will set attributes", () => {
	const target = getById("target");

	hydrate(packs, [target], {observe: false})

	const expected = objectFilter(iconObject, value => !Array.isArray(value));

	const actual = attributesFilteredObject(target,
		name => !['pack', 'icon', 'id'].includes(name));

	expect(actual).toStrictEqual(expected);
})

test("will merge existing attributes", () => {
	const target = getById("target");

	target.setAttribute("class", "existing");

	hydrate(packs, [target], {observe: false})

	const expected = `existing ${iconObject.class}`
	const actual = target.getAttribute("class")

	expect(actual).toStrictEqual(expected);
})
