import forIn from './forIn.js';

export default function (element, importedOldPack) {

	forIn(importedOldPack, (oldValues, attribute) => {

		if (!Array.isArray(oldValues)) {
			const currentAttr = element.getAttribute(attribute);
			const replacement = currentAttr.replace(oldValues, "");

			if (currentAttr.replace(oldValues, "").trim() === "") {
				element.removeAttribute(attribute);
			} else {
				element.setAttribute(attribute, replacement);
			}
		}
	})
}
