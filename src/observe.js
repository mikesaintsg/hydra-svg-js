import removeChildren from "./utils/removeChildren.js";
import removePackAttributes from "./utils/removePackAttributes.js";
import setAttributes from "./utils/setAttributes.js";
import createChildAppend from "./utils/createChildAppend.js";
import forEach from "./utils/forEach.js";

export default function (packs, svgs) {

	const mutationObserver = new window.MutationObserver(mutations => {

		for (const mutation of mutations) {
			const svg = mutation.target;
			const changedAttr = mutation.attributeName;
			const oldValue = mutation.oldValue;

			const currentPack = svg.getAttribute('pack');
			const currentIcon = svg.getAttribute('icon');

			const oldPack = changedAttr === 'pack' ? oldValue : currentPack;
			const oldIcon = changedAttr === 'icon' ? oldValue : currentIcon;

			const importedOldPack = packs[oldPack][oldIcon];
			const importedNewPack = packs[currentPack][currentIcon];

			removeChildren(svg);
			removePackAttributes(svg, importedOldPack);

			setAttributes(svg, importedNewPack);
			createChildAppend(svg, importedNewPack);
		}
	})

	forEach(svgs, svg => {
		const hasPack = svg.hasAttribute('pack');
		const hasIcon = svg.hasAttribute('icon');

		if (hasPack && hasIcon) {
			mutationObserver.observe(svg, {
				attributeFilter: ['pack', 'icon'],
				attributeOldValue: true
			});
		}
	})
}
