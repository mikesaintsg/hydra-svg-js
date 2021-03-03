const {forIn} = require("./helpers/object.js");
const {exactStringInClass} = require("./helpers/regex.js");
const packages = require('./packs/index')
const Svg = require('./svg/index.js')

const hydra = {

	hydrate() {

		Svg.inDocument().forEach((element) => {

			this.checkElementForIconNameInPacks(element,
				packages, (checkedElement, icon) => {

					Svg.attributes().hydrate(checkedElement, icon);
					Svg.elements().generate(checkedElement, icon);
				});
		});
	},

	checkElementForIconNameInPacks(element, packs, callback) {

		forIn(packs, (icons) => {

			icons.forEach((icon) => {

				if (exactStringInClass(element, icon.name)) callback(element, icon);
			});
		});
	}
};

module.exports = hydra;
