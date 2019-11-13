#! /usr/bin/env node

const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')

const {
  setVerbose,
  infoMessage,
  errorMessage
} = require('./logger/logger')
const {
  isSupportedVersionOfDetect,
  DEFAULT_DETECT_VERSION,
  SUPPORTED_DETECT_VERSIONS
} = require('./constants/supported-detect-versions')
const dependenciesExtractor = require('./convert-to-dependencies-reference-structure/extract-dependencies-from-source')
const licensesExtractor = require('./convert-to-dependencies-reference-structure/extract-licenses-from-components')

const { getAsyncJsonArrayFromCsv } = require('./file-readers/read-csv-to-json-array.js')
const { hasFileExtension } = require('./file-validators/file-extension-validator')

program
  .version('1.0.3', '-v, --version')
  .option(
    '-i, --input [file]',
    '(mandatory) specifies source.csv filename which contains the dependencies as identified by Synopsis Detect'
  )
  .option(
    '--licenses [file]',
    '(optional) specifies components.csv filename which contains the licenses as identified by Synopsis Detect'
  )
  .option('-o, --output [filename]', '(optional) specifies the output filename', 'dependencies_from_source.json')
  .option('-d, --detect [value]', `(optional) specifies the version of the synopsis detect tool that was used to generate the input file. One of: ${SUPPORTED_DETECT_VERSIONS}.`, DEFAULT_DETECT_VERSION)
  .option('-s, --separator [value]', '(optional) specifies the separator character for the Origin name id key. Defaults to `/`. Known values for the separator: / for Javascript, : for Java', '/')
  .option('--verbose', '(optional) Verbose output of commands and errors')

  .parse(process.argv)

const { input, licenses, output, detect, separator, verbose } = program

const processFiles = async () => {
  setVerbose(verbose)

  infoMessage(
    chalk`extract-from-source\n Program arguments:\n    input: {blue ${input}}\n    licenses: {blue ${licenses}}\n    output: {blue ${output}}\n    detect: {blue ${detect}}\n    separator: {blue ${separator}}\n    verbose: {blue ${verbose}}`
  )

  if (!input) {
    errorMessage(chalk`{red Mandatory input parameter is missing} (run 'extract-from-source --help' for usage); program exits`)
    return
  }

  if (!hasFileExtension({ fileName: input, extension: 'csv' })) {
    errorMessage(chalk`Input file ${input} {red is not a csv file}; program exits`)
    return
  }

  if (licenses && !hasFileExtension({ fileName: licenses, extension: 'csv' })) {
    errorMessage(chalk`Licenses file ${licenses} {red is not a csv file}; program exits`)
    return
  }

  let versionOfDetect = detect
  if (!isSupportedVersionOfDetect({ versionOfDetect })) {
    errorMessage(chalk`{red Unsupported detect version: ${versionOfDetect}}. Supported versions: ${SUPPORTED_DETECT_VERSIONS}. {red Program exits}`)
    return
  }

  const rawDependenciesJsonArray = await getAsyncJsonArrayFromCsv({ csvFileName: input })
  infoMessage(chalk`{blue ${rawDependenciesJsonArray.length}} elements read from the csv file {blue ${input}}\n`)

  const detectDependenciesInReferenceFormat = dependenciesExtractor.extractDependenciesToReferenceFormat({ sourcesJsonArray: rawDependenciesJsonArray, versionOfDetect, nameVersionSeparator: separator })

  infoMessage(
    chalk`Writing {blue ${detectDependenciesInReferenceFormat.length}} elements unique by keys name and version to {blue ${output}}\n`
  )

  try {
    await fs.writeJSON(output, detectDependenciesInReferenceFormat, { spaces: 2, eol: '\n' })
  } catch (e) {
    errorMessage(chalk`Could not write to {blue ${output}}`, e)
  }

  const exactMatchesFilename = `exactMatches_from_source.json`
  const exactMatchesInOriginalFormat = dependenciesExtractor.filterExactMatchesInOriginalFormat({
    sourcesJsonArray: rawDependenciesJsonArray
  })

  infoMessage(
    chalk`Writing {blue ${exactMatchesInOriginalFormat.length}} elements to {blue ${exactMatchesFilename}}\n`
  )

  try {
    await fs.writeJSON(exactMatchesFilename, exactMatchesInOriginalFormat, { spaces: 2, eol: '\n' })
  } catch (e) {
    errorMessage(chalk`Could not write to {blue ${exactMatchesFilename}}`, e)
  }

  if (licenses) {
    infoMessage(chalk`Reading from the licenses file...\n`)
    const componentsJsonArray = await getAsyncJsonArrayFromCsv({ csvFileName: licenses })
    infoMessage(chalk`{blue ${componentsJsonArray.length}} elements read from the csv file {blue ${licenses}}\n`)

    const licensesInReferenceFormat = licensesExtractor.extractLicensesToExtendedReferenceFormat({
      componentsJsonArray, sbomJsonArray: detectDependenciesInReferenceFormat, nameVersionSeparator: separator
    })

    const licensesOutputFilename = 'dependencies_with_licenses.json'
    infoMessage(chalk`Writing dependencies with licenses to file ${licensesOutputFilename}...\n`)
    try {
      await fs.writeJSON(licensesOutputFilename, licensesInReferenceFormat, { spaces: 2, eol: '\n' })
    } catch (e) {
      errorMessage(chalk`Could not write to {blue ${licensesOutputFilename}}`, e)
    }
  }
}

processFiles()
