const {attributesHydrate} = require("./svg/attributes.js");
const {generateElementAndAppend} = require("./svg/elements.js");

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
		attributesHydrate(el, importedPkgObject[iconName])
		generateElementAndAppend(el, importedPkgObject[iconName])
	})
}

module.exports = hydra;
