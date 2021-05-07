const svgEls = document.getElementsByTagName('svg');

const svgElsArray = Array.from(svgEls);

const svgElsArrayFiltered = svgElsArray.filter(el => el.hasAttribute('pkg') && el.hasAttribute('icon'));

const svgElsArrayFilteredLength = svgElsArrayFiltered.length;

export const hydrate = async function (pkgs, hooks = {before: null, after: null, observe: null, last: null}) {

	if(hooks.before) ifFuncArrayHook(hooks.before, {pkgs, svgElsArrayFiltered})

	for (let i = 0; i < svgElsArrayFilteredLength; i++) {
		const el = svgElsArrayFiltered[i]

		const pkgName = el.getAttribute('pkg');
		const iconName = el.getAttribute('icon');

		const importedPkgIcon = (await pkgs[pkgName])[iconName]

		setAttrsFromObject(el, importedPkgIcon)
		generateElAndAppend(el, importedPkgIcon)
	}

	if(hooks.after) ifFuncArrayHook(hooks.after, {pkgs, svgElsArrayFiltered})

	if(hooks.observe) await observe(pkgs)

	if(hooks.last) ifFuncArrayHook(hooks.last, {pkgs, svgElsArrayFiltered})
};

const ifArray = function (items, ifso, ifnot) {
	if (Array.isArray(items)) {
		const itemsLength = items.length

		for (let i = 0; i < itemsLength; i++) {
			const item = items[i]

			ifso(item)
		}
	} else {
		ifnot(items, ifso)
	}
};

const ifFuncArrayHook = function(items, ...args){
	const callFunc = function (func) {
		func(...args)
	}

	ifArray(items, callFunc, callFunc)
};

export const observe = function (pkgs) {

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

			setAttrsFromObject(el, importedNewPkg);
			generateElAndAppend(el, importedNewPkg);
		}
	})

	for (let i = 0; i < svgElsArrayFilteredLength; i++) {
		const el = svgElsArrayFiltered[i]

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
		const values = importedOldPkg[attribute];

		if (!Array.isArray(values)) {
			const currentAttr = el.getAttribute(attribute)
			const replacement = currentAttr.replace(values, "")

			if(currentAttr.replace(values, "").trim() === "") {
				el.removeAttribute(attribute)
			} else {
				el.setAttribute(attribute, replacement)
			}
		}
	}
};
