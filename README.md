# About this code

This repository was started in August of 2022 and uses [Docusaurus 2](https://docusaurus.io), a modern static website generator. The idea behind this repository was to help improve the documentation site of [Dataverse.org](https://dataverse.org) which at this time uses [OpenScholar](https://theopenscholar.com) and [Sphinx](https://www.sphinx-doc.org) with Sphinx being the main documentation tool for Dataverse.

## Why Docusaurus

Sphinx can be a bit of a hassle to setup locally with no simple way to instantly prop up a development environment, making collaboration a challenge. Sphinx also has a search tool that has serious limitations in performing 'specific searches' which newer search tools render inadequate.

The reason for Docusaurus was the built-in support for [algolia](https://www.algolia.com) site search tool and the ability to easily prop up a test environment on [Vercel](https://vercel.com) or similar cloud virtual hosting solutions without the need to create a coding environment locally (which can be pain for developers who simply wish to help with documentation and not have to worry about installing software dependencies which might not work with their computer setup).

## Using this code

The easiest way to begin on a copy of this code is to fork this repository in GitHub then log into Vercel.com and create a new project using your forked repo. Vercel will build the code and setup a test site so you could simply make changes to your forked repository code in GitHub.com and see the changes in Vercel as you make code updates without the need to setup NodeJs and NPM on your local computer (but you could do that as well).
