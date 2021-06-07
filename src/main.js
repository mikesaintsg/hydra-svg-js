import forEach from './utils/forEach.js';
import setAttributes from './utils/setAttributes.js';
import createChildAppend from './utils/createChildAppend.js';
import removeChildren from './utils/removeChildren.js';
import removePkgAttributes from './utils/removePkgAttributes.js';

const hydrate = function (pkgs, svgs, options = {observe: false}) {

	forEach(svgs, svg => {
		const pkgName = svg.getAttribute('pkg');
		const iconName = svg.getAttribute('icon');

		if (pkgName && iconName) {
			const importedPkgIcon = pkgs[pkgName][iconName];

			setAttributes(svg, importedPkgIcon);
			createChildAppend(svg, importedPkgIcon);
		}
	})

	if (options.observe) observe(pkgs, svgs);
};

const observe = function (pkgs, svgs) {

	const mutationObserver = new window.MutationObserver(mutations => {

		for (const mutation of mutations) {
			const svg = mutation.target;
			const changedAttr = mutation.attributeName;
			const oldValue = mutation.oldValue;

			const currentPkg = svg.getAttribute('pkg');
			const currentIcon = svg.getAttribute('icon');

			const oldPkg = changedAttr === 'pkg' ? oldValue : currentPkg;
			const oldIcon = changedAttr === 'icon' ? oldValue : currentIcon;

			const importedOldPkg = pkgs[oldPkg][oldIcon];
			const importedNewPkg = pkgs[currentPkg][currentIcon];

			removeChildren(svg);
			removePkgAttributes(svg, importedOldPkg);

			setAttributes(svg, importedNewPkg);
			createChildAppend(svg, importedNewPkg);
		}
	})

	forEach(svgs, svg => {
		const hasPkg = svg.hasAttribute('pkg');
		const hasIcon = svg.hasAttribute('icon');

		if (hasPkg && hasIcon) {
			mutationObserver.observe(svg, {
				attributeFilter: ['pkg', 'icon'],
				attributeOldValue: true
			});
		}
	})
};

export default hydrate;
