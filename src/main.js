const svgArray = Array.from(document.getElementsByTagName('svg'))

exports.hydrate = async function (pkgs, options = {observe: false}) {

	forEach(svgArray, svg => {
		const pkgName = svg.getAttribute('pkg');
		const iconName = svg.getAttribute('icon');

		if(pkgName && iconName){
			const importedPkgIcon = pkgs[pkgName][iconName];

			setAttributesFromObject(svg, importedPkgIcon);
			generateElementAndAppend(svg, importedPkgIcon);
		}
	})

	if (options.observe) observe(pkgs);
};

const observe = function (pkgs) {

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
			generateElementAndAppend(svg, importedNewPkg);
		}
	})

	forEach(svgArray, svg => {
		const hasPkg = svg.hasAttribute('pkg');
		const hasIcon = svg.hasAttribute('icon');

		if(hasPkg && hasIcon) {
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

const generateElementAndAppend = function (svg, iconObject) {

	forIn(iconObject, (elementArray, elementName) => {

		if (Array.isArray(elementArray)) {

			forEach(elementArray, elementObject => {

				const createdElement = document.createElementNS("http://www.w3.org/2000/svg", elementName);

				setAttributesFromObject(createdElement, elementObject);

				svg.appendChild(createdElement);
			})
		}
	})
};

const removeAllChildren = function (svg) {
	const children = Array.from(svg.children);

	forEach(children,child => child.remove());
};

const removeOldPkgAttributeValues = function (svg, importedOldPkg) {

	forIn(importedOldPkg, (oldValues, attribute) => {

		if (!Array.isArray(oldValues)) {
			const currentAttr = svg.getAttribute(attribute);
			const replacement = currentAttr.replace(oldValues, "");

			if (currentAttr.replace(oldValues, "").trim() === "") {
				svg.removeAttribute(attribute);
			} else {
				svg.setAttribute(attribute, replacement);
			}
		}
	})
};

const forIn = function (object, callback) {

	for (const key in object) {

		if (Object.prototype.hasOwnProperty.call(object, key)) {
			callback(object[key], key)
		}
	}
};

const forEach = function (array, callback) {
	const length = array.length;

	let i = -1
	while (++i !== length) {
		callback(array[i])
	}
}
