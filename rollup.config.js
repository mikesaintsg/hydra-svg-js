import resolve from "@rollup/plugin-node-resolve";
import polyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import {babel} from "@rollup/plugin-babel";
import babelOptions from "./babel.config.json";
import {terser} from "rollup-plugin-terser";
import pkg from "./package.json";
import fglob from 'fast-glob';

function config(file) {
	return {
		input: `src/${file}.js`,
		output: [
			{file: `dist/${file}.cjs`, format: 'cjs', exports: "default"},
			{file: `dist/${file}.mjs`, format: 'es'}
		],
		plugins: [
			resolve(),
			polyfills({fs: true}),
			json(),
			commonjs({
				ignoreDynamicRequires: true
			}),
			babel({
				...babelOptions,
				babelHelpers: 'bundled'
			}),
			terser()
		],
		external: Object.keys(pkg.dependencies)
	}
}

export default fglob.sync('src/*.js')
	.map(file => config(
		file.replace('src/', '').replace('.js', '')
	));
