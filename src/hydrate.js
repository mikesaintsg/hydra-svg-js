import forEach from './utils/forEach.js';
import setObjectAttributes from './utils/setObjectAttributes.js';
import appendObjectChild from './utils/appendObjectChild.js';
import observe from './observe.js';

export default function (packs, svgs, options = {observe: false}) {

	forEach(svgs, svg => {
		const packName = svg.getAttribute('pack');
		const iconName = svg.getAttribute('icon');

		if (packName && iconName) {
			const importedPackIcon = packs[packName][iconName];

			setObjectAttributes(svg, importedPackIcon);
			appendObjectChild(svg, importedPackIcon);
		}
	})

	if (options.observe) observe(packs, svgs);
}
