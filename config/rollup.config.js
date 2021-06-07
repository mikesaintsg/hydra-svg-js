import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import {babel} from '@rollup/plugin-babel'
import babelPresets from './babel.config.js'
import pkg from '../package.json';

export default [
	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs', exports: "default" },
			{ file: pkg.module, format: 'es' },
			{ file: pkg.browser, format: 'umd', name: 'hydra-svg-js'}
		],
		plugins: [
			resolve(),
			commonjs(),
			babel({
				...babelPresets,
				babelHelpers: 'bundled'
			}),
			terser()
		]
	}
];
