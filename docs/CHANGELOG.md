# Documentation changelog for the Dataverse Project

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [future version] - To-Do/wish list items

- [ ] add documentation on using RSYNC in WSL for windows
- [ ] convert dataverse .rst files to .md format
- [ ] switch `{.interpreted-text role="doc"}` and `:doc:` instances to use Docusaurus link format `[link text]](./doc_path)` (the site build will ensure links are not broken)
- [ ] change placeholder home page
- [ ] rework the footer with Dataverse related items
- [ ] consider moving blog posts from [https://dataverse.org/blog] since the navigation of blog posts in OpenScholar is buggy and there is no blog search, plus static posts would load more quickly than a CMS
- [ ] replace placeholder Docusaurus images
- [ ] add short blurbs after the h1 header in the main doc pages so that the `category` pages (such as /docs/category/user-guide) will include blurbs in each of the links to the sections
- [ ] need descriptions of acronyms `VDC` and `DVN` in the [/docs/user-guide/tabular-data-ingest.md] file
- [ ] find better terminology for distinguishing between a user Dataverse project, **THE** Dataverse project and a Dataverse install (admin); should build a terminology doc that better explain the differences
- [ ] explain the usefulness of using the `File` selection checkbox on a Dataverse homepage (it enables finding files by tag and other)
- [ ] add Dataverse release versions to any image references applied to the docs so we are not polluting newer docs with old images that are no longer applicable
- [ ] consider a process for updating and embedding tables such as the large tables in `/docs/admin-guide/metadatacustomization.md` which should have their source stored in Excel or Google Sheets or in HTML table format; trying to edit the large tables in this document is unwieldy
- [ ] look into better documenting the metadata customization `/docs/admin-guide/metadatacustomization.md`
- [ ] change references to `Appendix` to `Metadata Standards`
- [ ] additional documentation migrated from .rst format

## [0.0.2] - 2022.08.25

- [x] adding TypeSense search [https://docusaurus.io/docs/search#using-typesense-docsearch]
- [x] adding environment variable handler and variables to the docusaurus.config.js file
- [x] enabling showLastUpdateTime and showLastUpdateAuthor
- [x] fixing URLs to `Edit this page` links
- [x] thought of possibly adding different versions of the Dataverse documentation since the UI has changed a bit in the newer versions of the Dataverse but will version the images instead so they can be updated as needed and running older versions of the software should be discouraged

## [0.0.1] - 2022.08.12

- [x] using the latest Docusaurus template as a starting point for converting some of the Dataverse docs as a proof of concept
- [x] using an online .rst to .md converter for migrating the Dataverse Sphinx documents to markdown
- [x] add Changelog under `/docs`

## Issues

- Tried adding Algolia search [https://docusaurus.io/docs/search#using-algolia-docsearch] but they do not crawl your site unless it is production ready (no testing environments), thus the decision to use TypeSense for testing.
