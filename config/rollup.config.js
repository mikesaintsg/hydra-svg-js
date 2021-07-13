import fglob from 'fast-glob';
import generateConfig from "./generateConfig.js";

export default fglob.sync('src/**/*.js')
	.map(file => generateConfig(
		file.replace('src/', '').replace('.js', '')
	));
