import objectFilter from "../src/utils/object/objectFilter.js";
import getById from "../src/utils/element/getById.js";
import attributesFilteredObject from "../src/utils/object/attributesFilteredObject.js";
import hydrate from "../src/hydrate.js";

describe("hydrate function", () => {
	const packs = {
		"test-pack": {
			"test-icon": {
				"class": "test-class",
				"test-child": [{"attribute": "value"}],
				"test-children": [{"attribute": "value"},{"attribute": "value"}]
			}
		}
	}

	const iconObject = packs["test-pack"]["test-icon"];

	let target;

	beforeEach(() => {
		document.body.innerHTML = `<svg pack="test-pack" icon="test-icon" id="target"></svg>`;

		target = getById("target");
	})

	test("will set attributes", () => {
		hydrate(packs, [target], {observe: false})

		const expected = objectFilter(iconObject, value => !Array.isArray(value));
		const actual = attributesFilteredObject(target,
			name => !['pack', 'icon', 'id'].includes(name));

		expect(actual).toStrictEqual(expected);
	})

	test("will merge existing attribute", () => {
		target.setAttribute("class", "existing");

		hydrate(packs, [target], {observe: false})

		const expected = `existing ${iconObject.class}`
		const actual = target.getAttribute("class")

		expect(actual).toStrictEqual(expected);
	})

	test("will trim whitespace of current attribute when merged", () => {
		target.setAttribute("class", " existing ");

		hydrate(packs, [target], {observe: false})

		const expected = `existing ${iconObject.class}`
		const actual = target.getAttribute("class")

		expect(actual).toStrictEqual(expected);
	})
})
