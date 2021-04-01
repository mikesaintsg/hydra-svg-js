import stripCode from 'rollup-plugin-strip-code'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import {terser} from 'rollup-plugin-terser'
import filesize from "rollup-plugin-filesize";

const defaults = {
	external: [/@babel\/runtime/],
	plugins: [
		stripCode({
			start_comment: 'TEST-ONLY:START',
			end_comment: 'TEST-ONLY:END'
		}),
		resolve({ extensions: ['.js'] }),
		commonjs(),
		babel({babelHelpers: 'runtime'}),
		terser(),
		filesize()
	]
}

const cjs = {
	input: 'src/main.js',
	output: {
		file: 'dist/main.js',
		format: 'cjs',
		exports: 'named'
	},
	...defaults
}

export default [cjs];
