#! /usr/bin/env node

const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')

const extractor = require('./convert-to-dependencies-reference-structure/extract-dependencies-from-source')
const { getAsyncJsonArrayFromCsv } = require('./file-readers/read-csv-to-json-array.js')

program
  .version('0.0.1', '-v, --version')
  .option(
    '-i, --input [file]',
    'specifies source json filename which contains the dependencies as identified by Synopsis Detect (obtained by manual step conversion .csv to .json)',
    'source.json'
  )
  .option('-o, --output [filename]', 'specifies the output filename', 'dependencies_from_source.json')
  .option('--verbose', 'Verbose output of commands and errors')

  .parse(process.argv)

const { input, output, verbose } = program

const infoMessage = (message, verboseMessage) => {
  console.log(chalk`{green v} ${message}`)
  if (verbose && verboseMessage) {
    console.log(`  ${verboseMessage}`)
  }
}

const errorMessage = (message, verboseMessage) => {
  console.error(chalk`{red x} ${message}`)

  if (verbose && verboseMessage) {
    console.error(`  Detailed error: ${verboseMessage}`)
  }
}

const processFiles = async () => {
  infoMessage(
    chalk`Extracting information from {blue ${input}}...`,
    chalk`Program arguments:\n    input: {blue ${input}}\n    output: {blue ${output}}\n    verbose: {blue ${verbose}}`
  )

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
