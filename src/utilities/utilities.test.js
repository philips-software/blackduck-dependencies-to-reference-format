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

describe('filterForKeyValues', () => {
  it('returns those elements of the array that have, for the given key, any of the specified key values',
    () => {
      const inputArray = [
        { key1: 'a', key2: 'b' },
        { key1: 'c', key2: 'd' },
        { key1: 'e', key2: 'f' },
        { key1: 'a', key2: 'h' }
      ]
      const inputKey = 'key1'
      const inputKeyValues = ['a', 'c']
      const expectedOutput = [
        { key1: 'a', key2: 'b' },
        { key1: 'c', key2: 'd' },
        { key1: 'a', key2: 'h' }
      ]
      const actualOutput = utilities.filterForKeyValues({
        jsonArray: inputArray,
        key: inputKey,
        keyValuesToMatchTo: inputKeyValues
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('returns an empty array if, given an array with elements, for the given key, none of the specified key values match',
    () => {
      const inputArray = [
        { key1: 'a', key2: 'b' },
        { key1: 'c', key2: 'd' }
      ]
      const inputKey = 'key1'
      const inputKeyValues = ['keyvalue not present']
      const expectedOutput = []
      const actualOutput = utilities.filterForKeyValues({
        jsonArray: inputArray,
        key: inputKey,
        keyValuesToMatchTo: inputKeyValues
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('returns an empty array if the input JSON array is empty',
    () => {
      const inputArray = []
      const inputKey = 'key1'
      const inputKeyValues = ['keyvalue']
      const expectedOutput = []
      const actualOutput = utilities.filterForKeyValues({
        jsonArray: inputArray,
        key: inputKey,
        keyValuesToMatchTo: inputKeyValues
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('returns an empty array if, given an array with elements, the key values to match to is empty',
    () => {
      const inputArray = [
        { key1: 'a', key2: 'b' },
        { key1: 'c', key2: 'd' }
      ]
      const inputKey = 'key1'
      const inputKeyValues = []
      const expectedOutput = []
      const actualOutput = utilities.filterForKeyValues({
        jsonArray: inputArray,
        key: inputKey,
        keyValuesToMatchTo: inputKeyValues
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })
})
