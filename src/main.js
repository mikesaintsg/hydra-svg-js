const hydra = {
	hydrate(pkgs) {

		/* TEST-ONLY:START */
		exports./* TEST-ONLY:END */
			initDocSvgs(filteredElsArray =>

				/* TEST-ONLY:START */exports./* TEST-ONLY:END */
				createPkgIconElsObject(filteredElsArray, pkgIconElsObject => {

					for (const pkgName in pkgIconElsObject) {

						for (const iconName in pkgIconElsObject[pkgName]) {

							const importedPkgIcon = pkgs[pkgName][iconName];

							pkgIconElsObject[pkgName][iconName].forEach(el => {

								/* TEST-ONLY:START */
								exports./* TEST-ONLY:END */
									setAttrsFromObject(el, importedPkgIcon)

								/* TEST-ONLY:START */
								exports./* TEST-ONLY:END */
									generateElAndAppend(el, importedPkgIcon)
							})
						}
					}
				}))
	}
};

/* TEST-ONLY:START */
exports.initDocSvgs = /* TEST-ONLY:END */

	function initDocSvgs(cb) {
		cb(Array.from(document.getElementsByTagName('svg')).filter(el => {
			if (el.hasAttribute('pkg') && el.hasAttribute('icon')) return el
		}))
	}

/* TEST-ONLY:START */
exports.createPkgIconElsObject = /* TEST-ONLY:END */

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

/* TEST-ONLY:START */
exports.setAttrsFromObject = /* TEST-ONLY:END */

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

/* TEST-ONLY:START */
exports.generateElAndAppend = /* TEST-ONLY:END */

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
