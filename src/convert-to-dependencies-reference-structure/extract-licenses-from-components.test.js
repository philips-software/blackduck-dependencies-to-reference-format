const licensesExtractor = require('./extract-licenses-from-components')

describe('extractLicensesToExtendedReferenceFormat', () => {
  it('throws exception when input array does not contain the mandatory keys `Origin id` and `License names`',
    () => {
      const inputArray = [{ 'some key other than `Origin id` or `License names`': 'some value' }]
      const inputSbomJsonArray = []
      expect(() => {
        licensesExtractor.extractLicensesToExtendedReferenceFormat({
          componentsJsonArray: inputArray,
          sbomJsonArray: inputSbomJsonArray,
          nameVersionSeparator: '/'
        })
      }).toThrow()
    })

  it('returns an array of dependencies with their license info',
    () => {
      const inputComponentsArray = [
        { 'License ids': 'id1,id2', 'License names': '(license 1 OR license 2)', 'Origin id': 'dependency_A/0.0.1' },
        { 'License ids': 'id3', 'License names': 'license 3', 'Origin id': 'dependency_B/0.0.2, dependency_C/0.0.3' },
        { 'License ids': 'id4,id5', 'License names': '(license 4 AND license 5)', 'Origin id': 'dependency_D/0.0.4' }
      ]
      const inputSbomJsonArray = [
        { name: 'dependency_A', version: '0.0.1' },
        { name: 'dependency_B', version: '0.0.2' },
        { name: 'dependency_C', version: '0.0.3' },
        { name: 'dependency_D', version: '0.0.4' }
      ]
      const expectedOutput = [
        { name: 'dependency_A', version: '0.0.1', licenses: ['(license 1 OR license 2)'] },
        { name: 'dependency_B', version: '0.0.2', licenses: ['license 3'] },
        { name: 'dependency_C', version: '0.0.3', licenses: ['license 3'] },
        { name: 'dependency_D', version: '0.0.4', licenses: ['(license 4 AND license 5)'] }
      ]
      const actualOutput = licensesExtractor.extractLicensesToExtendedReferenceFormat({
        componentsJsonArray: inputComponentsArray,
        sbomJsonArray: inputSbomJsonArray,
        nameVersionSeparator: '/'
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })
})
