#! /usr/bin/env node

const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')

const {
  setVerbose,
  infoMessage,
  warningMessage,
  errorMessage
} = require('./logger/logger')
const {
  SUPPORTED_DETECT_VERSIONS,
  DEFAULT_DETECT_VERSION
} = require('./constants/detect-versions')
const extractor = require('./convert-to-dependencies-reference-structure/extract-dependencies-from-source')
const { getAsyncJsonArrayFromCsv } = require('./file-readers/read-csv-to-json-array.js')
const { hasFileExtension } = require('./file-validators/file-extension-validator')

program
  .version('0.0.1', '-v, --version')
  .option(
    '-i, --input [file]',
    'specifies source.csv filename which contains the dependencies as identified by Synopsis Detect'
  )
  .option('-o, --output [filename]', 'specifies the output filename', 'dependencies_from_source.json')
  .option('-d, --detect [value]', '(optional) specifies the version of the synopsis detect tool that was used to generate the input file. Defaults to 5.*. One of: 5.*, 6.*')
  .option('--verbose', 'Verbose output of commands and errors')

  .parse(process.argv)

const { input, output, detect, verbose } = program

const processFiles = async () => {
  setVerbose(verbose)

  infoMessage(
    chalk`extract-from-source\n Program arguments:\n    input: {blue ${input}}\n    output: {blue ${output}}\n    detect: {blue ${detect}}\n    verbose: {blue ${verbose}}`
  )

  if (!input) {
    errorMessage(chalk`{red Mandatory input is missing}; program exits`)
    return
  }

  if (!hasFileExtension({ fileName: input, extension: 'csv' })) {
    errorMessage(chalk`Input file ${input} {red is not a csv file}; program exits`)
    return
  }

  let versionOfDetect = detect
  if (!detect) {
    warningMessage(chalk`{yellow Missing parameter detect}; will use default: {blue ${DEFAULT_DETECT_VERSION}}`)
    versionOfDetect = DEFAULT_DETECT_VERSION
  }

  if (!SUPPORTED_DETECT_VERSIONS.includes(versionOfDetect)) {
    errorMessage(chalk`{red unsupported detect version: ${versionOfDetect}}; program exits`)
    return
  }

  const rawDependenciesJsonArray = await getAsyncJsonArrayFromCsv(input)
  infoMessage(chalk`{blue ${rawDependenciesJsonArray.length}} elements read from the csv file {blue ${input}}\n`)

  const detectDependenciesInReferenceFormat = extractor.extractDependenciesToReferenceFormat({ sourcesJsonArray: rawDependenciesJsonArray, versionOfDetect })

  infoMessage(
    chalk`Writing {blue ${detectDependenciesInReferenceFormat.length}} elements to {blue ${output}}`
  )

  try {
    await fs.writeJSON(output, detectDependenciesInReferenceFormat, { spaces: 2, eol: '\n' })
  } catch (e) {
    errorMessage(chalk`Could not write to {blue ${output}}`, e)
  }
}

processFiles()
