#!/usr/bin/env node

import {Command} from 'commander';

import generate from '../src/generate.js';
import purge from 'hydra-purge';

import fs from 'fs';

const npmPkg = JSON.parse(fs.readFileSync('./package.json', "utf-8"))

cli().catch(err => {
	console.error(err);

	process.exitCode = process.exitCode || 1;
	process.exit();
});

async function cli() {
	const program = new Command();

	program.version(npmPkg.version);
	program.name('hydra');

	program
		.command('generate', {isDefault: true})
		.description('Generate hydra-svg-js packs from svg files.')
		.option('-n, --name <file>', 'Output file name.', 'main.json')
		.option('-i, --input <folder>', 'Input folder path.', 'input')
		.option('-o, --output <folder>', 'Output folder path.', 'output')
		.option('-c, --config <file>', 'Configuration file path.', 'hydra.config.js')
		.action(generate);

	program
		.command('purge')
		.description('Purge hydra-svg-js packs from svg files.')
		.option('-e, --extensions <file...>', 'Extension types the purger should scan.', '.html')
		.option('-p, --packages <file>', 'Input file of packages imported.', 'packages.js')
		.option('-n, --name <file>', 'Output file name.', 'purged.json')
		.option('-i, --input <folder>', 'Input folder path.', 'input')
		.option('-o, --output <folder>', 'Output folder path.', 'output')
		.option('-c, --config <file>', 'Configuration file path.', 'hydra.config.js')
		.action(purge);

	await program.parseAsync(process.argv);
}
