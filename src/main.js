const filteredElsArray = Array.from(document.getElementsByTagName('svg')).filter(el => {

	return el.hasAttribute('pkg') && el.hasAttribute('icon')
})

exports.hydrate = function (pkgs, cb = f => f) {
	createPkgIconElsObject(filteredElsArray, pkgIconElsObject => {

		for (const pkgName in pkgIconElsObject) {

			const pkgObject = pkgIconElsObject[pkgName]

			for (const iconName in pkgObject) {

				const importedPkgIcon = pkgs[pkgName][iconName];
				const iconElsArray = pkgIconElsObject[pkgName][iconName];

				iconElsArray.forEach(el => {

					setAttrsFromObject(el, importedPkgIcon)
					generateElAndAppend(el, importedPkgIcon)
				})
			}
		}
	})

	cb(pkgs)
}

exports.observe = function (pkgs) {
	attachMutationObserver(filteredElsArray, (el, changedAttr, oldValue) => {

		const currentPkg = el.getAttribute('pkg');
		const currentIcon = el.getAttribute('icon');

		const oldPkg = changedAttr === 'pkg' ? oldValue : currentPkg;
		const oldIcon = changedAttr === 'icon' ? oldValue : currentIcon;

		const importedOldPkg = pkgs[oldPkg][oldIcon];
		const importedNewPkg = pkgs[currentPkg][currentIcon];

		removeAllChildNodes(el);
		removeOldPkgAttrValues(el, importedOldPkg);

		setAttrsFromObject(el, importedNewPkg);
		generateElAndAppend(el, importedNewPkg);
	})
}

const attachMutationObserver = function (elsArray, cb) {

	const mutationObserver = new window.MutationObserver((mutations) => {

		for (const mutation of mutations) {

			cb(mutation.target, mutation.attributeName, mutation.oldValue)
		}
	})

	elsArray.forEach(el => mutationObserver.observe(el, {attributeFilter: ['pkg', 'icon'], attributeOldValue: true}))
}

const removeAllChildNodes = function (el) {
	Array.from(el.childNodes).forEach(child => el.removeChild(child))
}

const removeOldPkgAttrValues = function (el, importedOldPkg) {
	for (const attribute in importedOldPkg) {

		const values = importedOldPkg[attribute];

		if (!Array.isArray(values)) {

			const currentAttr = el.getAttribute(attribute)
			const replacement = currentAttr.replace(values, "")

			currentAttr.replace(values, "").trim() === ""
				? el.removeAttribute(attribute)
				: el.setAttribute(attribute, replacement)
		}
	}
}

const createPkgIconElsObject = function (elsArray, cb) {

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


const setAttrsFromObject = function (el, object) {
	for (const attribute in object) {

		let values = object[attribute];

		if (!Array.isArray(values)) {

			const currentAttr = el.getAttribute(attribute)

			if (currentAttr) values = values + ' ' + currentAttr;

			el.setAttribute(attribute, values);
		}
	}

	return el;
}


const generateElAndAppend = function (svg, iconObject) {

	for (const el in iconObject) {

		const values = iconObject[el];

		if (Array.isArray(values)) {

			values.forEach((elObject) => {

				svg.appendChild(
					setAttrsFromObject(document.createElementNS("http://www.w3.org/2000/svg", el),
						elObject));
			})
		}
	}

	return svg;
}
