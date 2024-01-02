// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Payload Dependency Graph Plugin',
	favicon: 'img/favicon.svg',

	// Set the production url of your site here
	url: 'https://georgehulpoi.github.io',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/payload-dependency-graph/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'GeorgeHulpoi', // Usually your GitHub org/user name.
	projectName: 'payload-dependency-graph', // Usually your repo name.
	trailingSlash: false,

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	plugins: [
		[
			'@docusaurus/plugin-google-gtag',
			{
				trackingID: 'G-C20NB14GXS',
				anonymizeIP: true,
			},
		],
	],

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: '/',
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl:
						'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
					remarkPlugins: [
						[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
					],
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Payload Dependency Graph Plugin',
				items: [
					{
						type: 'doc',
						docId: 'introduction',
						position: 'left',
						label: 'Docs',
					},
					{
						type: 'docSidebar',
						position: 'left',
						sidebarId: 'api',
						label: 'API',
					},
					{
						href: 'https://github.com/GeorgeHulpoi/payload-dependency-graph',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				copyright: `This plugin is created and maintained by <a href="https://gvhdev.com">gvhdev.com</a>.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
