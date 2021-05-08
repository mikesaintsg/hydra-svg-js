const svgCache = [];

const initSvgEls = document.getElementsByTagName('svg');

const initSvgElsLength = initSvgEls.length;

for (let i = 0; i < initSvgElsLength; i++) {
	const el = initSvgEls[i];

	const hasPkg = el.hasAttribute('pkg');
	const hasIcon = el.hasAttribute('icon');

	if (hasPkg && hasIcon) {
		const pkg = el.getAttribute('pkg')
		const icon = el.getAttribute('icon')

		svgCache.push({el, pkg, icon});
	}
}

const svgCacheLength = svgCache.length

exports.hydrate = async function (pkgs) {

	for (let i = 0; i < svgCacheLength; i++) {
		const cached = svgCache[i]
		const el = cached.el;

		const importedPkgIcon = (await pkgs[cached.pkg])[cached.icon]

		setAttrsFromObject(el, importedPkgIcon)
		generateElAndAppend(el, importedPkgIcon)
	}
};

exports.observe = function (pkgs) {

	const mutationObserver = new window.MutationObserver(async (mutations) => {

		for (const mutation of mutations) {
			const el = mutation.target;
			const changedAttr = mutation.attributeName;
			const oldValue = mutation.oldValue;

			const currentPkg = el.getAttribute('pkg');
			const currentIcon = el.getAttribute('icon');

			const oldPkg = changedAttr === 'pkg' ? oldValue : currentPkg;
			const oldIcon = changedAttr === 'icon' ? oldValue : currentIcon;

			const importedOldPkg = (await pkgs[oldPkg])[oldIcon];
			const importedNewPkg = (await pkgs[currentPkg])[currentIcon];

			removeAllChildren(el);
			removeOldPkgAttrValues(el, importedOldPkg);

			setAttrsFromObject(el, importedNewPkg)
			generateElAndAppend(el, importedNewPkg)
		}
	})

	for (let i = 0; i < svgCacheLength; i++) {
		const el = svgCache[i].el

		mutationObserver.observe(el, {attributeFilter: ['pkg', 'icon'], attributeOldValue: true})
	}
};

const setAttrsFromObject = function (el, object) {

	for (const attribute in object) {
		let values = object[attribute];

		if (!Array.isArray(values)) {
			const currentAttr = el.getAttribute(attribute)

			if (currentAttr) {
				values = values + ' ' + currentAttr;
			}

			el.setAttribute(attribute, values);
		}
	}
};

const generateElAndAppend = function (svg, iconObject) {

	for (const el in iconObject) {
		const values = iconObject[el];

		if (Array.isArray(values)) {
			const valuesLength = values.length

			for (let i = 0; i < valuesLength; i++) {
				const elObject = values[i]

				const createdElement = document.createElementNS("http://www.w3.org/2000/svg", el)

				setAttrsFromObject(createdElement, elObject)

				svg.appendChild(createdElement);
			}
		}
	}
};

const removeAllChildren = function (el) {
	const children = Array.from(el.children);
	const childrenLength = children.length

	for (let i = 0; i < childrenLength; i++) {
		const child = children[i];

		child.remove()
	}
};

const removeOldPkgAttrValues = function (el, importedOldPkg) {
	for (const attribute in importedOldPkg) {
		const oldValues = importedOldPkg[attribute];

		if (!Array.isArray(oldValues)) {
			const currentAttr = el.getAttribute(attribute)
			const replacement = currentAttr.replace(oldValues, "")

			if (currentAttr.replace(oldValues, "").trim() === "") {
				el.removeAttribute(attribute)
			} else {
				el.setAttribute(attribute, replacement)
			}
		}
	}
};
