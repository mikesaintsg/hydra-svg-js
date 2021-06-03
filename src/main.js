//const svgs = [].slice.call(document.getElementsByTagName('svg'))

const hydrate = function (pkgs, svgs, options = {observe: false}) {

	forEach(svgs, svg => {
		const pkgName = svg.getAttribute('pkg');
		const iconName = svg.getAttribute('icon');

		if (pkgName && iconName) {
			const importedPkgIcon = pkgs[pkgName][iconName];

			setAttributesFromObject(svg, importedPkgIcon);
			createChildFromObjectAndAppend(svg, importedPkgIcon);
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

			removeAllChildren(svg);
			removeOldPkgAttributeValues(svg, importedOldPkg);

			setAttributesFromObject(svg, importedNewPkg);
			createChildFromObjectAndAppend(svg, importedNewPkg);
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

const setAttributesFromObject = function (element, object) {

	forIn(object, (values, attribute) => {

		if (!Array.isArray(values)) {
			const currentAttr = element.getAttribute(attribute);

			if (currentAttr) values = values + ' ' + currentAttr;

			element.setAttribute(attribute, values);
		}
	});
};

const createChildFromObjectAndAppend = function (element, iconObject) {

	forIn(iconObject, (elementArray, elementName) => {

		if (Array.isArray(elementArray)) {

			forEach(elementArray, elementObject => {

				const createdElement = document.createElementNS("http://www.w3.org/2000/svg", elementName);

				setAttributesFromObject(createdElement, elementObject);

				element.appendChild(createdElement);
			})
		}
	})
};

const removeAllChildren = function (element) {
	const children = [].slice.call(element.children);

	forEach(children, child => child.remove());
};

const removeOldPkgAttributeValues = function (element, importedOldPkg) {

	forIn(importedOldPkg, (oldValues, attribute) => {

		if (!Array.isArray(oldValues)) {
			const currentAttr = element.getAttribute(attribute);
			const replacement = currentAttr.replace(oldValues, "");

			if (currentAttr.replace(oldValues, "").trim() === "") {
				element.removeAttribute(attribute);
			} else {
				element.setAttribute(attribute, replacement);
			}
		}
	})
};

const forIn = function (object, callback) {

	for (const key in object) {
		callback(object[key], key)
	}
};

const forEach = function (array, callback) {
	const length = array.length;

	let i = -1
	while (++i !== length) {
		callback(array[i])
	}
}

module.exports = hydrate;
