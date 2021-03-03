function exactString(string) {

	return new RegExp(`(?<![\\w])${escapeSpecialCharacters(string)}(?![\\w])`);
}

function escapeSpecialCharacters(string) {

	return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

function exactStringInClass(element, string) {

	return element.getAttribute('class').search(exactString(string)) >= 0;
}

module.exports = {exactString, escapeSpecialCharacters, exactStringInClass}
