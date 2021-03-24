const hydra = {
	hydrate(pkgs) {

		/* TEST-ONLY:START */
		exports./* TEST-ONLY:END */
			initDocSvgs(filteredElsArray => {

				attachMutationObserver(filteredElsArray, (mutation) => {

					const el = mutation.target
					const attributeChangedName = mutation.attributeName
					const attributeOldValue = mutation.oldValue

					Array.from(el.childNodes).forEach(child => el.removeChild(child))

					const oldPkg = attributeChangedName === 'pkg' ? attributeOldValue : el.getAttribute('pkg')
					const oldIcon = attributeChangedName === 'icon' ? attributeOldValue : el.getAttribute('icon')

					const importedOldPkg = pkgs[oldPkg][oldIcon];

					for (const attribute in importedOldPkg) {

						const values = importedOldPkg[attribute];

						if (!Array.isArray(values)) {
							const currentAttr = el.getAttribute(attribute)

							el.setAttribute(attribute, currentAttr.replace(values, ""))
						}
					}

					const importedNewPkg = pkgs[el.getAttribute('pkg')][el.getAttribute('icon')]

					/* TEST-ONLY:START */
					exports./* TEST-ONLY:END */
						setAttrsFromObject(el, importedNewPkg)
					/* TEST-ONLY:START */
					exports./* TEST-ONLY:END */
						generateElAndAppend(el, importedNewPkg)

				})

				/* TEST-ONLY:START */
				exports./* TEST-ONLY:END */
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
					})
			})
	}
};

function attachMutationObserver(elsArray, cb) {
	const mutationObserver = new window.MutationObserver((mutations, observer) => {
		for (const mutation of mutations) {
			cb(mutation, observer)
		}
	})

	elsArray.forEach(el => mutationObserver.observe(el, {attributeFilter: ['pkg', 'icon'], attributeOldValue: true}))
}

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
