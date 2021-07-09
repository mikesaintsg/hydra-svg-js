import forEach from "./forEach.js";
import attributesObject from "./attributesObject.js";

export default function (element) {
	const object = attributesObject(element);

	const children = [].slice.call(element.children);

	forEach(children, child => {
		const tagName = child.tagName;
		const childObject = attributesObject(child);

		object[tagName] = object[tagName]
			? [...object[tagName], childObject]
			: [childObject]
	})

	return object;
}
