import path from './exts/path.js';
import fs from './exts/fs';
import jsdom from "jsdom";
import Optimizer from './plugs/optimizer';

import _camelCase from 'lodash/camelCase';

import createElementObject from './utils/createElementObject.js';

const fsPromises = fs.promises;

const {JSDOM} = jsdom;

const generate = async function (options) {

	if (options.config) {
		const configPath = path.prefixCwd(options.config);

		if (fs.existsSync(configPath)) Object.assign(options, require(configPath));
	}

	const {name, input, output} = options;

	const outputPath = path.prefixCwd(output, name)
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

export default generate;
