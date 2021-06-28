import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import {babel} from '@rollup/plugin-babel'
import babelPresets from './babel.config.js'
import pkg from '../package.json';

import fs from 'fs';
import path from 'path';

import generate from 'hydra-generator';

const packs = fs.readdirSync('./src/packs');

(async ()=>{
	await Promise.all(packs.map(pack => {
		generate({
			input: `src/packs/${pack}`,
			output: 'dist/packs',
			name: `${pack}.json`,
			config: ''
		});
	}))
})()

const plugins = [
	resolve(),
	commonjs(),
	babel({
		...babelPresets,
		babelHelpers: 'bundled'
	}),
	terser()
];

const config = [{
	input: 'src/main.js',
	output: [
		{file: pkg.main, format: 'cjs', exports: "default"},
		{file: pkg.module, format: 'es'},
		{file: pkg.browser, format: 'umd', name: 'hydra-svg-js'}
	],
	plugins
}];

const files = fs.readdirSync('./src/utils');

files.forEach(file => {
	const name = path.parse(file).name

	config.push({
		input: `src/utils/${file}`,
		output: [
			{file: `dist/utils/${name}.cjs`, format: 'cjs', exports: "default"},
			{file: `dist/utils/${name}.mjs`, format: 'es'}
		],
		plugins
	})
});

export default config;
