import path from './exts/path.js';
import fs from './exts/fs.js';
import fglob from 'fast-glob'

import optimize from './plugs/optimize.js';

import createIconObject from "./utils/createIconObject.js";

import jsdom from "jsdom";

const fsPromises = fs.promises;

const {JSDOM} = jsdom;

export default async function (input, output, options = {optimize: {}}) {

	const outputPath = path.prefixCwd(output)

	const inputPath = path.prefixCwd(input);

	const inputFiles = await fglob(`${inputPath}/*.svg`, {onlyFiles: true});

	const inputMap = inputFiles.map(async file => {

		const {dir, base, name} = path.parse(file);

		const fileContent = await fsPromises.readFile(path.join(dir, base), 'utf-8');

		const optimizedContent = options.optimize ? optimize(fileContent, options.optimize) : fileContent;

		const element = JSDOM.fragment(optimizedContent).firstChild;

		const iconObject = createIconObject(element);

		return {[name]: iconObject};
	})

	const inputPromises = await Promise.all(inputMap)

	const inputObject = inputPromises.reduce((acc, curr) => Object.assign(acc, curr), {})

	await fsPromises.ensureFile(`${outputPath}.json`, JSON.stringify(inputObject));
}
