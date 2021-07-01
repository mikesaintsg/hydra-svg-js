import forEach from "./forEach.js";
import setElementObjectAttributes from "./setElementObjectAttributes.js";

export default function (element, object) {
	const children = [].slice.call(element.children);

	forEach(children, child => {
		const tagName = child.tagName;
		const childObject = {};

		setElementObjectAttributes(child, childObject)

		object[tagName] = object[tagName]
			? [...object[tagName], childObject]
			: [childObject]
	})
}
