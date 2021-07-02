import path from './exts/path.js';
import fs from './exts/fs.js';

const fsPromises = fs.promises;

import glob from "glob";

import forEach from "./utils/forEach.js";
import uniqueArray from "./utils/uniqueArray";

export default async function (input, output, packages) {
	const outputPath = path.prefixCwd(output)
	const inputPath = path.prefixCwd(input);

	const files = glob.sync(inputPath);

	const inputObject = {};

	forEach(files, file => {

		const content = fs.readFileSync(file, 'utf-8');

		const string = content.replace(/[^A-Za-z0-9]/gm, ' ');

		const array = string.split(/\s+/gm);

		const packNames = Object.keys(packages);

		forEach(packNames, packName => {

			if(uniqueArray(array).includes(packName)) {

				const iconNames = Object.keys(packages[packName])

				const filtered = iconNames.filter(iconName => uniqueArray.includes(iconName))

				forEach(filtered, iconName => {
					const iconPack = packages[packName][iconName];

					const packObject = {
						[packName]: {
							...inputObject[packName],
							[iconName]: iconPack
						}
					};

					Object.assign(inputObject, packObject)
				})
			}
		})
	})

	await fsPromises.ensureFile(outputPath, JSON.stringify(inputObject));
}
