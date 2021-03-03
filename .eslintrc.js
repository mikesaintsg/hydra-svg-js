module.exports = {
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},
	"env": {
		"mocha": true,
		"node": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"rules": {
		"no-unused-vars": [
			"error",
			{"varsIgnorePattern": "should|expect"}
		],
		"no-multiple-empty-lines": "warn",
		"no-var": "error",
		"prefer-const": "error",
		"no-useless-escape": "off"
	},
	"globals": {
		"document": "readonly",
		"window": "readonly",
		"expect": "readonly"
	}
};
