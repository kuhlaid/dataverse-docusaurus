# About this code

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

## Using the TypeSense search scrapper in Windows

See help at [https://typesense.org/docs/guide/docsearch.html#run-the-scraper]. I am using Ubuntu v20 in WSL2 terminal for commands so your terminal commands may vary slightly.

- Install jq using `sudo apt-get install jq` in WSL terminal
- Install TypeSense `docker pull typesense/typesense:0.23.1`
  
Then start TypeSense by entering the following command in a WSL2 terminal

Add the TypeSense search plugin `npm install docusaurus-theme-search-typesense@next --save`

Next add the sitemap plugin `npm install --save @docusaurus/plugin-sitemap`

The run a build of your app using `npm run build` (we need to do this instead of `npm run dev` because we need the builder to create a sitemap.xml file) then `npm run serve` command to test your build locally.

In your [.env] file, 

```env
TYPESENSE_API_KEY=[replace with key]
TYPESENSE_HOST=[replace with API cluster Node].a1.typesense.net
TYPESENSE_PORT=443
TYPESENSE_PROTOCOL=http2
```

```bash
export TYPESENSE_API_KEY=xyz

mkdir /tmp/typesense-data

docker run -p 8108:8108 -v/tmp/typesense-data:/data typesense/typesense:0.23.1 \
  --data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors
```

Check that Typesense is running properly by opening another WSL2 terminal and enter `curl http://localhost:8108/health` which should return `{"ok":true}` if things are running properly.

To run scrapper you MUST NOT specify the port to the site you are wanting to scrap. This is unfortunate because trying to run Docusaurus locally on port 80 will likely causing you problems.  

Finally run the site scrapper:

```bash
// run in interactive mode
docker run -it --env-file=.env -e "CONFIG=$(cat typesense_scrapper_config.json | jq -r tostring)" typesense/docsearch-scraper:latest

// run in daemon mode
docker run -d --env-file=.env -e "CONFIG=$(cat typesense_scrapper_config.json | jq -r tostring)" typesense/docsearch-scraper:latest
```
