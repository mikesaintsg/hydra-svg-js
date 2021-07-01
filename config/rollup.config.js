import glob from 'glob';
import generateConfig from "./generateConfig.js";

export default glob.sync('src/**/*.js')
	.map(file => generateConfig(
		file.replace('src/', '').replace('.js', '')
	));
