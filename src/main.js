import {forIn} from './helpers/object.js';
import {exactStringInClass} from './helpers/regex.js';
import packages from './packs/index.js';
import {attributesHydrate} from "./svg/attributes.js";
import {generateElementAndAppend} from "./svg/elements.js";

function checkElementForIconNameInPacks(element, packs, callback) {
	forIn(packs, (icons) => {
		icons.forEach((icon) => {
			if (exactStringInClass(element, icon.name)) callback(element, icon);
		});
	});
}

const hydra = {
	async hydrate() {
		await Array.from(document.getElementsByTagName('svg')).forEach((element) => {
			checkElementForIconNameInPacks(element,
				packages, (checkedElement, icon) => {
					attributesHydrate(checkedElement, icon);
					generateElementAndAppend(checkedElement, icon);
				});
		});
	},
};

export default hydra;
