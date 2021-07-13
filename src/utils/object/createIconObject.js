import forEach from "../array/forEach.js";
import createAttributesObject from "./createAttributesObject.js";

export default function (element) {
	const object = createAttributesObject(element);

	const children = [].slice.call(element.children);

	forEach(children, child => {
		const tagName = child.tagName;
		const childObject = createAttributesObject(child);

		object[tagName] = object[tagName]
			? [...object[tagName], childObject]
			: [childObject]
	})

	return object;
}
