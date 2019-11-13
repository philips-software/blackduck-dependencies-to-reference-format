# CHANGELOG

## 1.0.0
- extracts dependencies from source.csv (output of BlackDuck/Synopsis Detect tool, versions '5.2.0', '5.6.1')
## 1.0.1
- removes duplicates (by name + version) from the output representing the direct and transitive dependencies.
## 1.0.2
- allows to overwrite the default character (/) separating the name from the version in column Origin name id of source.csv
## 1.0.3
- adds optional parameter to read license info from the components.csv file