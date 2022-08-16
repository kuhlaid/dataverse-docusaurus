# Metadata Customization

:::caution
This section needs more work to clear up what is being described and what the Dataverse can and cannot do with metadata.
:::

The Dataverse Software has a flexible data-driven metadata system
powered by "metadata blocks" that are listed in the
[Metadata Standards](/docs/user-guide/metadata) section of the User
Guide. In this section we explain the customization options.

## Introduction

Before you embark on customizing metadata in your Dataverse installation
you should make sure you are aware of the modest amount of customization
that is available with your Dataverse installation's web interface.
It's possible to hide fields and make fields required or conditionally
required by clicking "Edit" at the Dataverse collection level,
clicking "General Information" and making adjustments under "Metadata
Fields" as described in the `create-dataverse`{.interpreted-text
role="ref"} section of the Dataverse Collection Management page in the
User Guide.

Much more customization of metadata is possible, but this is an advanced
topic so feedback on what is written below is very welcome. The
possibilities for customization include:

- Editing and adding metadata fields
- Editing and adding instructional text (field label tooltips and text
    box watermarks)
- Editing and adding controlled vocabularies
- Changing which fields depositors must use in order to save datasets
    (see also `dataset-templates`{.interpreted-text role="ref"} section
    of the User Guide.)
- Changing how saved metadata values are displayed in the UI

Generally speaking it is safer to create your own custom metadata block
rather than editing metadata blocks that ship with the Dataverse
Software, because changes to these blocks may be made in future
releases. If you'd like to make improvements to any of the metadata
blocks shipped with the Dataverse Software, please open an issue at
<https://github.com/IQSS/dataverse/issues> so it can be discussed before
a pull request is made. Please note that the metadata blocks shipped
with the Dataverse Software are based on standards (e.g. DDI for social
science) and you can learn more about these standards in the
`/user/appendix`{.interpreted-text role="doc"} section of the User
Guide. If you have developed your own custom metadata block that you
think may be of interest to the Dataverse community, please create an
issue and consider making a pull request as described in the
`/developers/version-control`{.interpreted-text role="doc"} section of
the Developer Guide.

In current versions of the Dataverse Software, custom metadata are no
longer defined as individual fields, as they were in Dataverse Network
(DVN) 3.x, but in metadata blocks. The Dataverse Software now ships with
a citation metadata block, which includes mandatory fields needed for
assigning persistent IDs to datasets, and domain specific metadata
blocks. For a complete list, see the `/user/appendix`{.interpreted-text
role="doc"} section of the User Guide.

Definitions of these blocks are loaded into a Dataverse installation in
tab-separated value (TSV).[^1]^,^[^2] While it is technically possible
to define more than one metadata block in a TSV file, it is good
organizational practice to define only one in each file.

The metadata block TSVs shipped with the Dataverse Software are in
[/tree/develop/scripts/api/data/metadatablocks](https://github.com/IQSS/dataverse/tree/develop/scripts/api/data/metadatablocks)
and the corresponding ResourceBundle property files
[/tree/develop/src/main/java](https://github.com/IQSS/dataverse/tree/develop/src/main/java)
of the Dataverse Software GitHub repo. Human-readable copies are
available in [this Google Sheets
document](https://docs.google.com/spreadsheets/d/13HP-jI_cwLDHBetn9UKTREPJ_F4iHdAvhjmlvmYdSSw/edit#gid=0)
but they tend to get out of sync with the TSV files, which should be
considered authoritative. The Dataverse Software installation process
operates on the TSVs, not the Google spreadsheet.

## About the metadata block TSV

Here we list and describe the purposes of each section and property of
the metadata block TSV.

1. metadataBlock
    - Purpose: Represents the metadata block being defined.
    - Cardinality:
        - 0 or more per Dataverse installation
        - 1 per Metadata Block definition
2. datasetField
    - Purpose: Each entry represents a metadata field to be defined
        within a metadata block.
    - Cardinality: 1 or more per metadataBlock
3. controlledVocabulary
    - Purpose: Each entry enumerates an allowed value for a given
        datasetField.
    - Cardinality: zero or more per datasetField

Each of the three main sections own sets of properties:

### \#metadataBlock properties

+--------+------------------------------+------------------------------+
| **Prop |**Purpose**|**Allowed values and         |
| erty**|                              | restrictions**               |
+--------+------------------------------+------------------------------+
| name   | A user-definable string used | • No spaces or punctuation,  |
|        | to identify a                | except underscore.           |
|        | \#metadataBlock              |                              |
|        |                              | • By convention, should      |
|        |                              | start with a letter, and use |
|        |                              | lower camel case[^3]         |
|        |                              |                              |
|        |                              | • Must not collide with a    |
|        |                              | field of the same name in    |
|        |                              | the same or any other        |
|        |                              | \#datasetField definition,   |
|        |                              | including metadata blocks    |
|        |                              | defined elsewhere.[^4]       |
+--------+------------------------------+------------------------------+
| da     | If specified, this metadata  | Free text. For an example,   |
| tavers | block will be available only | see custom_hbgdki.tsv.       |
| eAlias | to the Dataverse collection  |                              |
|        | designated here by its alias |                              |
|        | and to children of that      |                              |
|        | Dataverse collection.        |                              |
+--------+------------------------------+------------------------------+
| displ  | Acts as a brief label for    | Should be relatively brief.  |
| ayName | display related to this      | The limit is 256 character,  |
|        | \#metadataBlock.             | but very long names might    |
|        |                              | cause display problems.      |
+--------+------------------------------+------------------------------+
| bl     | Associates the properties in | The citation \#metadataBlock |
| ockURI | a block with an external     | has the blockURI             |
|        | URI. Properties will be      | <<https://dat>                 |
|        | assigned the global          | averse.org/schema/citation/> |
|        | identifier blockURI\<name\>  | which assigns a default      |
|        | in the OAI_ORE metadata and  | global URI to terms such as  |
|        | archival Bags                | <<https://dataverse.o>         |
|        |                              | rg/schema/citation/subtitle> |
+--------+------------------------------+------------------------------+

### \#datasetField (field) properties

+-----------+-----------------------+------------------------+---------+
| **P       |**Purpose**|**Allowed values and   |         |
| roperty**|                       | restrictions**         |         |
+-----------+-----------------------+------------------------+---------+
| name      | A user-definable      | • (from                |         |
|           | string used to        | DatasetFieldType.java) |         |
|           | identify a            | The internal DDI-like  |         |
|           | \#datasetField. Maps  | name, no spaces, etc.  |         |
|           | directly to field     |                        |         |
|           | name used by Solr.    | • (from Solr) Field    |         |
|           |                       | names should consist   |         |
|           |                       | of alphanumeric or     |         |
|           |                       | underscore characters  |         |
|           |                       | only and not start     |         |
|           |                       | with a digit. This is  |         |
|           |                       | not currently strictly |         |
|           |                       | enforced, but other    |         |
|           |                       | field names will not   |         |
|           |                       | have first class       |         |
|           |                       | support from all       |         |
|           |                       | components and back    |         |
|           |                       | compatibility is not   |         |
|           |                       | guaranteed. Names with |         |
|           |                       | both leading and       |         |
|           |                       | trailing underscores   |         |
|           |                       | (e.g. _version_)   |         |
|           |                       | are reserved.          |         |
|           |                       |                        |         |
|           |                       | • Must not collide     |         |
|           |                       | with a field of the    |         |
|           |                       | same same name in      |         |
|           |                       | another                |         |
|           |                       | \#metadataBlock        |         |
|           |                       | definition or any name |         |
|           |                       | already included as a  |         |
|           |                       | field in the Solr      |         |
|           |                       | index.                 |         |
+-----------+-----------------------+------------------------+---------+
| title     | Acts as a brief label | Should be relatively   |         |
|           | for display related   | brief.                 |         |
|           | to this               |                        |         |
|           | \#datasetField.       |                        |         |
+-----------+-----------------------+------------------------+---------+
| de        | Used to provide a     | Free text              |         |
| scription | description of the    |                        |         |
|           | field.                |                        |         |
+-----------+-----------------------+------------------------+---------+
| watermark | A string to initially | Free text              |         |
|           | display in a field as |                        |         |
|           | a prompt for what the |                        |         |
|           | user should enter.    |                        |         |
+-----------+-----------------------+------------------------+---------+
| fieldType | Defines the type of   |                        | • none  |
|           | content that the      |                        | • date  |
|           | field, if not empty,  |                        | • email |
|           | is meant to contain.  |                        | • text  |
|           |                       |                        | •       |
|           |                       |                        | textbox |
|           |                       |                        | • url • |
|           |                       |                        | int •   |
|           |                       |                        | float • |
|           |                       |                        | See     |
|           |                       |                        | below   |
|           |                       |                        | for     |
|           |                       |                        | fi      |
|           |                       |                        | eldtype |
|           |                       |                        | defi    |
|           |                       |                        | nitions |
+-----------+-----------------------+------------------------+---------+
| dis       | Controls the sequence | Non-negative integer.  |         |
| playOrder | in which the fields   |                        |         |
|           | are displayed, both   |                        |         |
|           | for input and         |                        |         |
|           | presentation.         |                        |         |
+-----------+-----------------------+------------------------+---------+
| disp      | Controls how the      | See below for          |         |
| layFormat | content is displayed  | displayFormat          |         |
|           | for presentation (not | variables              |         |
|           | entry). The value of  |                        |         |
|           | this field may        |                        |         |
|           | contain one or more   |                        |         |
|           | special variables     |                        |         |
|           | (enumerated below).   |                        |         |
|           | HTML tags, likely in  |                        |         |
|           | conjunction with one  |                        |         |
|           | or more of these      |                        |         |
|           | values, may be used   |                        |         |
|           | to control the        |                        |         |
|           | display of content in |                        |         |
|           | the web UI.           |                        |         |
+-----------+-----------------------+------------------------+---------+
| a         | Specify whether this  | TRUE (available) or    |         |
| dvancedSe | field is available in | FALSE (not available)  |         |
| archField | advanced search.      |                        |         |
+-----------+-----------------------+------------------------+---------+
| allowCo   | Specify whether the   | TRUE (controlled) or   |         |
| ntrolledV | possible values of    | FALSE (not controlled) |         |
| ocabulary | this field are        |                        |         |
|           | determined by values  |                        |         |
|           | in the                |                        |         |
|           | \                     |                        |         |
|           | #controlledVocabulary |                        |         |
|           | section.              |                        |         |
+-----------+-----------------------+------------------------+---------+
| allow     | Specify whether this  | TRUE (repeatable) or   |         |
| multiples | field is repeatable.  | FALSE (not repeatable) |         |
+-----------+-----------------------+------------------------+---------+
| facetable | Specify whether the   | TRUE (controlled) or   |         |
|           | field is facetable    | FALSE (not controlled) |         |
|           | (i.e., if the         |                        |         |
|           | expected values for   |                        |         |
|           | this field are        |                        |         |
|           | themselves useful     |                        |         |
|           | search terms for this |                        |         |
|           | field). If a field is |                        |         |
|           | "facetable" (able   |                        |         |
|           | to be faceted on), it |                        |         |
|           | appears under         |                        |         |
|           | "Browse/Search       |                        |         |
|           | Facets" when you     |                        |         |
|           | edit "General        |                        |         |
|           | Information" for a   |                        |         |
|           | Dataverse collection. |                        |         |
|           | Setting this value to |                        |         |
|           | TRUE generally makes  |                        |         |
|           | sense for enumerated  |                        |         |
|           | or controlled         |                        |         |
|           | vocabulary fields,    |                        |         |
|           | fields representing   |                        |         |
|           | identifiers (IDs,     |                        |         |
|           | names, email          |                        |         |
|           | addresses), and other |                        |         |
|           | fields that are       |                        |         |
|           | likely to share       |                        |         |
|           | values across         |                        |         |
|           | entries. It is less   |                        |         |
|           | likely to make sense  |                        |         |
|           | for fields containing |                        |         |
|           | descriptions,         |                        |         |
|           | floating point        |                        |         |
|           | numbers, and other    |                        |         |
|           | values that are       |                        |         |
|           | likely to be unique.  |                        |         |
+-----------+-----------------------+------------------------+---------+
| d         | Designate fields that | TRUE (display during   |         |
| isplayonc | should display during | creation) or FALSE     |         |
| reate[^5] | the creation of a new | (don't display during  |         |
|           | dataset, even before  | creation)              |         |
|           | the dataset is saved. |                        |         |
|           | Fields not so         |                        |         |
|           | designated will not   |                        |         |
|           | be displayed until    |                        |         |
|           | the dataset has been  |                        |         |
|           | saved.                |                        |         |
+-----------+-----------------------+------------------------+---------+
| required  | For primitive fields, | For primitive fields,  |         |
|           | specify whether or    | TRUE (required) or     |         |
|           | not the field is      | FALSE (optional).      |         |
|           | required.             |                        |         |
|           |                       | For compound fields:   |         |
|           | For compound fields,  |                        |         |
|           | also specify if one   | • To make one or more  |         |
|           | or more subfields are | subfields optional,    |         |
|           | required or           | the parent field and   |         |
|           | conditionally         | subfield(s) must be    |         |
|           | required. At least    | FALSE (optional).      |         |
|           | one instance of a     |                        |         |
|           | required field must   | • To make one or more  |         |
|           | be present. More than | subfields required,    |         |
|           | one instance of a     | the parent field and   |         |
|           | field may be allowed, | the required           |         |
|           | depending on the      | subfield(s) must be    |         |
|           | value of              | TRUE (required).       |         |
|           | allowmultiples.       |                        |         |
|           |                       | • To make one or more  |         |
|           |                       | subfields              |         |
|           |                       | conditionally          |         |
|           |                       | required, make the     |         |
|           |                       | parent field FALSE     |         |
|           |                       | (optional) and make    |         |
|           |                       | TRUE (required) any    |         |
|           |                       | subfield or subfields  |         |
|           |                       | that are required if   |         |
|           |                       | any other subfields    |         |
|           |                       | are filled.            |         |
+-----------+-----------------------+------------------------+---------+
| parent    | For subfields,        | • Must not result in a |         |
|           | specify the name of   | cyclical reference.    |         |
|           | the parent or         |                        |         |
|           | containing field.     | • Must reference an    |         |
|           |                       | existing field in the  |         |
|           |                       | same \#metadataBlock.  |         |
+-----------+-----------------------+------------------------+---------+
| metadat   | Specify the name of   | • Must reference an    |         |
| ablock_id | the \#metadataBlock   | existing               |         |
|           | that contains this    | \#metadataBlock.       |         |
|           | field.                |                        |         |
|           |                       | • As a best practice,  |         |
|           |                       | the value should       |         |
|           |                       | reference the          |         |
|           |                       | \#metadataBlock in the |         |
|           |                       | current definition (it |         |
|           |                       | is technically         |         |
|           |                       | possible to reference  |         |
|           |                       | another existing       |         |
|           |                       | metadata block.)       |         |
+-----------+-----------------------+------------------------+---------+
| termURI   | Specify a global URI  | For example, the       |         |
|           | identifying this term | existing citation      |         |
|           | in an external        | \#metadataBlock        |         |
|           | community vocabulary. | defines the property   |         |
|           |                       | named 'title' as     |         |
|           | This value overrides  | <<http://pu>             |         |
|           | the default (created  | rl.org/dc/terms/title> |         |
|           | by appending the      | - i.e. indicating that |         |
|           | property name to the  | it can be interpreted  |         |
|           | blockURI defined for  | as the Dublin Core     |         |
|           | the \#metadataBlock)  | term 'title'         |         |
+-----------+-----------------------+------------------------+---------+

### \#controlledVocabulary (enumerated) properties

  -------------- ------------------------------- -----------------------------
  **Property**   **Purpose**                     **Allowed values and
                                                 restrictions**

  DatasetField   Specifies the \#datasetField to Must reference an existing
                 which \#datasetField to which   \#datasetField. As a best
                 this entry applies.             practice, the value should
                                                 reference a \#datasetField in
                                                 the current metadata block
                                                 definition. (It is
                                                 technically possible to
                                                 reference an existing
                                                 \#datasetField from another
                                                 metadata block.)

  Value          A short display string,         Free text
                 representing an enumerated
                 value for this field. If the
                 identifier property is empty,
                 this value is used as the
                 identifier.

  identifier     A string used to encode the     Free text
                 selected enumerated value of a  
                 field. If this property is
                 empty, the value of the "Value"
                 field is used as the
                 identifier.

  displayOrder   Control the order in which the  Non-negative integer.
                 enumerated values are displayed
                 for selection.
  -------------- ------------------------------- -----------------------------

### FieldType definitions

  **Fieldtype**   **Definition**

  none            Used for compound fields, in which case the
                  parent field would have no value and
                  display no data entry control.

  date            A date, expressed in one of three
                  resolutions of the form YYYY-MM-DD,
                  YYYY-MM, or YYYY.

  email           A valid email address. Not indexed for
                  privacy reasons.

  text            Any text other than newlines may be entered
                  into this field.

  textbox         Any text may be entered. For input, the
                  Dataverse Software presents a multi-line
                  area that accepts newlines. While any HTML
                  is permitted, only a subset of HTML tags
                  will be rendered in the UI. See the
                  `supported-html-fields`{.interpreted-text
                  role="ref"} section of the Dataset + File
                  Management page in the User Guide.

  url             If not empty, field must contain a valid
                  URL.

  int             An integer value destined for a numeric
                  field.

  float           A floating point number destined for a
                  numeric field.

### displayFormat variables

These are common ways to use the displayFormat to control how values are
displayed in the UI. This list is not exhaustive.

+---------------------------------+--------------------------------------------------------+
| **Variable**                    | **Description**                                        |
+---------------------------------+--------------------------------------------------------+
| (blank)                         | The displayFormat is left blank                        |
|                                 | for primitive fields (e.g.                             |
|                                 | subtitle) and fields that do not                       |
|                                 | take values (e.g. author), since                       |
|                                 | displayFormats do not work for                         |
|                                 | these fields.                                          |
+---------------------------------+--------------------------------------------------------+
| #VALUE                          | The value of the field (instance level).               |
+---------------------------------+--------------------------------------------------------+
| #NAME                           | The name of the field (class level).                   |
+---------------------------------+--------------------------------------------------------+
| #EMAIL                          | For displaying emails.                                 |
+---------------------------------+--------------------------------------------------------+
| \<a href="#VALUE">#VALUE</a>     | For displaying the value as a                          |
|                                 | link (if the value entered is a                        |
|                                 | link).                                                 |
+---------------------------------+--------------------------------------------------------+
| \<a href='URL/#VALUE'>#VALUE</a> | For displaying the value as a                          |
|                                 | link, with the value included in                       |
|                                 | the URL (e.g. if URL is                                |
|                                 | \http://emsearch.rutgers.edu/atla\                     |
|                                 | \s/#VALUE_summary.html,                                |
|                                 | and the value entered is 1001,                         |
|                                 | the field is displayed as                              |
|                                 | `1001 <http://emsearch.rutgers.ed                      |
|                                 | u/atlas/1001_summary.html>`__                          |
|                                 | (hyperlinked to                                        |
|                                 | http://emsearch.rutgers.edu/atlas/1001_summary.html)). |
+---------------------------------+--------------------------------------------------------+
| <img src="#VALUE" alt="#NAME"   | For displaying the image of an                         |
| class="metadata-logo"/>\<br/>   | entered image URL (used to                             |
|                                 | display images in the producer                         |
|                                 | and distributor logos metadata                         |
|                                 | fields).                                               |
+---------------------------------+--------------------------------------------------------+
| #VALUE:                         | Appends and/or prepends                                |
|                                 | characters to the value of the                         |
| \- #VALUE:                      | field. e.g. if the displayFormat                       |
|                                 | for the distributorAffiliation is                      |
| (#VALUE)                        | (#VALUE) (wrapped with parens)                         |
|                                 | and the value entered                                  |
|                                 | is University of North                                 |
|                                 | Carolina, the field is displayed                       |
|                                 | in the UI as (University of                            |
|                                 | North Carolina).                                       |
+---------------------------------+--------------------------------------------------------+
| ;                               | Displays the character (e.g.                           |
|                                 | semicolon, comma) between the                          |
| :                               | values of fields within                                |
|                                 | compound fields. For example,                          |
| ,                               | if the displayFormat for the                           |
|                                 | compound field "series" is a                           |
|                                 | colon, and if the value                                |
|                                 | entered for seriesName is                              |
|                                 | IMPs and for                                           |
|                                 | seriesInformation is A                                 |
|                                 | collection of NMR data, the                            |
|                                 | compound field is displayed in                         |
|                                 | the UI as IMPs: A                                      |
|                                 | collection of NMR data.                                |
+---------------------------------+--------------------------------------------------------+

## Metadata Block Setup

Now that you understand the TSV format used for metadata blocks, the
next step is to attempt to make improvements to existing metadata blocks
or create entirely new metadata blocks. For either task, you should have
a Dataverse Software development environment set up for testing where
you can drop the database frequently while you make edits to TSV files.
Once you have tested your TSV files, you should consider making a pull
request to contribute your improvement back to the community.

### Exploring Metadata Blocks

In addition to studying the TSV files themselves you might find the
following highly experimental and subject-to-change API endpoints useful
to understand the metadata blocks that have already been loaded into
your Dataverse installation:

You can get a dump of metadata fields (yes, the output is odd, please
open a issue) like this:

`curl http://localhost:8080/api/admin/datasetfield`

To see details about an individual field such as "title" in the
example below:

`curl http://localhost:8080/api/admin/datasetfield/title`

### Setting Up a Dev Environment for Testing

You have several options for setting up a dev environment for testing
metadata block changes:

- Vagrant: See the `/developers/tools`{.interpreted-text role="doc"}
    section of the Developer Guide.
- docker-aio: See
    <https://github.com/IQSS/dataverse/tree/develop/conf/docker-aio>
- AWS deployment: See the `/developers/deployment`{.interpreted-text
    role="doc"} section of the Developer Guide.
- Full dev environment: See the
    `/developers/dev-environment`{.interpreted-text role="doc"} section
    of the Developer Guide.

To get a clean environment in Vagrant, you'll be running
`vagrant destroy`. In Docker, you'll use `docker rm`. For a full dev
environment or AWS installation, you might find `rebuild` and related
scripts at `scripts/deploy/phoenix.dataverse.org` useful.

### Editing TSV files

Early in Dataverse Software 4.0 development, metadata blocks were edited
in the Google spreadsheet mentioned above and then exported in TSV
format. This worked fine when there was only one person editing the
Google spreadsheet but now that contributions are coming in from all
over, the TSV files are edited directly. We are somewhat painfully aware
that another format such as XML might make more sense these days. Please
see <https://github.com/IQSS/dataverse/issues/4451> for a discussion of
non-TSV formats.

Please note that metadata fields share a common namespace so they must
be unique. The following curl command will print the list of metadata
fields already available in the system:

`curl http://localhost:8080/api/admin/index/solr/schema`

We'll use this command again below to update the Solr schema to
accomodate metadata fields we've added.

### Loading TSV files into a Dataverse Installation

A number of TSV files are loaded into a newly-installed Dataverse
installation, becoming the metadata blocks you see in the UI. For the
list of metadata blocks that are included with the Dataverse Software
out of the box, see the `/user/appendix`{.interpreted-text role="doc"}
section of the User Guide.

Along with TSV file, there are corresponding ResourceBundle property
files with key=value pair
[here](https://github.com/IQSS/dataverse/tree/develop/src/main/java/propertyFiles).
To add other language files, see the
`/installation/config`{.interpreted-text role="doc"} for
dataverse.lang.directory JVM Options section, and add a file, for
example: "citation_lang.properties" to the path you specified for the
`dataverse.lang.directory` JVM option, and then restart the app server.

If you are improving an existing metadata block, the Dataverse Software
installation process will load the TSV for you, assuming you edited the
TSV file in place. The TSV file for the Citation metadata block, for
example, can be found at `scripts/api/data/metadatablocks/citation.tsv`.
If any of the below mentioned property values are changed, corresponding
ResourceBundle property file has to be edited and stored under
`dataverse.lang.directory` location

- name, displayName property under \#metadataBlock
- name, title, description, watermark properties under \#datasetfield
- DatasetField, Value property under \#controlledVocabulary

If you are creating a new custom metadata block (hopefully with the idea
of contributing it back to the community if you feel like it would
provide value to others), the Dataverse Software installation process
won't know about your new TSV file so you must load it manually. The
script that loads the TSV files into the system is
`scripts/api/setup-datasetfields.sh` and contains a series of curl
commands. Here's an example of the necessary curl command with the new
custom metadata block in the "/tmp" directory.

`curl http://localhost:8080/api/admin/datasetfield/load -H "Content-type: text/tab-separated-values" -X POST --upload-file /tmp/new-metadata-block.tsv`

To create a new ResourceBundle, here are the steps to generate key=value
pair for the three main sections:

### \#metadataBlock properties

metadatablock.name=(the value of **name** property from \#metadatablock)

metadatablock.displayName=(the value of **displayName** property from
\#metadatablock)

example:

metadatablock.name=citation

metadatablock.displayName=Citation Metadata

### \#datasetField (field) properties

datasetfieldtype.(the value of **name** property from
\#datasetField).title=(the value of **title** property from
\#datasetField)

datasetfieldtype.(the value of **name** property from
\#datasetField).description=(the value of **description** property from
\#datasetField)

datasetfieldtype.(the value of **name** property from
\#datasetField).watermark=(the value of **watermark** property from
\#datasetField)

example:

datasetfieldtype.title.title=Title

datasetfieldtype.title.description=Full title by which the Dataset is
known.

datasetfieldtype.title.watermark=Enter title\...

### \#controlledVocabulary (enumerated) properties

controlledvocabulary.(the value of **DatasetField** property from
\#controlledVocabulary).(the value of **Value** property from
\#controlledVocabulary)=(the value of **Value** property from
\#controlledVocabulary)

Since the **Value** property from \#controlledVocabulary is free text,
while creating the key, it has to be converted to lowercase, replace
space with underscore, and strip accents.

example:

controlledvocabulary.subject.agricultural_sciences=Agricultural Sciences

controlledvocabulary.language.marathi_\(marathi\)=Marathi \(Maru0101u1E6Dhu012B\)

### Enabling a Metadata Block

Running a curl command like "load" example above should make the new
custom metadata block available within the system but in order to start
using the fields you must either enable it from the UI (see
`general-information`{.interpreted-text role="ref"} section of Dataverse
Collection Management in the User Guide) or by running a curl command
like the one below using a superuser API token. In the example below we
are enabling the "journal" and "geospatial" metadata blocks for the
root Dataverse collection:

`curl -H "X-Dataverse-key:$API_TOKEN" -X POST -H "Content-type:application/json" -d "["journal","geospatial"]" http://localhost:8080/api/dataverses/:root/metadatablocks`

### Updating the Solr Schema

Once you have enabled a new metadata block you should be able to see the
new fields in the GUI but before you can save the dataset, you must add
additional fields to your Solr schema.

An API endpoint of your Dataverse installation provides you with a
generated set of all fields that need to be added to the Solr schema
configuration, including any enabled metadata schemas:

`curl "http://localhost:8080/api/admin/index/solr/schema"`

You can use
`update-fields.sh <../../../../conf/solr/8.11.1/update-fields.sh>`{.interpreted-text
role="download"} to easily add these to the Solr schema you installed
for your Dataverse installation.

The script needs a target XML file containing your Solr schema. (See the
`/installation/prerequisites/`{.interpreted-text role="doc"} section of
the Installation Guide for a suggested location on disk for the Solr
schema file.)

You can either pipe the downloaded schema to the script or provide the
file as an argument. (We recommended you to take a look at usage output
of `update-fields.sh -h`)

``` {. caption="Example usage of ``update-fields.sh``"}
curl "http://localhost:8080/api/admin/index/solr/schema" | update-fields.sh /usr/local/solr/server/solr/collection1/conf/schema.xml

```

You will need to reload your Solr schema via an HTTP-API call, targeting
your Solr instance:

`curl "http://localhost:8983/solr/admin/cores?action=RELOAD&core=collection1"`

You can easily roll your own little script to automate the process
(which might involve fetching the schema bits from some place else than
your Dataverse installation).

Please note that reconfigurations of your Solr index might require a
re-index. Usually release notes indicate a necessary re-index, but for
your custom metadata you will need to keep track on your own.

Please note also that if you are going to make a pull request updating
`conf/solr/8.11.1/schema.xml` with fields you have added, you should
first load all the custom metadata blocks in
`scripts/api/data/metadatablocks` (including ones you don't care about)
to create a complete list of fields. (This might change in the future.)

## Reloading a Metadata Block

As mentioned above, changes to metadata blocks that ship with the
Dataverse Software will be made over time to improve them and release
notes will sometimes instruct you to reload an existing metadata block.
The syntax for reloading is the same as loading. Here's an example with
the "citation" metadata block:

`curl http://localhost:8080/api/admin/datasetfield/load -H "Content-type: text/tab-separated-values" -X POST --upload-file citation.tsv`

Great care must be taken when reloading a metadata block. Matching is
done on field names (or identifiers and then names in the case of
controlled vocabulary values) so it's easy to accidentally create
duplicate fields.

The ability to reload metadata blocks means that SQL update scripts
don't need to be written for these changes. See also the
`/developers/sql-upgrade-scripts`{.interpreted-text role="doc"} section
of the Developer Guide.

## Using External Vocabulary Services

The Dataverse software has a mechanism to associate specific fields
defined in metadata blocks with a vocabulary(ies) managed by external
services. The mechanism relies on trusted third-party Javascripts. The
mapping from field type to external vocabulary(ies) is managed via the
`:CVocConf <:CVocConf>`{.interpreted-text role="ref"} setting.

*This functionality is considered 'experimental'. It may require
significant effort to configure and is likely to evolve in subsequent
Dataverse software releases.*

The effect of configuring this mechanism is similar to that of defining
a field in a metadata block with 'allowControlledVocabulary=true':

-   Users are able to select from a controlled list of values.
-   Values can be shown in any language the term has been defined in.

In general, the external vocabulary support mechanism may be a better
choice for large vocabularies, hierarchical/structured vocabularies,
and/or vocabularies managed by third-parties. In addition, the external
vocabulary mechanism differs from the internal controlled vocabulary
mechanism in several ways that may make it a preferred option:

-   the machine-readable URI form of a vocabulary is stored in the
    Dataverse database and can be included in exported metadata files.
-   vocabulary mappings can be changed without changing the metadata
    block, making it possible for different Dataverse installations to
    use different vocabularies in the same field.
-   mappings can associate a field with more than one vocabulary.
-   mappings can be configured to also allow custom/free-text entries as
    well as vocabulary values.
-   mappings can be configured for compound fields and a user's
    selection of a given vocabulary value can be used to fill in related
    child fields (e.g. selection of a keyword could fill in a vocabulary
    name field as well).
-   removing a mapping does not affect stored values (the field would
    revert to allowing free text).

The specifics of the user interface for entering/selecting a vocabulary
term and how that term is then displayed are managed by third-party
Javascripts. The initial Javascripts that have been created provide
auto-completion, displaying a list of choices that match what the user
has typed so far, but other interfaces, such as displaying a tree of
options for a hierarchical vocabulary, are possible. Similarly, existing
scripts do relatively simple things for displaying a term - showing the
term's name in the appropriate language and providing a link to an
external URL with more information, but more sophisticated displays are
possible.

Scripts supporting use of vocabularies from services supporting the
SKOMOS protocol (see <https://skosmos.org>) and retrieving ORCIDs (from
<https:/orcid.org>) are available
<https://github.com/gdcc/dataverse-external-vocab-support>. (Custom
scripts can also be used and community members are encouraged to share
new scripts through the dataverse-external-vocab-support repository.)

Configuration involves specifying which fields are to be mapped, whether
free-text entries are allowed, which vocabulary(ies) should be used,
what languages those vocabulary(ies) are available in, and several
service protocol and service instance specific parameters. These are all
defined in the `:CVocConf <:CVocConf>`{.interpreted-text role="ref"}
setting as a JSON array. Details about the required elements as well as
example JSON arrays are available at
<https://github.com/gdcc/dataverse-external-vocab-support>, along with
an example metadata block that can be used for testing. The scripts
required can be hosted locally or retrieved dynamically from
<https://gdcc.github.io/> (similar to how dataverse-previewers work).

## Tips from the Dataverse Community

When creating new metadata blocks, please review the
`/style/text`{.interpreted-text role="doc"} section of the Style Guide,
which includes guidance about naming metadata fields and writing text
for metadata tooltips and watermarks.

If there are tips that you feel are omitted from this document, please
open an issue at <https://github.com/IQSS/dataverse/issues> and consider
making a pull request to make improvements. You can find this document
at
<https://github.com/IQSS/dataverse/blob/develop/doc/sphinx-guides/source/admin/metadatacustomization.rst>

Alternatively, you are welcome to request "edit" access to this "Tips
for Dataverse Software metadata blocks from the community" Google doc:
<https://docs.google.com/document/d/1XpblRw0v0SvV-Bq6njlN96WyHJ7tqG0WWejqBdl7hE0/edit?usp=sharing>

The thinking is that the tips can become issues and the issues can
eventually be worked on as features to improve the Dataverse Software
metadata system.

## Footnotes

[^1]: <https://www.iana.org/assignments/media-types/text/tab-separated-values>

[^2]: Although the structure of the data, as you'll see below, violates
    the "Each record must have the same number of fields" tenet of TSV

[^3]: <https://en.wikipedia.org/wiki/CamelCase>

[^4]: These field names are added to the Solr schema.xml and cannot be
    duplicated. See "Editing TSV files" for how to check for
    duplication.

[^5]: "displayoncreate" was "showabovefold" in Dataverse Software
    `<=4.3.1` (see
    [\#3073](https://github.com/IQSS/dataverse/issues/3073)) but parsing
    is done based on column order rather than name so this only matters
    to the person reading the TSV file.
