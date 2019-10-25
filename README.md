# blackduck-dependencies-to-reference-format
Extracts dependencies from the output of tool __detect__ from BlackDuck (Synopsis), to a reference format. This reference format is a JSON file containing arrays of objects with keys _name_ and _version_.

# Usage
```
yarn extract-from-source -- [options]
```

### Supported options:

| Flag for *extract-from-source*             | Alias | Functionality
| ----------------- |:-----:| -------------------------------------
| --input [filename]|  -i   | (mandatory) Filename of the Detect source csv file to extract dependencies from.
| --output [filename]|  -o   | (optional) Filename to which the list of dependencies is written (json format). If the file already exists, it will be overwritten. Default value: dependencies_from_source.json
| --detect [value]|  -d   | (mandatory) Version fo the synopsis detect tool that was used to generate the input csv file. One of values in: [5.*, 6.*]
| --verbose         |       | Verbose output of commands and errors



## Usage examples

### extract-source-normalized
```
yarn extract-from-source -- -i ./testData/uid-web_source_2019-10-22_141714.csv -d 5.*
```

## Author
Sanda Contiu