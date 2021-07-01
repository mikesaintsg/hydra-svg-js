import path from './exts/path.js';
import fs from './exts/fs';

const fsPromises = fs.promises;

import jsdom from "jsdom";
const {JSDOM} = jsdom;

import _get from 'lodash/get.js';
import _set from 'lodash/set.js';
import forIn from "./utils/forIn";
import forEach from "./utils/forEach";

const purge = async function (options) {

	const configPath = path.prefixCwd(options.config)

	if (fs.existsSync(configPath)) Object.assign(options, require(configPath))

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
			const pkgName = svg.getAttribute('pkg')

			const pkgIconObject = _get(packages, [pkgName, iconName], null);

			if (pkgIconObject) _set(acc, [pkgName, iconName], pkgIconObject);

			return acc
		}, {})

	forIn(overrides, (overrideArray, pkgName) => {
		forEach(overrideArray, iconName => {
			const pkgIconObject = _get(packages, [pkgName, iconName], null);

			if (pkgIconObject) _set(inputObject, [pkgName, iconName], pkgIconObject);
		})
	})

	await fsPromises.ensureFile(outputPath, JSON.stringify(inputObject));
}

export default purge;
