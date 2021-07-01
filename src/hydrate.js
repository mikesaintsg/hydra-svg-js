import forEach from './utils/forEach.js';
import setAttributes from './utils/setAttributes.js';
import createChildAppend from './utils/createChildAppend.js';
import observe from './observe.js';

const hydrate = function (packs, svgs, options = {observe: false}) {

	forEach(svgs, svg => {
		const packName = svg.getAttribute('pack');
		const iconName = svg.getAttribute('icon');

		if (packName && iconName) {
			const importedPackIcon = packs[packName][iconName];

			setAttributes(svg, importedPackIcon);
			createChildAppend(svg, importedPackIcon);
		}
	})

	if (options.observe) observe(packs, svgs);
};

export default hydrate;
