import {forIn} from '../helpers/object.js';
import {ifNotArray} from '../helpers/array.js';

export function attributesHydrate(element, object) {

	return setAttributesFromObject(element, object);
}

export function setAttributesFromObject(element, object) {

	forIn(object, (values, attribute) => {

		ifNotArray(values, (value) => {

			setWithExistingAttributes(element, attribute, value);
		});
	});

	return element;
}

export function setWithExistingAttributes(element, attribute, value) {

	if (element.getAttribute(attribute)) value = value + ' ' + element.getAttribute(attribute);

	element.setAttribute(attribute, value);

	return element;
}
