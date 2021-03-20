import stripCode from 'rollup-plugin-strip-code'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import babelOptions from './babel.config.json'
import { terser } from 'rollup-plugin-terser'
import filesize from "rollup-plugin-filesize";

export default {
	input: 'src/main.js',
	output: {
		file: 'dist/main.js',
		format: 'cjs',
		exports: 'default'
	},
	plugins: [
		stripCode({
			start_comment: 'TEST-ONLY:START',
			end_comment: 'TEST-ONLY:END'
		}),
		resolve(),
		commonjs(),
		babel(babelOptions),
		terser(),
		filesize()
	]
};
