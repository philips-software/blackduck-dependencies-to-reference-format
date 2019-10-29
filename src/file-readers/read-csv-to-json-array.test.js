const csvToJsonConverter = require('./read-csv-to-json-array')

const sampleCsvFilename = '../../testData/simpleCsvFile.csv'
const emptyCsvFilename = '../../testData/emptyCsvFile.csv'
const inexistingCsvFileName = 'thisFileDoesNotExist.csv'

describe('getAsyncJsonArrayFromCsv', () => {
  it('extracts all data (rows) to JSON objects from the input csv file' +
  sampleCsvFilename, async () => {
    const expectedOutput = [
      { 'key A': 'a1', 'key B': 'b1' },
      { 'key A': 'a2', 'key B': 'b2' }
    ]
    const actualOutput = await csvToJsonConverter.getAsyncJsonArrayFromCsv({ csvFileName: sampleCsvFilename })
    expect(actualOutput)
      .toEqual(expectedOutput)
  })

  it('returns an empty JSON array from csv file containing header but NO data: ' +
  emptyCsvFilename, async () => {
    const jsonArr = await csvToJsonConverter.getAsyncJsonArrayFromCsv({ csvFileName: emptyCsvFilename })
    expect(jsonArr)
      .toEqual([])
  })

  it('returns null when the input csv file does not exist: ' +
  inexistingCsvFileName, async () => {
    const jsonArr = await csvToJsonConverter.getAsyncJsonArrayFromCsv({ csvFileName: inexistingCsvFileName })
    expect(jsonArr)
      .toEqual(null)
  })
})
