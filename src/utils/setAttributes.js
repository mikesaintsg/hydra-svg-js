import forIn from './forIn.js';

import mergeAttribute from "./mergeAttribute";

export default function (element, object) {

	forIn(object, (values, attribute) => {

		if (!Array.isArray(values)) {
			mergeAttribute(element, attribute, values)
		}
	});
}
