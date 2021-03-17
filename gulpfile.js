const fs = require('fs');
const {src, dest} = require('gulp');

const rollup = require('gulp-better-rollup')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify');
const sizereport = require('gulp-sizereport')

const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs');
const stripCode = require('rollup-plugin-strip-code')

const babelOptions = require('./babel.config');

fs.rmdirSync('dist', {recursive: true});

exports.default = function () {
	return src('src/main.js')
		.pipe(sourcemaps.init())
		.pipe(rollup(
			{
				plugins: [
					stripCode({
						start_comment: 'TEST-ONLY:START',
						end_comment: 'TEST-ONLY:END'
					}),
					commonjs(),
					babel(babelOptions)
				]
			}, 'cjs'))
		.pipe(sourcemaps.write())
		.pipe(dest('dist/'))
		.pipe(src('dist/**/*.js'))
		.pipe(uglify())
		.pipe(dest('dist/'))
		.pipe(src('dist/**/*.js'))
		.pipe(sizereport({
			gzip: true
		}));
}
