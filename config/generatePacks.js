import fs from "fs";
import generate from "../src/generate.js";
import colors from 'colors';

(async () => {
	const packs = await fs.promises.readdir('src/packs');

	process.stdout.write("\n" + colors.green(`Generating Packs...`) + "\n");

	await Promise.all(packs.map(pack => {
		generate({
			input: `src/packs/${pack}`,
			output: 'dist/packs',
			name: `${pack}.json`
		}).then(()=>{
			process.stdout.write(colors.blue(`Generated: ${pack}`) + "\n");
		});
	}))
})();
