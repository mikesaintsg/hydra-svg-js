import path from './exts/path.js';
import fs from './exts/fs.js';
import fglob from "fast-glob";

import forEach from "./utils/array/forEach.js";
import unique from "./utils/array/unique.js";
import forIn from "./utils/object/forIn.js";

const fsPromises = fs.promises;

export default async function (input, output, packages, overrides = {includes: {}, excludes: {}, extends: {}}) {

	const outputPath = path.prefixCwd(output)

	const inputPath = path.prefixCwd(input);

	const files = await fglob(inputPath, {onlyFiles: true});

	const inputObject = {};

	forEach(files, file => {

		const content = fs.readFileSync(file, 'utf-8');

		const string = content.replace(/[^A-Za-z0-9]/gm, ' ');

		const array = string.split(/\s+/gm);

		const packNames = Object.keys(packages);

		const uniques = unique(array)

		forEach(packNames, packName => {

			if (uniques.includes(packName)) {

				const iconNames = Object.keys(packages[packName])

				const filtered = iconNames.filter(iconName => uniques.includes(iconName))

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

	forIn(overrides, (value, key) => {

		if (key === 'excludes') {

			forIn(overrides.excludes, (iconNames, packName) => {

				forEach(iconNames, iconName => {

					if (inputObject[packName]) {

						if (inputObject[packName][iconName]) {

							delete inputObject[packName][iconName];

							if (Object.keys(inputObject[packName]).length === 0) {

								delete inputObject[packName];
							}
						}
					}
				})
			})
		}

		if (key === 'extends') {

			forIn(overrides.extends, (iconObject, packName) => {

				const packObject = {
					[packName]: {
						...inputObject[packName],
						...iconObject
					}
				};

				Object.assign(inputObject, packObject)
			})
		}

		if (key === 'includes') {

			forIn(overrides.includes, (iconNames, packName) => {

				forEach(iconNames, iconName => {

					const iconPack = packages[packName][iconName];

					const packObject = {
						[packName]: {
							...inputObject[packName],
							[iconName]: iconPack
						}
					};

					Object.assign(inputObject, packObject)
				})
			})
		}
	})

	await fsPromises.ensureFile(outputPath, JSON.stringify(inputObject));
}
