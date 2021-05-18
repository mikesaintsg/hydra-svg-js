const path = require('path')
const babelOptions = require('./babel.config')

module.exports = {
	mode: "production",
	target: 'node',
	entry: path.resolve(__dirname, '../src/main.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'main.js',
		library: {
			type: 'umd',
		},
	},
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
