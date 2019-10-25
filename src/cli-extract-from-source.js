#! /usr/bin/env node

const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')

const {
  infoMessage,
  errorMessage
} = require('./logger/logger')
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
  .option('--verbose', 'Verbose output of commands and errors')

  .parse(process.argv)

const { input, output, verbose } = program

const processFiles = async () => {
  infoMessage(
    chalk`Extracting information from {blue ${input}}...`,
    chalk`Program arguments:\n    input: {blue ${input}}\n    output: {blue ${output}}\n    verbose: {blue ${verbose}}`
  )

  if (!input) {
    errorMessage(chalk`{red Mandatory input is missing}; program exits`)
    return
  }

  if (!hasFileExtension({ fileName: input, extension: 'csv' })) {
    errorMessage(chalk`Input file ${input} {red is not a csv file}; program exits`)
    return
  }

  const rawDependenciesJsonArray = await getAsyncJsonArrayFromCsv(input)
  infoMessage(chalk`{blue ${rawDependenciesJsonArray.length}} elements read from the csv file {blue ${input}}\n`)

  const detectDependenciesInReferenceFormat = extractor.extractDependenciesToReferenceFormat({ sourcesJsonArray: rawDependenciesJsonArray })

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
