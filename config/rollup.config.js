import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import {terser} from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import babelOptions from "../config/babel.config";
import pkg from '../package.json'

export default [
	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs', exports: 'named' },
			{ file: pkg.module, format: 'es', exports: 'named' }
		],
		plugins: [
			resolve(),
			commonjs(),
			babel({...babelOptions, babelHelpers: 'bundled'}),
			terser()
		]
	}
]
// const babelOptions = require('./babel.config')
//
// module.exports = {
// 	mode: "production",
// 	target: 'node',
// 	entry: path.resolve(__dirname, '../src/main.js'),
// 	output: {
// 		path: path.resolve(__dirname, '../dist'),
// 		filename: 'main.js',
// 		library: {
// 			name: 'hydra-svg-js',
// 			type: 'umd',
// 		},
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.m?js$/,
// 				exclude: /(node_modules|bower_components)/,
// 				use: {
// 					loader: 'babel-loader',
// 					options: babelOptions
// 				}
// 			}
// 		]
// 	}
// };
