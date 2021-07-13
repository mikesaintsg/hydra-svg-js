import forEach from '../../array/forEach.js';
import forIn from '../../object/forIn.js';
import setObjectAttributes from '../attributes/setObjectAttributes.js';

export default function (element, iconObject) {

	forIn(iconObject, (elementArray, elementName) => {

		if (Array.isArray(elementArray)) {

			forEach(elementArray, elementObject => {

				const createdElement = document.createElementNS("http://www.w3.org/2000/svg", elementName);

				setObjectAttributes(createdElement, elementObject);

				element.appendChild(createdElement);
			})
		}
	})
}
