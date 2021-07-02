import path from './exts/path.js';
import fs from './exts/fs.js';

const fsPromises = fs.promises;

import Optimizer from './plugs/optimizer.js';

import _camelCase from 'lodash/camelCase.js';

import createElementObject from './utils/createElementObject.js';

import jsdom from "jsdom";
const {JSDOM} = jsdom;

export default async function (input, output) {
	const outputPath = path.prefixCwd(output)
	const inputPath = path.prefixCwd(input);

	const inputFiles = await fsPromises.allFiles(inputPath);

	const inputMap = inputFiles.map(async ({dir, base, name}) => {

		const fileContent = await fsPromises.readFile(path.join(dir, base), 'utf-8');

		const optimizedContent = Optimizer.optimizeContents(fileContent);

		const element = JSDOM.fragment(optimizedContent).firstChild;

		const iconObject = createElementObject(element);

		return {[_camelCase(name)]: iconObject};
	})

	const inputPromises = await Promise.all(inputMap)

	const inputObject = inputPromises.reduce((acc, curr) => Object.assign(acc, curr), {})

	await fsPromises.ensureFile(outputPath, JSON.stringify(inputObject));
}
