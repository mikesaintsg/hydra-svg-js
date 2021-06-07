export default function (array, callback) {
	const length = array.length;

	let i = -1
	while (++i !== length) {
		callback(array[i])
	}
}
