module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['eslint-config-alloy/typescript', 'eslint-config-alloy/vue'],
	parserOptions: {
		ecmaVersion: 2020,
		parser: 'babel-eslint',
		ecmaFeatures: {
			// 非 react 项目关闭 jsx 语法校验,默认为 true
			jsx: false,
			tsx: false
		},
		env: {
			es6: true
		}
	},
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		eqeqeq: 2,
		semi: [2, 'never'],
		quotes: [1, 'single'],
		'comma-dangle': [
			'error',
			{
				arrays: 'never',
				objects: 'never',
				imports: 'never',
				exports: 'never',
				functions: 'never'
			}
		],
		'vue/no-duplicate-attributes': 0,
		'no-angle-bracket-type-assertion': true
	}
}
