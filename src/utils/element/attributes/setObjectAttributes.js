import forIn from '../../object/forIn.js';

import mergeAttribute from "./mergeAttribute.js";

export default function (element, object) {

	forIn(object, (values, attribute) => {

		if (!Array.isArray(values)) {
			mergeAttribute(element, attribute, values)
		}
	});
}
