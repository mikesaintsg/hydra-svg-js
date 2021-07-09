import generateDom from "./generateDom.js";
import hydrate from "../../src/hydrate.js";

export default function hydratedDom(packs, string, before = null) {
	generateDom(string)

	if (before) before();

	const svgs = [].slice.call(document.getElementsByTagName('svg'))

	hydrate(packs, svgs)
}
