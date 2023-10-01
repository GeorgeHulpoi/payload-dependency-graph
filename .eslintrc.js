module.exports = {
	root: true,
	extends: ['./eslint-config'],
	overrides: [
		{
			files: ['src/**/*.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-dynamic-delete': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'no-plusplus': 'off',
			},
		},
	],
};
