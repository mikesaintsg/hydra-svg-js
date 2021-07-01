import path from './exts/path.js';
import fs from './exts/fs.js';

const fsPromises = fs.promises;

import jsdom from "jsdom";
const {JSDOM} = jsdom;

import _get from 'lodash/get.js';
import _set from 'lodash/set.js';
import forIn from "./utils/forIn.js";
import forEach from "./utils/forEach.js";

export default async function (options) {
	const {name, input, output, extensions, packages, overrides} = options;

	const outputPath = path.prefixCwd(output, name)
	const inputPath = path.prefixCwd(input);

	const inputFiles = await fsPromises.allFiles(inputPath);

	const inputFilesFiltered = inputFiles.filter(({ext}) => extensions.includes(ext))

	const inputFilesMap = inputFilesFiltered.map(async ({fullPath}) => {
		const fileContents = await fsPromises.readFile(fullPath, "utf-8")

		const document = new JSDOM(fileContents).window.document;

		return [].slice.call(document.getElementsByTagName('svg'));
	})

	const inputFilesPromised = await Promise.all(inputFilesMap)

	const inputObject = inputFilesPromised
		.flat()
		.reduce((acc, svg) => {
			const iconName = svg.getAttribute('icon')
			const packName = svg.getAttribute('pack')

			const packIconObject = _get(packages, [packName, iconName], null);

			if (packIconObject) _set(acc, [packName, iconName], packIconObject);

			return acc
		}, {})

	forIn(overrides, (overrideArray, packName) => {
		forEach(overrideArray, iconName => {
			const packIconObject = _get(packages, [packName, iconName], null);

			if (packIconObject) _set(inputObject, [packName, iconName], packIconObject);
		})
	})

	await fsPromises.ensureFile(outputPath, JSON.stringify(inputObject));
}
