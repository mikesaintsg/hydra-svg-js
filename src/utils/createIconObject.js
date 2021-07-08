import forEach from "./forEach.js";

export default function (element) {
	const object = {};

	const names = element.getAttributeNames()
	const attributes = {}

	forEach(names, name =>
		attributes[name] = element.getAttribute(name));

	Object.assign(object, attributes);

	const children = [].slice.call(element.children);

	forEach(children, child => {
		const tagName = child.tagName;
		const childObject = {};
		const attributes = element.getAttributeNames()

		forEach(attributes, name =>
			childObject[name] = element.getAttribute(name));

		object[tagName] = object[tagName]
			? [...object[tagName], childObject]
			: [childObject]
	})

	return object;
}
