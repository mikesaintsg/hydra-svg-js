const {forIn} = require("../helpers/object.js");
const {ifArray} = require("../helpers/array.js");

const attributes = require("./attributes");

const elements = {

	create(element) {

		return document.createElementNS("http://www.w3.org/2000/svg", element);
	},

	generate(svg, iconObject) {

		forIn(iconObject, (values, element) => {

			ifArray(values, () => {

				values.forEach((elementObject) => {

					svg.appendChild(
						attributes.hydrate(
							this.create(element), elementObject));
				})
			})
		})
		return svg;
	}
}

module.exports = elements;
