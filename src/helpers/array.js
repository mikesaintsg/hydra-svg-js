export function ifArray(item, callback) {

	if (Array.isArray(item)) callback(item);
}

export function ifNotArray(item, callback) {

	if (!Array.isArray(item)) callback(item);
}
