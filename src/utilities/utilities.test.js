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
