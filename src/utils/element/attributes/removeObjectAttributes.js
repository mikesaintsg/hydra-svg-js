import forIn from '../../object/forIn.js';
import unmergeAttribute from "./unmergeAttribute.js";

export default function (element, object) {

	forIn(object, (value, attribute) => {

		if (!Array.isArray(value)) {
			unmergeAttribute(element, attribute, value)
		}
	})
}
