# Hydra-Svg-Js

Hydrate SVG tags with icons from your favorite libraries


hydrate

	hooks

		before

		after


observe


Vue

```js
const iconPkgs = {
    'npm': require('npm-pack'),
	'custom': require('./packs/custom.js')
}

const hooks = {
	observer: true,
	after: () => console.log('After Hook'),
	before: () => console.log('Before Hook'),
	last: () => console.log('Last Hook')
}

const app = new Vue({
	el: '#app',
	mounted(){
	    const {hydrate} = require("hydra-svg-js");
	    hydrate(pkgs, hooks)
	}
});
```
