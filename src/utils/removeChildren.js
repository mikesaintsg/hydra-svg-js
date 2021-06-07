import forEach from './forEach.js';

export default function (element) {
	const children = [].slice.call(element.children);

	forEach(children, child => child.remove());
}
