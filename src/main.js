const hydra = {
	hydrate(pkgs) {

			/* TEST-ONLY:START */exports./* TEST-ONLY:END */
			initDocSvgs(docElsArray =>

				/* TEST-ONLY:START */exports./* TEST-ONLY:END */
				filterForAttrs(docElsArray, filteredElsArray =>

					/* TEST-ONLY:START */exports./* TEST-ONLY:END */
					createPkgIconElsObject(filteredElsArray, pkgIconElsObject =>

						/* TEST-ONLY:START */exports./* TEST-ONLY:END */
						importPkgs(pkgIconElsObject, pkgs, (pkgObject, importedPkgObject) =>

							/* TEST-ONLY:START */exports./* TEST-ONLY:END */
							getIconArrayOfEls(pkgObject, (iconArray, iconName) =>

								/* TEST-ONLY:START */exports./* TEST-ONLY:END */
								eachElInIconArray(iconArray, iconName, importedPkgObject))))))
	}
};

/* TEST-ONLY:START */exports.initDocSvgs = /* TEST-ONLY:END */

	function initDocSvgs(cb) {
		cb(Array.from(document.getElementsByTagName('svg')))
	}

/* TEST-ONLY:START */exports.filterForAttrs = /* TEST-ONLY:END */

	function filterForAttrs(elsArray, cb) {
		cb(elsArray.filter(el => {
			if (el.getAttribute('pkg') && el.getAttribute('icon')) return el
		}))
	}

/* TEST-ONLY:START */exports.createPkgIconElsObject = /* TEST-ONLY:END */

	function createPkgIconElsObject(elsArray, cb) {
		const pkgIconElsObject = {};

		elsArray.forEach(el => {
			const elPkg = el.getAttribute('pkg');
			const elIcon = el.getAttribute('icon');

			if (!pkgIconElsObject[elPkg]) pkgIconElsObject[elPkg] = {};

			if (pkgIconElsObject[elPkg][elIcon]) pkgIconElsObject[elPkg][elIcon].push(el)
			else pkgIconElsObject[elPkg][elIcon] = [el];
		})

		cb(pkgIconElsObject)
	}

/* TEST-ONLY:START */exports.importPkgs = /* TEST-ONLY:END */

	function importPkgs(pkgIconElsObject, pkgs, cb) {
		for (const pkgName in pkgIconElsObject) {
			cb(pkgIconElsObject[pkgName], pkgs[pkgName])
		}
	}

/* TEST-ONLY:START */exports.getIconArrayOfEls = /* TEST-ONLY:END */

	function getIconArrayOfEls(pkgObject, cb) {
		for (const iconName in pkgObject) {
			cb(pkgObject[iconName], iconName)
		}
	}

/* TEST-ONLY:START */exports.eachElInIconArray = /* TEST-ONLY:END */

	function eachElInIconArray(iconArray, iconName, importedPkgObject) {
		iconArray.forEach(el => {

			/* TEST-ONLY:START */exports./* TEST-ONLY:END */
				setAttrsFromObject(el, importedPkgObject[iconName])

			/* TEST-ONLY:START */exports./* TEST-ONLY:END */
				generateElAndAppend(el, importedPkgObject[iconName])
		})
	}

/* TEST-ONLY:START */exports.setAttrsFromObject = /* TEST-ONLY:END */

	function setAttrsFromObject(el, object) {
		for (const attribute in object) {

			let values = object[attribute];

			if (!Array.isArray(values)) {

				if (el.getAttribute(attribute)) values = values + ' ' + el.getAttribute(attribute);

				el.setAttribute(attribute, values);
			}
		}

		return el;
	}

/* TEST-ONLY:START */exports.generateElAndAppend = /* TEST-ONLY:END */

	function generateElAndAppend(svg, iconObject) {

		for (const el in iconObject) {

			const values = iconObject[el];

			if (Array.isArray(values)) {

				values.forEach((elObject) => {

					svg.appendChild(
						/* TEST-ONLY:START */exports./* TEST-ONLY:END */
							setAttrsFromObject(
								document.createElementNS("http://www.w3.org/2000/svg", el), elObject));
				})
			}
		}

		return svg;
	}

module.exports = hydra;
