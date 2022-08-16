# Tabular Data, Representation, Storage and Ingest

This section explains the basics of how tabular data is handled in the
application and what happens during the ingest process, as the files
uploaded by the user are processed and converted into the archival
format in the Dataverse application.

## What Happens During this "Ingest"?

The goal of our ingest process is to extract the data content from the
user's files and archive it in an application-neutral, easily-readable
format. What does this mean? - Commercial applications such as SPSS and
Stata use their own, proprietary formats to encode their files. Some
companies publish the specifications of their formats (Thank you Stata -
much appreciated!), some don't (SPSS - yes, we are still frowning at
you here at the Dataverse Project). Either way, reading these
specially-formatted files requires some extra knowledge or special
software. For these reasons they are not considered ideal for the
purposes of archival preservation. The Dataverse installation stores the
raw data content extracted from such files in plain text, TAB-delimited
files. The metadata information that describes this content is stored
separately, in a relational database, so that it can be accessed
efficiently by the application. For the purposes of archival
preservation it can be exported, in plain text XML files, using a
standardized, open [DDI
Codebook](http://www.ddialliance.org/Specification/DDI-Codebook/2.5/)
format. (more info below)

## Tabular Data and Metadata

### Data vs. Metadata

A simple example is a numeric data column in a user's Stata file that
contains 0s and 1s. These numeric values will be extracted and stored in
a TAB-delimited file. By themselves, if you don't know what these
values represent, these 1s and 0s are not meaningful data. So the Stata
file has some additional information that describes this data vector: it
represents the observation values of a *variable* with the *name*
"party"; with a descriptive *label* "Party Affiliation"; and the 2
numeric values have *categorical labels* of "Democrat" for 0 and
"Republican" for 1. This extra information that adds value to the data
is *metadata*.

### Tabular Metadata in the Dataverse Software

The structure of the metadata defining tabular data variables used in
the Dataverse Software was originally based on the [DDI
Codebook](http://www.ddialliance.org/Specification/DDI-Codebook/2.5/)
format.

You can see an example of DDI output under the
`data-variable-metadata-access`{.interpreted-text role="ref"} section of
the `/api/dataaccess`{.interpreted-text role="doc"} section of the API
Guide.

## Supported File Formats

| File format                                  | Versions supported               |
| -------------------------------------------- | -------------------------------- |
| SPSS (POR and SAV formats)                   | 7 to 22                          |
| STATA                                        | 4 to 15                          |
| R                                            | up to 3                          |
| Excel                                        | XLSX only (XLS is NOT supported) |
| CSV/TSV (comma or tab-separated values)      | (limited support)                |

### SPSS

SPSS data files (POR and SAV formats).

#### Supported Versions

The Dataverse Software supports reading of all SPSS versions 7 to 22.
But please see the "Limitations" section.

#### SPSS Limitations

SPSS does not openly publish the specifications of their proprietary
file formats. Our ability to read and parse their files is based on some
documentation online from unofficial sources, and some reverse
engineering. Because of that we cannot, unfortunately, guarantee to be
able to process *any* SPSS file uploaded.

However, we've been improving this process for a few years by now, and
it should be quite robust in the current version of the Dataverse
Software. Thus your chances of success - uploading an SPSS files and
having it turned into a fully functional tabular data table in the
Dataverse installation - should be reasonably good.

If you are having a problem with a particular SPSS file, please contact
our support and we'll see if it's something we could further improve
in our SPSS ingest driver.

#### SPSS Control Cards - not supported

In the past, there have been attempts to support SPSS "control cards",
in addition to the .SAV and .POR files; both in the early VDC software,
and in some versions of DVN. A "control card" is a plain text file
with a set of SPSS commands that describe the raw data, provided in a
separate, fixed-width-columns or comma-separated-values file. For
various reasons, it has never been very successful.

Please contact us if you have any questions and/or strong feelings on
this issue, or if you have serious amounts of data exclusively available
in this format that you would like to ingest under the Dataverse
Software.

#### Support for Language Encodings in SPSS

Historically, there was no support for specifying a particular
language/code page encoding for the data stored in an SPSS file.
Meaning, text values in none-ASCII encodings, or non-Latin characters
could be entered and stored, but there was no setting to unambiguously
specify what language, or what character set it was. By default, the
Dataverse Software will try to interpret binary characters as UTF8. If
that's not working - for example, if the descriptive labels and/or
categorical values ingest as garbage - and if you happen to know what
encoding was used in the original file, you can now specify it in the
Ingest Options.

For example, if you know that the text in your SAV file is in Mandarin,
and is encoded using the GB2312, specify it as follows:

Upload your file, in the "Edit Files" tab of the Dataset page. Once
the file is recognized as SPSS/save, and *before* you click Save, go
into the "Advanced Ingest Options", and select "Simplified Chinese,
GB2312" in the nested menu under "Language Encoding" -\> "East
Asian".

### Stata

Of all the third party statistical software providers, Stata does the
best job at documenting the internal format of their files, by far. And
at making that documentation freely and easily available to developers
(yes, we are looking at you, SPSS). Because of that, Stata is the best
supported format for tabular data ingest.

### R Data Format

Support for R (.RData) files has been introduced in DVN 3.5.

#### Overview

R has been increasingly popular in the research/academic community,
owing to the fact that it is free and open-source (unlike SPSS and
STATA). Consequently, there is an increasing amount of data available
exclusively in R format.

#### Data Formatting Requirements

The data must be formatted as an R dataframe (`data.frame()`). If an
.RData file contains multiple dataframes, only the first one will be
ingested (this may change in the future).

#### Data Types, compared to other supported formats (Stat, SPSS)

##### Integers, Doubles, Character strings

The handling of these types is intuitive and straightforward. The
resulting tab file columns, summary statistics and UNF signatures should
be identical to those produced by ingesting the same vectors from SPSS
and Stata.

**Things that are unique to R:**

R explicitly supports Missing Values for all of the types above; Missing
Values encoded in R vectors will be recognized and preserved in TAB
files, counted in the generated summary statistics and data analysis.
Please note however that the Dataverse Software notation for a missing
value, as stored in a TAB file, is an empty string, an not "NA" as in
R.

In addition to Missing Values, R recognizes "Not a Value" (NaN) and
positive and negative infinity for floating point variables. These are
now properly supported by the Dataverse Software.

Also note, that unlike Stata, that does recognize "float" and
"double" as distinct data types, all floating point values in R are in
fact doubles.

##### R Factors

These are ingested as "Categorical Values" in the Dataverse
installation.

One thing to keep in mind: in both Stata and SPSS, the actual value of a
categorical variable can be both character and numeric. In R, all factor
values are strings, even if they are string representations of numbers.
So the values of the resulting categoricals in the Dataverse
installation will always be of string type too.

Another thing to note is that R factors have no builtin support for SPSS
or STATA-like descriptive labels. This is in fact potentially confusing,
as they also use the word "label", in R parlance. However, in the
context of a factor in R, it still refers to the "payload", or the
data content of its value. For example, if you create a factor with the
"labels" of *democrat*, *republican* and *undecided*, these strings
become the actual values of the resulting vector. Once ingested in the
Dataverse installation, these values will be stored in the tab-delimited
file. The Dataverse Software DataVariable object representing the vector
will be of type "Character" and have 3 VariableCategory objects with
the *democrat*, etc. for **both** the CategoryValue and CategoryLabel.
(In one of the future releases, we are planning to make it possible for
the user to edit the CategoryLabel, using it for its intended purpose -
as a descriptive, human-readable text text note).

| To properly handle R vectors that are *ordered factors* the Dataverse
  Software (starting with DVN 3.6) supports the concept of an "Ordered
  Categorical" - a categorical value where an explicit order is
  assigned to the list of value labels.

##### Boolean values

R Boolean (logical) values are supported.

#### Limitations of R, as compared to SPSS and STATA

Most noticeably, R lacks a standard mechanism for defining descriptive
labels for the data frame variables. In the Dataverse Software,
similarly to both Stata and SPSS, variables have distinct names and
labels; with the latter reserved for longer, descriptive text. With
variables ingested from R data frames the variable name will be used for
both the "name" and the "label".

*Optional R packages exist for providing descriptive variable labels; in
one of the future versions support may be added for such a mechanism. It
would of course work only for R files that were created with such
optional packages*.

Similarly, R categorical values (factors) lack descriptive labels too.
**Note:** This is potentially confusing, since R factors do actually
have "labels". This is a matter of terminology - an R factor's label
is in fact the same thing as the "value" of a categorical variable in
SPSS or Stata and the Dataverse Software; it contains the actual
meaningful data for the given observation. It is NOT a field reserved
for explanatory, human-readable text, such as the case with the
SPSS/Stata "label".

Ingesting an R factor with the level labels "MALE" and "FEMALE" will
produce a categorical variable with "MALE" and "FEMALE" in the
values and labels both.

#### Time values in R

This warrants a dedicated section of its own, because of some unique
ways in which time values are handled in R.

R makes an effort to treat a time value as a real time instance. This is
in contrast with either SPSS or Stata, where time value representations
such as "Sep-23-2013 14:57:21" are allowed; note that in the absence
of an explicitly defined time zone, this value cannot be mapped to an
exact point in real time. R handles times in the "Unix-style" way: the
value is converted to the "seconds-since-the-Epoch" Greenwich time
(GMT or UTC) and the resulting numeric value is stored in the data file;
time zone adjustments are made in real time as needed.

Things still get ambiguous and confusing when R **displays** this time
value: unless the time zone was explicitly defined, R will adjust the
value to the current time zone. The resulting behavior is often
counter-intuitive: if you create a time value, for example:

`timevalue<-as.POSIXct("03/19/2013 12:57:00", format = "%m/%d/%Y %H:%M:%OS");`

on a computer configured for the San Francisco time zone, the value will
be differently displayed on computers in different time zones; for
example, as "12:57 PST" while still on the West Coast, but as "15:57
EST" in Boston.

If it is important that the values are always displayed the same way,
regardless of the current time zones, it is recommended that the time
zone is explicitly defined. For example:

`attr(timevalue,"tzone")<-"PST"`

or

`timevalue<-as.POSIXct("03/19/2013 12:57:00", format = "%m/%d/%Y %H:%M:%OS", tz="PST");`

Now the value will always be displayed as "15:57 PST", regardless of
the time zone that is current for the OS \... **BUT ONLY** if the OS
where R is installed actually understands the time zone "PST", which
is not by any means guaranteed! Otherwise, it will **quietly adjust**
the stored GMT value to **the current time zone**, yet it will still
display it with the "PST" tag attached!\*\* One way to rephrase this
is that R does a fairly decent job **storing** time values in a
non-ambiguous, platform-independent manner - but gives you no guarantee
that the values will be displayed in any way that is predictable or
intuitive.

In practical terms, it is recommended to use the long/descriptive forms
of time zones, as they are more likely to be properly recognized on most
computers. For example, "Japan" instead of "JST". Another possible
solution is to explicitly use GMT or UTC (since it is very likely to be
properly recognized on any system), or the "UTC+\<OFFSET\>" notation.
Still, none of the above **guarantees** proper, non-ambiguous handling
of time values in R data sets. The fact that R **quietly** modifies time
values when it doesn't recognize the supplied timezone attribute, yet
still appends it to the **changed** time value does make it quite
difficult. (These issues are discussed in depth on R-related forums, and
no attempt is made to summarize it all in any depth here; this is just
to made you aware of this being a potentially complex issue!)

An important thing to keep in mind, in connection with the Dataverse
Software ingest of R files, is that it will **reject** an R data file
with any time values that have time zones that we can't recognize. This
is done in order to avoid (some) of the potential issues outlined above.

It is also recommended that any vectors containing time values ingested
into the Dataverse installation are reviewed, and the resulting entries
in the TAB files are compared against the original values in the R data
frame, to make sure they have been ingested as expected.

Another **potential issue** here is the **UNF**. The way the UNF
algorithm works, the same date/time values with and without the timezone
(e.g. "12:45" vs. "12:45 EST") **produce different UNFs**.
Considering that time values in Stata/SPSS do not have time zones, but
ALL time values in R do (yes, they all do - if the timezone wasn't
defined explicitly, it implicitly becomes a time value in the "UTC"
zone!), this means that it is **impossible** to have 2 time value
vectors, in Stata/SPSS and R, that produce the same UNF.

**A pro tip:** if it is important to produce SPSS/Stata and R versions
of the same data set that result in the same UNF when ingested, you may
define the time variables as **strings** in the R data frame, and use
the "YYYY-MM-DD HH:mm:ss" formatting notation. This is the formatting
used by the UNF algorithm to normalize time values, so doing the above
will result in the same UNF as the vector of the same time values in
Stata.

Note: date values (dates only, without time) should be handled the exact
same way as those in SPSS and Stata, and should produce the same UNFs.

### Excel

Microsoft Excel files (XLSX format).

#### Supported Formats

Only the newer XLSX Excel files are supported. We are not planning to
add support for the old-style, binary XLS files.

#### Excel Limitations

If an Excel file has multiple sheets, only the first sheet of the file
will be ingested. The other sheets will be available when a user
downloads the original Excel file. To have all sheets of an Excel file
ingested and searchable at the variable level, upload each sheet as an
individual file in your dataset.

#### Ingest Errors

You may encounter ingest errors after uploading an Excel file if the
file is formatted in a way that can't be ingested by the Dataverse
software. Ingest errors can be caused by a variety of formatting
inconsistencies, including:

- line breaks in a cell
- blank cells
- single cells that span multiple rows
- missing headers

##### Example Data

[An example of an Excel file that successfully
ingests](https://github.com/IQSS/dataverse-sample-data/blob/master/data/dataverses/dataverseno/datasets/tabular-sample-data/files/Tabular_Sample_Data.xlsx)
is available in the Dataverse Sample Data GitHub repository.

### CSV/TSV

#### Ingest of Comma-Separated Values and Tab-Separated Values files as tabular data

The Dataverse installation will make an attempt to turn CSV and TSV
files uploaded by the user into tabular data, using the [Apache CSV
parser](https://commons.apache.org/proper/commons-csv/).

#### Main formatting requirements

The first row in the document will be treated as the CSV's header,
containing variable names for each column.

Each following row must contain the same number of comma-separated
values ("cells") as that header.

As of the Dataverse Software 4.8 release, we allow ingest of CSV files
with commas and line breaks within cells. A string with any number of
commas and line breaks enclosed within double quotes is recognized as a
single cell. Double quotes can be encoded as two double quotes in a row
(`""`).

For example, the following lines:

``` {.none}
a,b,"c,d
efgh""ijk""l",m,n
```

are recognized as a **single** row with **5** comma-separated values
(cells):

``` {.none}
a
b 
c,d\nefgh"ijk"l
m
n 
```

(where `\n` is a new line character)

#### CSV/TSV Limitations

Compared to other formats, relatively little information about the data
("variable-level metadata") can be extracted from a CSV file. Aside
from the variable names supplied in the top line, the ingest will make
an educated guess about the data type of each comma-separated column.
One of the supported rich file formats (Stata, SPSS and R) should be
used if you need to provide more descriptive variable-level metadata
(variable labels, categorical values and labels, explicitly defined data
types, etc.).

#### Recognized data types and formatting

The application will attempt to recognize numeric, string, and date/time
values in the individual columns.

For dates, the `yyyy-MM-dd` format is recognized.

For date-time values, the following 2 formats are recognized:

`yyyy-MM-dd HH:mm:ss`

`yyyy-MM-dd HH:mm:ss z` (same format as the above, with the time zone
specified)

For numeric variables, the following special values are recognized:

`inf`, `+inf` - as a special IEEE 754 "positive infinity" value;

`NaN` - as a special IEEE 754 "not a number" value;

An empty value (i.e., a comma followed immediately by another comma, or
the line end), or `NA` - as a *missing value*.

`null` - as a numeric *zero*.

(any combinations of lower and upper cases are allowed in the notations
above).

In character strings, an empty value (a comma followed by another comma,
or the line end) is treated as an empty string (NOT as a *missing
value*).

Any non-Latin characters are allowed in character string values, **as
long as the encoding is UTF8**.

**Note:** When the ingest recognizes a CSV or TSV column as a numeric
vector, or as a date/time value, this information is reflected and saved
in the database as the *data variable metadata*. To inspect that
metadata, select *Variable Metadata* listed as a download option for the
tabular file. This will export the variable records in the DDI XML
format. (Alternatively, this metadata fragment can be downloaded via the
Data Access API; for example:
`http://localhost:8080/api/access/datafile/<FILEID>/metadata/ddi`).

The most immediate implication is in the calculation of the UNF
signatures for the data vectors, as different normalization rules are
applied to numeric, character, and date/time values. (see the
`/developers/unf/index`{.interpreted-text role="doc"} section for more
information). If it is important to you that the UNF checksums of your
data are accurately calculated, check that the numeric and date/time
columns in your file were recognized as such (as `type=numeric` and
`type=character, category=date(time)`, respectively). If, for example, a
column that was supposed to be numeric is recognized as a vector of
character values (strings), double-check that the formatting of the
values is consistent. Remember, a single improperly-formatted value in
the column will turn it into a vector of character strings, and result
in a different UNF. Fix any formatting errors you find, delete the file
from the dataset, and try to ingest it again.
