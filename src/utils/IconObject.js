import forEach from "./forEach.js";

export default class IconObject {
	constructor(element) {
		this.element = element;
		this.object = {};

		this.addElementAttributes(element)
		this.addElementChildren(element)

		return this.object;
	}

	addElementAttributes(element){
		const names = element.getAttributeNames()
		const attributes = {}

		forEach(names, name =>
			attributes[name] = element.getAttribute(name));

		Object.assign(this.object, attributes);
	}

	addElementChildren(element){
		const children = [].slice.call(element.children);

		forEach(children, child => {
			const tagName = child.tagName;
			const childObject = {};
			const attributes = element.getAttributeNames()

			forEach(attributes, name =>
				childObject[name] = element.getAttribute(name));

			this.object[tagName] = this.object[tagName]
				? [...this.object[tagName], childObject]
				: [childObject]
		})
	}
}
