import fs from 'fs'
import path from 'path'

const fsPromises = fs.promises;

fsPromises.ensureDir = async function (dirPath) {

	await fsPromises.mkdir(dirPath, {recursive: true});
}

fsPromises.ensureFile = async function (filePath, data = null) {

	if (fs.existsSync(filePath)) {

		if (data) await fsPromises.writeFile(filePath, data);

	} else {

		const {dir} = path.parse(filePath);

		await fsPromises.ensureDir(dir)

		await fsPromises.writeFile(filePath, data ?? '');
	}
}

fsPromises.allFiles = async function (dirPath, filesArray = []) {

	const itemArray = await fsPromises.readdir(dirPath, {withFileTypes: true})

	for (let i = 0; i < itemArray.length; i++) {

		const item = itemArray[i];

		const fullPath = dirPath + "/" + item.name

		if (item.isDirectory()) {

			filesArray = await fsPromises.allFiles(fullPath, filesArray);
		}

		if (item.isFile()) {

			filesArray.push({fullPath, ...path.parse(fullPath)})
		}
	}


	return filesArray;
}

export default fs;
