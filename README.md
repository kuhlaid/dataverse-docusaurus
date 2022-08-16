# About this code

This repository was started in August of 2022 and uses [Docusaurus 2](https://docusaurus.io), a modern static website generator. The idea behind the repository was to help improve the documentation site of [Dataverse.org](https://dataverse.org) which at this time uses [OpenScholar](https://theopenscholar.com) and [Sphinx](https://www.sphinx-doc.org) with Sphinx being the main documentation tool for Dataverse.

## Why Docusaurus

Sphinx can be a bit of a hassle to setup locally with no simple way to instantly prop up a development environment, making collaboration a challenge. Sphinx also has a search tool that has serious limitations in performing 'specific searches' which newer search tools render inadequate.

The reason for Docusaurus was the built-in support for [algolia](https://www.algolia.com) site search tool and the ability to easily prop up a test environment on [Vercel](https://vercel.com) or similar cloud virtual hosting solutions without the need to create a coding environment locally (which can be pain for developers who simply wish to help with documentation and not have to worry about installing software dependencies which might not work with their computer setup).

- The Docusaurus framework automatically checks for broken links in your documents when you build the code (whether you are building locally or letting Vercel build for you). This is great for quality assurance.

## Using this code on Vercel

The easiest way use this code (for your own project or to help contribute to this documentation) is to fork this repository in GitHub then log into Vercel.com and create a new project using your forked repo. Vercel can be used as a cloud testing environment, to help you avoid the need to setup NodeJs and NPM on your local computer (but you could do that as well). Vercel will build from your GitHub code repository and setup a test site so you could simply make changes to your forked repository code in GitHub.com, and see the changes in Vercel as you make code updates. Once you have the code deployed to Vercel from GitHub, a link to your test site on Vercel will added to your main repository page on GitHub.

## Using the code locally

For simplicity you can start with `npm install` once you have downloaded the source code and then run `npm start` to start a local server at `http://localhost:3000/`
