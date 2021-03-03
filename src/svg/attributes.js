const {forIn} = require("../helpers/object.js");
const {ifNotArray} = require("../helpers/array.js");

const attributes = {

	hydrate(element, object) {

		return this.setAttributesFromObject(element, object);
	},

	setAttributesFromObject(element, object) {

		forIn(object, (values, attribute) => {

			ifNotArray(values, (value) => {

				this.setWithExistingAttributes(element, attribute, value);
			});
		});

		return element;
	},

	setWithExistingAttributes(element, attribute, value) {

		if (element.getAttribute(attribute)) value = value + ' ' + element.getAttribute(attribute);

		element.setAttribute(attribute, value);

		return element;
	}
}

module.exports = attributes;
