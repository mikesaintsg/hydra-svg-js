import resolve from '@rollup/plugin-node-resolve';
import polyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import {babel} from '@rollup/plugin-babel'
import babelPresets from './babel.config.js'
import pkg from '../package.json';

import fs from 'fs';
import path from 'path';

const plugins = [
	resolve(),
	polyfills({fs: true}),
	json(),
	commonjs({
		ignoreDynamicRequires: true
	}),
	babel({
		...babelPresets,
		babelHelpers: 'bundled'
	}),
	terser()
];

//HYDRA-SVG-JS
const config = [{
	input: 'src/main.js',
	output: [
		{file: pkg.main, format: 'cjs', exports: "default"},
		{file: pkg.module, format: 'es'},
		{file: pkg.browser, format: 'umd', name: 'hydra-svg-js'}
	],
	plugins
}];

//GENERATOR
config.push({
	input: 'src/generator.js',
	output: [
		{file: "./dist/generator.cjs", format: 'cjs', exports: "default"},
		{file: "./dist/generator.mjs", format: 'es'}
	],
	plugins,
	external: Object.keys(pkg.dependencies)
})

//UTILS
const utils = fs.readdirSync('./src/utils');

utils.forEach(file => {
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

//EXTS
const exts = fs.readdirSync('./src/exts');

exts.forEach(file => {
	const name = path.parse(file).name

	config.push({
		input: `src/exts/${file}`,
		output: [
			{file: `dist/exts/${name}.cjs`, format: 'cjs', exports: "default"},
			{file: `dist/exts/${name}.mjs`, format: 'es'}
		],
		plugins
	})
});

//PACKS
import generate from '../src/generator.js';

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

export default config;
