// Do dot use package convert-csv-to-json because it removes the spaces from the key names
const csvtojson = require('csvtojson')
const fs = require('fs')
const path = require('path')

const getAsyncJsonArrayFromCsv = async (csvFileName) => {
  let jsonArray
  let csvFileNameFullPath
  try {
    if (fs.existsSync(csvFileName)) {
      csvFileNameFullPath = csvFileName
    } else {
      csvFileNameFullPath = path.join(__dirname, csvFileName)
      if (!fs.existsSync(csvFileNameFullPath)) {
        console.error('file' + csvFileName + 'could not be resolved to' + csvFileNameFullPath)
        return null
      }
    }
    jsonArray = await csvtojson().fromFile(csvFileNameFullPath)
  } catch (e) {
    console.error('Could not open' + csvFileName + 'for reading...', e)
    return
  }
  return jsonArray
}

module.exports = {
  getAsyncJsonArrayFromCsv
}
