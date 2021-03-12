import {forIn} from '../helpers/object.js';
import {ifArray} from '../helpers/array.js';
import {attributesHydrate} from "./attributes.js";

export function createElement(element) {

	return document.createElementNS("http://www.w3.org/2000/svg", element);
}

export function generateElementAndAppend(svg, iconObject) {

	forIn(iconObject, (values, element) => {

		ifArray(values, () => {

			values.forEach((elementObject) => {

				svg.appendChild(
					attributesHydrate(
						createElement(element), elementObject));
			})
		})
	})

	return svg;
}
