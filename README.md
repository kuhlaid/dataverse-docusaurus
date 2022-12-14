# About this code

[![CI Status](https://github.com/kuhlaid/dataverse-docusaurus/workflows/CI/badge.svg?event=push)](https://github.com/kuhlaid/dataverse-docusaurus/actions?query=workflow%3ACI)

This repository was started in August of 2022 and uses [Docusaurus 2](https://docusaurus.io), a modern static website generator. The idea behind the repository was to help improve the documentation site of [Dataverse.org](https://dataverse.org) which at this time uses [OpenScholar](https://theopenscholar.com) and [Sphinx](https://www.sphinx-doc.org) with Sphinx being the main documentation tool for Dataverse.

## Why Docusaurus

Sphinx can be a bit of a hassle to setup locally with no simple way to instantly prop up a development environment, making collaboration a challenge. Sphinx also has a search tool that has serious limitations in performing 'specific searches' which newer search tools render inadequate.

The reason for Docusaurus was the built-in support for [algolia](https://www.algolia.com) site search tool and the ability to easily prop up a test environment on [Vercel](https://vercel.com) or similar cloud virtual hosting solutions without the need to create a coding environment locally (which can be pain for developers who simply wish to help with documentation and not have to worry about installing software dependencies which might not work with their computer setup).

- The Docusaurus framework automatically checks for broken links in your documents when you build the code (whether you are building locally or letting Vercel build for you). This is great for quality assurance.

## Using this code on Vercel

The easiest way use this code (for your own project or to help contribute to this documentation) is to fork this repository in GitHub then log into Vercel.com and create a new project using your forked repo. Vercel can be used as a cloud testing environment, to help you avoid the need to setup NodeJs and NPM on your local computer (but you could do that as well). Vercel will build from your GitHub code repository and setup a test site so you could simply make changes to your forked repository code in GitHub.com, and see the changes in Vercel as you make code updates. 

Note, some of the application settings are set as environment variables. The `.env.example` file contains place-holder values for the environment. These variables will need to be added to your Vercel project since you do not want sensitive environment API keys or passwords published/embedded in your repository code. Once you have the code deployed to Vercel from GitHub, a link to your test site on Vercel will added to your main repository page on GitHub.

## Using the code locally

For simplicity you can start with `npm install` from within the source code directory once you have downloaded the source code and then run `npm start` to start a local server at `http://localhost:3000/`. You will need to copy the `.env.example` file and rename it `.env` and edit the values to match your repository and environment.

## Using TypeSense and search scrapper on Windows

### Issues

This was a bit of a pain to setup, mainly from the indexing standpoint. I first tried the site scrapper (document search index) locally but the **scrapper did not like Docusaurus using port 3000 and did not allow indexing a local site running at specific ports**. What I decided to do was push the code to Vercel and use that publicly facing site to be my indexing site (since no port number needed to be specified to access the site) and then used [https://cloud.typesense.org] as the search host. Anyway, I'm not a big fan of this indexing process because it involves installing software locally (aside from Docker). Algolia did away with their local scraper and is all cloud now, so it relieves some headache on that front, but Algolia does not currently allow crawling on a testing basis. Also TypeSense does not have a 'document search' tool in their web console, so you can't tweak the search capabilities.

### Configuration

See help at [https://typesense.org/docs/guide/docsearch.html#run-the-scraper]. I am using Ubuntu v20 in WSL2 terminal for commands so your terminal commands may vary slightly.

Install some things locally to your WSL2 terminal

- Install jq using `sudo apt-get install jq`
- Install TypeSense `docker pull typesense/typesense:0.23.1`
  
Inside this project folder we need to add some packages (this is only for new Docusaurus installs, but this repository has these plugins in place)

- Add the TypeSense search plugin `npm install docusaurus-theme-search-typesense@next --save`
- Next add the sitemap plugin `npm install --save @docusaurus/plugin-sitemap`

In your [.env] file add the following variables (we are assuming we have a TypeSense cloud account setup since local scrapping of data did not work in my case):

```env
TYPESENSE_API_KEY=[replace with search API key on production and Admin API key when scrapping documents locally]
TYPESENSE_HOST=[replace with API cluster Node].a1.typesense.net
TYPESENSE_PORT=443
TYPESENSE_PROTOCOL=https
```

```bash
export TYPESENSE_ADMIN_API_KEY=[replace with your ADMIN API key and NOT search only API key]

mkdir /tmp/typesense-data

docker run -p 8108:8108 -v/tmp/typesense-data:/data typesense/typesense:0.23.1 \
  --data-dir /data --api-key=$TYPESENSE_ADMIN_API_KEY --enable-cors
```

Check that Typesense is running properly by opening another WSL2 terminal and enter `curl http://localhost:8108/health` which should return `{"ok":true}` if things are running properly.

To run the site scraper/indexer you MUST NOT specify the port to the site you are wanting to index. This is unfortunate because trying to run Docusaurus locally on port 80 will likely cause you problems and I did not have any luck with this. As a work-around I ran the site index against the Vercel hosted site.

Finally run the site indexer:

```bash
docker run -d --env-file=.env -e "CONFIG=$(cat typesense_scraper_config.json | jq -r tostring)" typesense/docsearch-scraper:latest
```

## Local search

Using the [https://github.com/easyops-cn/docusaurus-search-local] document search since DocSearch is a pain to setup and does not do well with code blocks in documents.

I tried installing @aldridged/docusaurus-plugin-lunr plugin but it didn't work. Broken plugin. Blah.
