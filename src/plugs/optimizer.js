import {extendDefaultPlugins, optimize} from 'svgo';

class Optimizer {
	optimizeContents(contents) {
		return optimize(contents, {
			plugins: extendDefaultPlugins([
				{
					name: 'removeViewBox',
					active: false
				},
				'removeDimensions'
			])
		}).data;
	}
}

export default new Optimizer()
