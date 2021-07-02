import {extendDefaultPlugins, optimize} from 'svgo';

export default function (contents, config = {}) {
	const defaults = {
		plugins: extendDefaultPlugins([
			{
				name: 'removeViewBox',
				active: false
			},
			'removeDimensions'
		])
	};

	return optimize(contents, {...defaults, ...config}).data;
}
