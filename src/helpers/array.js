function ifArray(item, callback) {

	if (Array.isArray(item)) callback(item);
}

function ifNotArray(item, callback) {

	if (!Array.isArray(item)) callback(item);
}

module.exports = {ifArray, ifNotArray};
