import forEach from './utils/array/forEach.js';
import setObjectAttributes from './utils/element/attributes/setObjectAttributes.js';
import appendObjectChildren from './utils/element/children/appendObjectChildren.js';
import observe from './observe.js';

export default function (packs, svgs, options = {observe: false}) {

	forEach(svgs, svg => {
		const packName = svg.getAttribute('pack');
		const iconName = svg.getAttribute('icon');

		if (packName && iconName) {
			const iconObject = packs[packName][iconName];

			setObjectAttributes(svg, iconObject);
			appendObjectChildren(svg, iconObject);
		}
	})

	if (options.observe) observe(packs, svgs);
}
