const createElementObject = function (element) {
	const elementObject = {};

	appendAttributes(element, elementObject)
	appendChildren(element, elementObject);

	return elementObject;
}

const appendAttributes = function (element, object) {
	const attributes = element.getAttributeNames()

	for (let i = 0; i < attributes.length; i++) {
		const attribute = attributes[i];

		object[attribute] = element.getAttribute(attribute)
	}
}

const appendChildren = function (element, object) {
	const children = Array.from(element.children);

	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		const tagName = child.tagName;
		const childObject = {};

		appendAttributes(child, childObject)

		object[tagName] = object[tagName] ? [...object[tagName], childObject] : [childObject]
	}
}

export default createElementObject;
