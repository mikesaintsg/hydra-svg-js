const path = require('path');
const babelOptions = require('./babel.config')

const defaults = {
	mode: "production",
	target: 'node',
	entry: path.resolve(__dirname, '../src/main.js'),
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: babelOptions
				}
			}
		]
	}
};

const cjs = {
	...defaults,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'main.cjs.js',
		library: {
			name: 'hydra-svg-js',
			type: 'umd',
		},
	}
};

const esm = {
	...defaults,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'main.esm.js',
		library: {
			type: 'module',
		},
	},
	experiments: {
		outputModule: true
	}
}

module.exports = [cjs, esm];
