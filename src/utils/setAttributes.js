import forIn from './forIn.js';

export default function (element, object) {

	forIn(object, (values, attribute) => {

		if (!Array.isArray(values)) {
			const currentAttr = element.getAttribute(attribute);

			if (currentAttr) values = values + ' ' + currentAttr;

			element.setAttribute(attribute, values);
		}
	});
}
