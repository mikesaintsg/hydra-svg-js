import forIn from './forIn.js';
import unmergeAttribute from "./unmergeAttribute.js";

export default function (element, importedOldPack) {

	forIn(importedOldPack, (value, attribute) => {

		if (!Array.isArray(value)) {
			unmergeAttribute(element, attribute, value)
		}
	})
}
