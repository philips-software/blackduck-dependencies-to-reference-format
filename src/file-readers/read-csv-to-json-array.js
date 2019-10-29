// Do dot use package convert-csv-to-json because it removes the spaces from the key names!
// Use csvtojson instead
const csvtojson = require('csvtojson')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const {
  errorMessage
} = require('../logger/logger')

const getAsyncJsonArrayFromCsv = async ({ csvFileName }) => {
  let jsonArray
  let csvFileNameFullPath
  try {
    if (fs.existsSync(csvFileName)) {
      csvFileNameFullPath = csvFileName
    } else {
      csvFileNameFullPath = path.join(__dirname, csvFileName)
      if (!fs.existsSync(csvFileNameFullPath)) {
        throw new Error(`File ${csvFileName} could not be resolved to ${csvFileNameFullPath}`)
      }
    }
    jsonArray = await csvtojson().fromFile(csvFileNameFullPath)
  } catch (e) {
    errorMessage(chalk`Could not open ${csvFileName} for reading...`, e)
    return null
  }
  return jsonArray
}

module.exports = {
  getAsyncJsonArrayFromCsv
}
