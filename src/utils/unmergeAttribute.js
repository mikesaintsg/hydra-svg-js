export default function (element, attribute, value){
	const current = element.getAttribute(attribute);

	if(current){
		const replacement = current.split(value)
			.map(attr => attr.replace(/\s+/gm, ' ').trim())
			.filter(attr => attr !== '')
			.join(" ")
			.trim();

		replacement === ""
			? element.removeAttribute(attribute)
			: element.setAttribute(attribute, replacement);
	}
}
