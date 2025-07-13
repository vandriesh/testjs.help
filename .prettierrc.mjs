import usernamePrettierConfig from "@epic-web/config/prettier";

/**
 * @type {import("prettier").Config}
 */
const config = {
	...usernamePrettierConfig,
    semi: true,
	useTabs: false,
	tabWidth: 4,
	width: 120,
	printWidth: 120,
};

export default config;