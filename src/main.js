const svgCache = [];

const svgList = document.getElementsByTagName('svg');

const svgListLength = svgList.length;

for (let i = 0; i < svgListLength; i++) {
	const svg = svgList[i];

	const pkg = svg.getAttribute('pkg');
	const icon = svg.getAttribute('icon');

	if (pkg && icon) {
		svgCache.push({svg, pkg, icon});
	}
}

const svgCacheLength = svgCache.length;

exports.hydrate = async function (pkgs) {

	for (let i = 0; i < svgCacheLength; i++) {
		const cached = svgCache[i];
		const svgElement = cached.svg;

		const importedPkg = await pkgs[cached.pkg]

		const importedPkgIcon = importedPkg[cached.icon];

		setAttributesFromObject(svgElement, importedPkgIcon);
		generateElementAndAppend(svgElement, importedPkgIcon);
	}
};

exports.observe = function (pkgs) {

	const mutationObserver = new window.MutationObserver(async (mutations) => {

		for (const mutation of mutations) {
			const svg = mutation.target;
			const changedAttr = mutation.attributeName;
			const oldValue = mutation.oldValue;

			const currentPkg = svg.getAttribute('pkg');
			const currentIcon = svg.getAttribute('icon');

			const oldPkg = changedAttr === 'pkg' ? oldValue : currentPkg;
			const oldIcon = changedAttr === 'icon' ? oldValue : currentIcon;

			const importedOldPkg = (await pkgs[oldPkg])[oldIcon];
			const importedNewPkg = (await pkgs[currentPkg])[currentIcon];

			removeAllChildren(svg);
			removeOldPkgAttributeValues(svg, importedOldPkg);

			setAttributesFromObject(svg, importedNewPkg);
			generateElementAndAppend(svg, importedNewPkg);
		}
	})

	for (let i = 0; i < svgCacheLength; i++) {
		const svg = svgCache[i].svg;

		mutationObserver.observe(svg, {attributeFilter: ['pkg', 'icon'], attributeOldValue: true});
	}
};

const setAttributesFromObject = function (element, object) {

	for (const attribute in object) {
		let values = object[attribute];

		if (!Array.isArray(values)) {
			const currentAttr = element.getAttribute(attribute);

			if (currentAttr) {
				values = values + ' ' + currentAttr;
			}

			element.setAttribute(attribute, values);
		}
	}
};

const generateElementAndAppend = function (svg, iconObject) {

	for (const elementName in iconObject) {
		const elementArray = iconObject[elementName];

		if (Array.isArray(elementArray)) {
			const valuesLength = elementArray.length;

			for (let i = 0; i < valuesLength; i++) {
				const elementObject = elementArray[i];

				const createdElement = document.createElementNS("http://www.w3.org/2000/svg", elementName);

				setAttributesFromObject(createdElement, elementObject);

				svg.appendChild(createdElement);
			}
		}
	}
};

const removeAllChildren = function (svg) {
	const children = Array.from(svg.children);
	const childrenLength = children.length;

	for (let i = 0; i < childrenLength; i++) {
		const child = children[i];

		child.remove();
	}
};

const removeOldPkgAttributeValues = function (svg, importedOldPkg) {
	for (const attribute in importedOldPkg) {
		const oldValues = importedOldPkg[attribute];

		if (!Array.isArray(oldValues)) {
			const currentAttr = svg.getAttribute(attribute);
			const replacement = currentAttr.replace(oldValues, "");

			if (currentAttr.replace(oldValues, "").trim() === "") {
				svg.removeAttribute(attribute);
			} else {
				svg.setAttribute(attribute, replacement);
			}
		}
	}
};
