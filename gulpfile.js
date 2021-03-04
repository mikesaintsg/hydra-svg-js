const fs = require('fs');
const {src, dest} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const babelConfig = require("./babel.config.js")

fs.rmdirSync('dist', { recursive: true });

exports.default = function() {
	return src('src/**/*.js')
		.pipe(babel(babelConfig))
		.pipe(dest('dist/'))
		.pipe(src('dist/**/*.js'))
		.pipe(uglify())
		.pipe(dest('dist/'));
}
