export default function (string) {
	const studly = string.split(/[\-_]/)
		.map(split => split.charAt(0).toUpperCase() + split.slice(1))
		.join("");

	return studly.charAt(0).toLowerCase() + studly.slice(1)
}
