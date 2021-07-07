import forIn from './forIn.js';
import unmergeAttribute from "./unmergeAttribute";

export default function (element, importedOldPack) {

	forIn(importedOldPack, (value, attribute) => {

		if (!Array.isArray(value)) {
			unmergeAttribute(element,attribute, value)
		}
	})
}
