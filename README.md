# blackduck-dependencies-to-reference-format
## Description
Extracts dependencies from the source.csv artifact of tool __detect__ from BlackDuck (Synopsis).

Outputs two files: 
  - __dependencies_from_source.json__ contains the direct and transient (transitive) dependencies, in a reference format. This reference format is a JSON file containing arrays of objects with keys _name_ and _version_. It contains unique objects by the combination _name_ and _version_
  - __exactMatches_from_source.json__ contains the dependencies that are marked as 'Exact' match type in Blackduck, meaning that they were identified as a dependency based on matching file and/or folder structures.

### Note
It is important to mention that we chose to extract dependencies __from the source.csv__ file __instead of the components.csv__ file generated by Blackduck because we are interested in reporting on the actual dependencies, not on their grouping or aliasing to logical components as defined by BlackDuck.

# Status
1.0.1, see [CHANGELOG.md](./CHANGELOG.md)

# Limitation
- currently supporting versions 5.2.0 and 5.6.1 of Detect

# Prerequisites
- you should have Node installed (this script was tested with node v12.2.0)
- you should have yarn installed (we used version v1.19.0)

# Usage
```
yarn extract-from-source [options]
```

### Supported options:

| Flag               | Alias | Functionality
| ------------------ |:-----:| -------------------------------------
| --input [filename] |  -i   | (mandatory) Filename of the Detect source csv file to extract dependencies from.
| --output [filename]|  -o   | (optional) Filename to which the list of dependencies is written (json format). If the file already exists, it will be overwritten. Default value: dependencies_from_source.json
| --detect [value]   |  -d   | (optional) Version of the synopsis detect tool that was used to generate the input source csv file. One of values in: [5.2.0, 5.6.1]. Defaults to 5.6.1
| --verbose          |       | Verbose output of commands and errors
| --help             | -h    | Displays usage information
| --version          | -v    | Displays version number



### Sample usage
```
yarn extract-from-source -i ./testData/valid_source_detect_5_6_1.csv
```

## Technology stack
- Javascript
- This software is intended to be used standalone, as a command-line tool

## How to build
Get the sources locally; in a command line, go to the root folder of this project and execute:
```
yarn install
```
## How to test
```
yarn test
```
or 
```
yarn coverage
```

## How to do static analysis of code
Automatically enabled: standard
```
yarn lint
```

## Owners
See [CODEOWNERS](./CODEOWNERS)

## Maintainers
See [MAINTAINERS.md](./MAINTAINERS.md)

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
See [LICENSE.md](./LICENSE.md)

## Author
Sanda Contiu