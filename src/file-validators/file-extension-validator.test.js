const { hasFileExtension } = require('./file-extension-validator')

describe('hasFileExtension', () => {
  it('returns true if the file has exactly the same extension as questioned' +
  '', () => {
    const expectedOutput = true
    const actualOutput = hasFileExtension({ fileName: 'myFile.doc', extension: 'doc' })
    expect(actualOutput)
      .toEqual(expectedOutput)
  })

  it('returns true if the filename matches the capitalized extension as questioned' +
  '', () => {
    const expectedOutput = true
    const actualOutput = hasFileExtension({ fileName: 'myFile.doc', extension: 'DOC' })
    expect(actualOutput)
      .toEqual(expectedOutput)
  })

  it('returns false if the filename does not have the extension as questioned' +
  '', () => {
    const expectedOutput = false
    const actualOutput = hasFileExtension({ fileName: 'myFile.doc', extension: 'csv' })
    expect(actualOutput)
      .toEqual(expectedOutput)
  })
})
