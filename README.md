# blackduck-dependencies-to-reference-format
Extracts dependencies from the source.csv output of tool __detect__ from BlackDuck (Synopsis), to a reference format. This reference format is a JSON file containing arrays of objects with keys _name_ and _version_.

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



## Usage examples
```
yarn extract-from-source -i ./testData/valid_source_detect_5_6_1.csv
```

## Author
Sanda Contiu