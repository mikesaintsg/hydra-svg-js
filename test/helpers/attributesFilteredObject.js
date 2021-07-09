export default function (element, filter) {
	return element.getAttributeNames()
		.filter(filter)
		.reduce(
			(acc, curr) => Object.assign(acc, {
				[curr]: element.getAttribute(curr)
			}), {})
}
