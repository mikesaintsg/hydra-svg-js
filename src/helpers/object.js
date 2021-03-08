export function forIn(object, callback) {
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) callback(object[key], key);
	}
}
