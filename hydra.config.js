import fs from "fs";
import generate from "./src/generate.js";

import colors from 'colors';

(async () => {
	const packs = await fs.promises.readdir('src/packs');

	process.stdout.write("\n" + colors.blue(`Generating Packs...`) + "\n");

	await Promise.all(packs.map(pack => {
		generate(`src/packs/${pack}`,`dist/packs/${pack}`).
		then(() => {
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0)
			process.stdout.write(colors.green(`Generated: ${pack}`) + "\n");
		});
	}))
})();
