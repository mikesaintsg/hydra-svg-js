export function exactString(string) {

	return new RegExp(`(?<![\\w])${escapeSpecialCharacters(string)}(?![\\w])`);
}

export function escapeSpecialCharacters(string) {

	return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

export function exactStringInClass(element, string) {

	return element.getAttribute('class').search(exactString(string)) >= 0;
}
