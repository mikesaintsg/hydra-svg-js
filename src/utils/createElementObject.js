import setElementObjectAttributes from "./setElementObjectAttributes.js";
import setElementObjectChildren from "./setElementObjectChildren.js";

export default function (element) {
	const elementObject = {};

	setElementObjectAttributes(element, elementObject)
	setElementObjectChildren(element, elementObject);

	return elementObject;
}
