module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended", "eslint-config-prettier"],
	ignorePatterns: ["dist", ".eslintrc.cjs", ".eslintrc.js", ".eslintrc.cjs", ".eslintrc.yaml", ".eslintrc.yml", ".eslintrc.json"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh", "@stylistic"],
	rules: {
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"@stylistic/indent": ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"]
	}
};
