export default function (object, callback) {

	for (const key in object) {
		callback(object[key], key)
	}
}
