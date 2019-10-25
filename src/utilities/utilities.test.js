const utilities = require('./utilities')

describe('sortByNameAndVersionCaseInsensitive', () => {
  it('sorts alphabetically, ' +
  'in a case insensitive manner for name ("A" and "a" are considered the same)', () => {
    const unsortedArrayInput = [
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'PACKAGE_B', version: 'B1.0.0' },
      { name: 'PACKAGE_A', version: 'A1.0.0' },
      { name: 'package_A', version: 'A1.0.0' }
    ]
    expect(utilities.sortByNameAndVersionCaseInsensitive(unsortedArrayInput))
      .toEqual([
        { name: 'PACKAGE_A', version: 'A1.0.0' },
        { name: 'package_A', version: 'A1.0.0' },
        { name: 'package_B', version: 'B1.0.0' },
        { name: 'PACKAGE_B', version: 'B1.0.0' }
      ])
  })

  it('sorts alphabetically, ' +
  'in a case insensitive manner for version ("A" and "a" are considered the same)', () => {
    const unsortedArrayInput = [
      { name: 'package_B', version: 'b1.0.0' },
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'package_A', version: 'A1.0.0' },
      { name: 'package_A', version: 'a1.0.0' }
    ]
    expect(utilities.sortByNameAndVersionCaseInsensitive(unsortedArrayInput))
      .toEqual([
        { name: 'package_A', version: 'A1.0.0' },
        { name: 'package_A', version: 'a1.0.0' },
        { name: 'package_B', version: 'b1.0.0' },
        { name: 'package_B', version: 'B1.0.0' }
      ])
  })

  it('sorts alphabetically by name and version', () => {
    const unsortedArrayInput = [
      { name: 'package_C', version: 'C1.0.0' },
      { name: 'package_A', version: 'A1.0.0' },
      { name: 'PACKAGE_A', version: 'A1.0.0' },
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'package_D', version: 'D2.0.0' },
      { name: 'package_D', version: 'D1.0.0' },
      { name: 'package_B', version: 'B1.0.0' },
      { name: 'package_A', version: 'a1.0.0' }
    ]
    expect(utilities.sortByNameAndVersionCaseInsensitive(unsortedArrayInput))
      .toEqual([
        { name: 'package_A', version: 'A1.0.0' },
        { name: 'PACKAGE_A', version: 'A1.0.0' },
        { name: 'package_A', version: 'a1.0.0' },
        { name: 'package_B', version: 'B1.0.0' },
        { name: 'package_B', version: 'B1.0.0' },
        { name: 'package_C', version: 'C1.0.0' },
        { name: 'package_D', version: 'D1.0.0' },
        { name: 'package_D', version: 'D2.0.0' }
      ])
  })
})

describe('everyElementHasAllKeys', () => {
  it('returns true ' +
  'if every element of the array contains all the keys as specified in the keys parameter',
  () => {
    const inputArray = [
      { key1: 'a', key2: 'b' },
      { key1: 'c', key2: 'd' }
    ]
    const inputKeys = ['key1', 'key2']
    const expectedOutput = true
    const actualOutput = utilities.everyElementHasAllKeys({
      jsonArray: inputArray,
      keys: inputKeys
    })
    expect(actualOutput)
      .toEqual(expectedOutput)
  })

  it('returns false ' +
  'if not every element of the array contains all the keys as specified in the keys parameter',
  () => {
    const inputArray = [
      { thisIsNotKey1: 'a', key2: 'b' },
      { key1: 'c', key2: 'd' }
    ]
    const inputKeys = ['key1', 'key2']
    const expectedOutput = false
    const actualOutput = utilities.everyElementHasAllKeys({
      jsonArray: inputArray,
      keys: inputKeys
    })
    expect(actualOutput)
      .toEqual(expectedOutput)
  })
})
