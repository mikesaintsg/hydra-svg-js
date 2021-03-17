const hydra = {
	hydrate(packages) {

		/* TEST-ONLY:START */exports./* TEST-ONLY:END */
			initDocSvgEls(docElsArray =>

				/* TEST-ONLY:START */exports./* TEST-ONLY:END */
				filterForAttrs(docElsArray, filteredElsArray =>

					/* TEST-ONLY:START */exports./* TEST-ONLY:END */
					createPkgIconElsObject(filteredElsArray, pkgIconElsObject =>

						/* TEST-ONLY:START */exports./* TEST-ONLY:END */
						importPackagesInObject(pkgIconElsObject, packages, (pkgObject, importedPkgObject) =>

							/* TEST-ONLY:START */exports./* TEST-ONLY:END */
							getIconArrayOfEls(pkgObject, importedPkgObject, (iconArray, iconName, importedPkgObject) =>

								/* TEST-ONLY:START */exports./* TEST-ONLY:END */
								hydrateEachElInIconArray(iconArray, iconName, importedPkgObject))))))
	}
};

/* TEST-ONLY:START */exports.initDocSvgEls = /* TEST-ONLY:END */

	function initDocSvgEls(callback) {
		callback(Array.from(document.getElementsByTagName('svg')))
	}

/* TEST-ONLY:START */exports.filterForAttrs = /* TEST-ONLY:END */

	function filterForAttrs(elsArray, callback) {
		callback(elsArray.filter(el => {
			if (el.getAttribute('pkg') && el.getAttribute('icon')) return el
		}))
	}

/* TEST-ONLY:START */exports.createPkgIconElsObject = /* TEST-ONLY:END */

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

/* TEST-ONLY:START */exports.importPackagesInObject = /* TEST-ONLY:END */

	function importPackagesInObject(pkgIconElsObject, packages, callback) {
		for (const pkgName in pkgIconElsObject) {
			const importedPkg = packages[pkgName];
			callback(pkgIconElsObject[pkgName], importedPkg)
		}
	}

/* TEST-ONLY:START */exports.getIconArrayOfEls = /* TEST-ONLY:END */

	function getIconArrayOfEls(pkgObject, importedPkgObject, callback) {

		for (const iconName in pkgObject) {
			callback(pkgObject[iconName], iconName, importedPkgObject)
		}
	}

/* TEST-ONLY:START */exports.hydrateEachElInIconArray = /* TEST-ONLY:END */

	function hydrateEachElInIconArray(iconArray, iconName, importedPkgObject) {
		iconArray.forEach(el => {

			/* TEST-ONLY:START */
			exports./* TEST-ONLY:END */
				setAttributesFromObject(el, importedPkgObject[iconName])

			/* TEST-ONLY:START */
			exports./* TEST-ONLY:END */
				generateElementAndAppend(el, importedPkgObject[iconName])
		})
	}

/* TEST-ONLY:START */exports.setAttributesFromObject = /* TEST-ONLY:END */

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

/* TEST-ONLY:START */exports.generateElementAndAppend = /* TEST-ONLY:END */

	function generateElementAndAppend(svg, iconObject) {

		for (const element in iconObject) {

			const values = iconObject[element];

			if (Array.isArray(values)) {

				values.forEach((elementObject) => {

					svg.appendChild(
						/* TEST-ONLY:START */exports./* TEST-ONLY:END */
							setAttributesFromObject(
								document.createElementNS("http://www.w3.org/2000/svg", element), elementObject));
				})
			}
		}

		return svg;
	}

module.exports = hydra;
