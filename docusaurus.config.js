// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config();   // required to use environment variables
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: process.env.NAVBAR_TITLE,
    tagline: 'Open source research data repository software',
    url: 'http://localhost:3000/',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: process.env.GITHUB_USER, // Usually your GitHub org/user name.
    projectName: process.env.GITHUB_REPO_NAME, // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            path: 'docs',
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: process.env.EDIT_URL,
            versions: {
              current: {
                label: 'current',
              },
            },
            lastVersion: 'current',
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: process.env.EDIT_URL,
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],
    themes: [
      // ... Your other themes.
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        {
          // ... Your options.
          // `hashed` is recommended as long-term-cache of index file is possible.
          hashed: true,
          highlightSearchTermsOnTargetPage: true
        },
      ],
    ],
    // themes: ['docusaurus-theme-search-typesense'],
    themeConfig:
      //** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // algolia: {
        //   appId: process.env.ALGOLIA_APPID,
        //   apiKey: process.env.ALGOLIA_APPKEY,
        //   indexName: process.env.ALGOLIA_INDEX,
        //   contextualSearch: true,
        // },
        navbar: {
          title: process.env.NAVBAR_TITLE,
          logo: {
            alt: 'Dataverse Logo',
            src: 'img/logo.svg',
          },
          items: [
            { to: '/docs/category/user-guide', label: 'User Guide', position: 'left' },
            { to: '/docs/category/admin-guide', label: 'Admin Guide', position: 'left' },
            {
              href: process.env.GITHUB_REPO_URL,
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: `About this site`,
              items: [
                {
                  label: 'Changelog',
                  to: '/docs/changelog',
                },
                {
                  label: 'Terminology',
                  to: '/docs/terminology',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Stack Overflow',
                  href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                },
                {
                  label: 'Discord',
                  href: 'https://discordapp.com/invite/docusaurus',
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/docusaurus',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} The Dataverse Project<br/>This documentation built 
        with Docusaurus on ${new Date().toLocaleString()}.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
