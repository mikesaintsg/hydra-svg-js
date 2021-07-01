import fs from 'fs';
import glob from 'glob';
import generateConfig from "./generateConfig";
import generate from '../src/generate.js';

(async () => {
	const packs = await fs.promises.readdir('src/packs');

	await Promise.all(packs.map(pack => {
		generate({
			input: `src/packs/${pack}`,
			output: 'dist/packs',
			name: `${pack}.json`
		});
	}))
})();

export default glob.sync('src/**/*.js')
	.map(file => generateConfig(
		file.replace('src/', '').replace('.js', '')
	));
