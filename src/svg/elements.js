const {attributesHydrate} = require("./attributes.js");

exports.createElement = function (element) {

	return document.createElementNS("http://www.w3.org/2000/svg", element);
}

exports.generateElementAndAppend = function (svg, iconObject) {

	for (const element in iconObject) {

		const values = iconObject[element];

		if (Array.isArray(values)) {

			values.forEach((elementObject) => {

				svg.appendChild(
					attributesHydrate(
						exports.createElement(element), elementObject));
			})
		}
	}

	return svg;
}
