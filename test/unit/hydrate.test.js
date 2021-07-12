import objectFilter from "../helpers/objectFilter.js";
import getById from "../helpers/getById.js";
import attributesFilteredObject from "../helpers/attributesFilteredObject.js";
import hydrate from "../../src/hydrate.js";

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

test("will set attributes", () => {
	document.body.innerHTML = `<svg pack="feather" icon="activity" id="target"></svg>`

	const initAttributes = ['pack', 'icon', 'id'];

	const svgs = [].slice.call(document.getElementsByTagName('svg'))

	hydrate(packs, svgs, {observe: false})

	const expected = objectFilter(iconObject, value => !Array.isArray(value));

	const actual = attributesFilteredObject(getById('target'),
		name => !initAttributes.includes(name));

	expect(actual).toStrictEqual(expected);
})

test("will merge existing attributes", () => {
	document.body.innerHTML = `<svg pack="feather" icon="activity" id="target" class="existing"></svg>`

	const svgs = [].slice.call(document.getElementsByTagName('svg'))

	hydrate(packs, svgs, {observe: false})

	const target = document.getElementById('target');

	const expected = `existing ${iconObject.class}`
	const actual = target.getAttribute("class")

	expect(actual).toStrictEqual(expected);
})
