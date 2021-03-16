exports.attributesHydrate = function (element, object) {

	return exports.setAttributesFromObject(element, object);
}

exports.setAttributesFromObject = function (element, object) {
	for (const attribute in object) {

		const values = object[attribute];

		if (!Array.isArray(values)) {

			exports.setWithExistingAttributes(element, attribute, values);
		}
	}

	return element;
}

exports.setWithExistingAttributes = function (element, attribute, value) {

	if (element.getAttribute(attribute)) value = value + ' ' + element.getAttribute(attribute);

	element.setAttribute(attribute, value);

	return element;
}
