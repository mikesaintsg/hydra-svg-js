export default function (element, attribute, value) {
	const current = element.getAttribute(attribute)

	if (current) {
		if (current.indexOf(value) === -1) {
			element.setAttribute(attribute, [current.trim(), value].join(" "));
		}
	} else {
		element.setAttribute(attribute, value);
	}
}
