export default function (element) {
	return element.getAttributeNames()
		.reduce(
			(acc, curr) => Object.assign(acc, {
				[curr]: element.getAttribute(curr)
			}), {})
}
