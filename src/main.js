const hydra = {
	hydrate(packages) {
		initDocSvgEls(docElsArray =>
			filterForAttrs(docElsArray, filteredElsArray =>
				createPkgIconElsObject(filteredElsArray, pkgIconElsObject =>
					importPackagesInObject(pkgIconElsObject, packages, (pkgObject, importedPkgObject) =>
						getIconArrayOfEls(pkgObject, importedPkgObject, (iconArray, iconName, importedPkgObject) =>
							hydrateEachElInIconArray(iconArray, iconName, importedPkgObject))))))
	}
};

function initDocSvgEls(callback) {
	callback(Array.from(document.getElementsByTagName('svg')))
}

function filterForAttrs(elsArray, callback) {
	callback(elsArray.filter(el => {
		if (el.getAttribute('pkg') && el.getAttribute('icon')) return el
	}))
}

function createPkgIconElsObject(elsArray, callback) {
	const pkgIconElsObject = {};

	elsArray.forEach(el => {
		const elPkg = el.getAttribute('pkg');
		const elIcon = el.getAttribute('icon');

		if (!pkgIconElsObject[elPkg]) pkgIconElsObject[elPkg] = {};

		if (pkgIconElsObject[elPkg][elIcon]) pkgIconElsObject[elPkg][elIcon].push(el)
		else pkgIconElsObject[elPkg][elIcon] = [el];
	})

	callback(pkgIconElsObject)
}

function importPackagesInObject(pkgIconElsObject, packages, callback) {
	for (const pkgName in pkgIconElsObject) {
		const importedPkg = packages[pkgName];
		callback(pkgIconElsObject[pkgName], importedPkg)
	}
}

function getIconArrayOfEls(pkgObject, importedPkgObject, callback) {

	for (const iconName in pkgObject) {
		callback(pkgObject[iconName], iconName, importedPkgObject)
	}
}

function hydrateEachElInIconArray(iconArray, iconName, importedPkgObject) {
	iconArray.forEach(el => {
		setAttributesFromObject(el, importedPkgObject[iconName])
		generateElementAndAppend(el, importedPkgObject[iconName])
	})
}

function setAttributesFromObject(element, object) {
	for (const attribute in object) {

		let values = object[attribute];

		if (!Array.isArray(values)) {

			if (element.getAttribute(attribute)) values = values + ' ' + element.getAttribute(attribute);

			element.setAttribute(attribute, values);
		}
	}

	return element;
}

function generateElementAndAppend(svg, iconObject) {

	for (const element in iconObject) {

		const values = iconObject[element];

		if (Array.isArray(values)) {

			values.forEach((elementObject) => {

				svg.appendChild(
					setAttributesFromObject(
						document.createElementNS("http://www.w3.org/2000/svg", element), elementObject));
			})
		}
	}

	return svg;
}

module.exports = hydra;
