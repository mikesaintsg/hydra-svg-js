import forEach from "./forEach.js";

export default function (element, object) {
	const attributes = element.getAttributeNames()

	forEach(attributes, attribute =>
		object[attribute] = element.getAttribute(attribute));
}
