export default function (object, filter) {
	return Object.fromEntries(
		Object.entries(object).filter(
			([key, value]) => filter(value, key)
		)
	)
}
