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

:::note To be continued
...the tables need to be revised as they do not work well in this document.
:::
