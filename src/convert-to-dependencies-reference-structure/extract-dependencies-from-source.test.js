const depsExtractor = require('./extract-dependencies-from-source')

const validSourceDetect561With1Direct2Transitive1ExactDependencies = [
  {
    'Component id': 'comp_id_1',
    'Version id': 'version_id_1',
    'Origin id': 'origin_id_1',
    'Component name': '@ngtools/webpack',
    'Component version name': '1.9.8',
    'Component origin version name': '1.9.8',
    'Match type': 'Direct Dependency',
    'Match content': '@ngtools/webpack/1.9.8',
    'Path': '',
    'Archive context': '',
    'Usage': 'DYNAMICALLY_LINKED',
    'Adjusted': 'false',
    'Component policy status': '',
    'Overridden By': '',
    'Origin name': 'npmjs',
    'Origin name id': '@ngtools/webpack/1.9.8',
    'Snippet Review status': ''
  },
  {
    'Component id': 'comp_id_2',
    'Version id': 'version_id_2',
    'Origin id': 'origin_id_2',
    'Component name': '@types/minimatch',
    'Component version name': '3.0.1',
    'Component origin version name': '3.0.1',
    'Match type': 'Transitive Dependency',
    'Match content': '@types/minimatch/3.0.1',
    'Path': '',
    'Archive context': '',
    'Usage': 'DYNAMICALLY_LINKED',
    'Adjusted': 'false',
    'Component policy status': '',
    'Overridden By': '',
    'Origin name': 'npmjs',
    'Origin name id': '@types/minimatch/3.0.1',
    'Snippet Review status': ''
  },
  {
    'Component id': 'comp_id_3',
    'Version id': 'version_id_3',
    'Origin id': 'origin_id_3',
    'Component name': 'fizzware/create-react-app',
    'Component version name': '3.0.8',
    'Component origin version name': '3.0.8',
    'Match type': 'Exact',
    'Match content': '',
    'Path': 'src/App.js',
    'Archive context': '',
    'Usage': 'DYNAMICALLY_LINKED',
    'Adjusted': 'false',
    'Component policy status': '',
    'Overridden By': '',
    'Origin name': 'npmjs',
    'Origin name id': 'sad-react-scripts/3.0.8',
    'Snippet Review status': ''
  },
  {
    'Component id': 'comp_id_2',
    'Version id': 'version_id_2',
    'Origin id': 'origin_id_2',
    'Component name': 'fizzware/create-react-app',
    'Component version name': '1.0.1',
    'Component origin version name': '1.0.1',
    'Match type': 'Transitive Dependency',
    'Match content': 'react-app-polyfill/1.0.1',
    'Path': '',
    'Archive context': '',
    'Usage': 'DYNAMICALLY_LINKED',
    'Adjusted': 'false',
    'Component policy status': '',
    'Overridden By': '',
    'Origin name': 'npmjs',
    'Origin name id': 'react-app-polyfill/1.0.1',
    'Snippet Review status': ''
  }
]
const validSourceDetect561With1DirectDependencies = [
  {
    'Component id': 'comp_id_1',
    'Version id': 'version_id_1',
    'Origin id': 'origin_id_1',
    'Component name': '@ngtools/webpack',
    'Component version name': '1.9.8',
    'Component origin version name': '1.9.8',
    'Match type': 'Direct Dependency',
    'Match content': '@ngtools/webpack/1.9.8',
    'Path': '',
    'Archive context': '',
    'Usage': 'DYNAMICALLY_LINKED',
    'Adjusted': 'false',
    'Component policy status': '',
    'Overridden By': '',
    'Origin name': 'npmjs',
    'Origin name id': '@ngtools/webpack/1.9.8',
    'Snippet Review status': ''
  }
]
const validSourceDetect561With1ExactDependencies = [
  {
    'Component id': 'comp_id_3',
    'Version id': 'version_id_3',
    'Origin id': 'origin_id_3',
    'Component name': 'fizzware/create-react-app',
    'Component version name': '3.0.8',
    'Component origin version name': '3.0.8',
    'Match type': 'Exact',
    'Match content': '',
    'Path': 'src/App.js',
    'Archive context': '',
    'Usage': 'DYNAMICALLY_LINKED',
    'Adjusted': 'false',
    'Component policy status': '',
    'Overridden By': '',
    'Origin name': 'npmjs',
    'Origin name id': 'sad-react-scripts/3.0.8',
    'Snippet Review status': ''
  }
]

describe('filterExactMatchesInOriginalFormat', () => {
  it('returns an array of elements (formateted as in the original array) for which the `Match type` key is `Exact`. (This is regardless of detect version)',
    () => {
      const input = validSourceDetect561With1Direct2Transitive1ExactDependencies
      const expectedOutput = [
        {
          'Component id': 'comp_id_3',
          'Version id': 'version_id_3',
          'Origin id': 'origin_id_3',
          'Component name': 'fizzware/create-react-app',
          'Component version name': '3.0.8',
          'Component origin version name': '3.0.8',
          'Match type': 'Exact',
          'Match content': '',
          'Path': 'src/App.js',
          'Archive context': '',
          'Usage': 'DYNAMICALLY_LINKED',
          'Adjusted': 'false',
          'Component policy status': '',
          'Overridden By': '',
          'Origin name': 'npmjs',
          'Origin name id': 'sad-react-scripts/3.0.8',
          'Snippet Review status': ''
        }
      ]
      const actualOutput = depsExtractor.filterExactMatchesInOriginalFormat({
        sourcesJsonArray: input

      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('returns an empty array of elements if the original array has no element for which the `Match type` key is `Exact`',
    () => {
      const input = validSourceDetect561With1DirectDependencies
      const expectedOutput = []
      const actualOutput = depsExtractor.filterExactMatchesInOriginalFormat({
        sourcesJsonArray: input

      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('returns an empty array of elements if the original array has no elements at all',
    () => {
      const input = []
      const expectedOutput = []
      const actualOutput = depsExtractor.filterExactMatchesInOriginalFormat({
        sourcesJsonArray: input

      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })
})

describe('extractDependenciesToReferenceFormat', () => {
  it('throws exception when input array does not contain the mandatory keys `Match content` and `Match type`',
    () => {
      const inputArray = [{ 'some key other than Match content ot Match type': 'some value' }]

      expect(() => {
        depsExtractor.extractDependenciesToReferenceFormat({
          sourcesJsonArray: inputArray,
          versionOfDetect: '6.*'
        })
      }).toThrow()
    })

  it('returns an empty array of elements if the input array is empty',
    () => {
      const inputArray = []
      const expectedOutput = []
      const actualOutput6 = depsExtractor.extractDependenciesToReferenceFormat({
        sourcesJsonArray: inputArray,
        versionOfDetect: '6.*'
      })
      expect(actualOutput6)
        .toEqual(expectedOutput)
    })
  it('returns empty array when misconfiguring calling parameters, i.e. the json array input with the wrong detect version',
    () => {
      const inputArray = validSourceDetect561With1Direct2Transitive1ExactDependencies
      const inputDetectVersion = '5.*'
      const expectedOutput = [
      ]
      const actualOutput = depsExtractor.extractDependenciesToReferenceFormat({
        sourcesJsonArray: inputArray,
        versionOfDetect: inputDetectVersion
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('returns an array of elements (formatted as in the reference format) for which the value of key `Match type` in the input array is `Transient Dependency` or `Direct Dependency`',
    () => {
      const inputArray = validSourceDetect561With1Direct2Transitive1ExactDependencies
      const inputDetectVersion = '6.*'
      const expectedOutput = [
        {
          'name': '@ngtools/webpack',
          'version': '1.9.8'
        },
        {
          'name': '@types/minimatch',
          'version': '3.0.1'
        },
        {
          'name': 'react-app-polyfill',
          'version': '1.0.1'
        }
      ]
      const actualOutput = depsExtractor.extractDependenciesToReferenceFormat({
        sourcesJsonArray: inputArray,
        versionOfDetect: inputDetectVersion
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('returns an empty array if the input array has no element for which the value of key `Match type` is `Transient Dependency` or `Direct Dependency`',
    () => {
      const inputArray = validSourceDetect561With1ExactDependencies
      const inputDetectVersion = '6.*'
      const expectedOutput = []
      const actualOutput = depsExtractor.extractDependenciesToReferenceFormat({
        sourcesJsonArray: inputArray,
        versionOfDetect: inputDetectVersion
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })

  it('throws exception when input array contains a malformed `Match content` value, by missing the / character (expected format: name/version)',
    () => {
      const inputArray = [{ 'Match content': 'malformed-because-no-slash-1.1.0', 'Match type': 'Direct Dependency' }]

      expect(() => {
        depsExtractor.extractDependenciesToReferenceFormat({
          sourcesJsonArray: inputArray,
          versionOfDetect: '6.*'
        })
      }).toThrow()
    })

  it('throws exception when input array contains a malformed `Match content` value, by missing the version after the last / character (expected format: name/version)',
    () => {
      const inputArray = [{ 'Match content': 'malformed-because-slash-at-the-end/', 'Match type': 'Direct Dependency' }]

      expect(() => {
        depsExtractor.extractDependenciesToReferenceFormat({
          sourcesJsonArray: inputArray,
          versionOfDetect: '6.*'
        })
      }).toThrow()
    })

  it('throws exception when input array contains a malformed `Match content` value, by missing the name before the last / character (expected format: name/version)',
    () => {
      const inputArray = [{ 'Match content': '/malformed-because-slash-first', 'Match type': 'Direct Dependency' }]

      expect(() => {
        depsExtractor.extractDependenciesToReferenceFormat({
          sourcesJsonArray: inputArray,
          versionOfDetect: '6.*'
        })
      }).toThrow()
    })
  it('returns the array of dependencies in reference format with the name and version properly extracted, if the contents of the separator occurs multiple times in the Match Content',
    () => {
      const inputArray = [{ 'Match type': 'Transitive Dependency', 'Match content': 'the-slash/occurs-more-times/1.0.0' }]
      const inputDetectVersion = '6.*'
      const expectedOutput = [{
        name: 'the-slash/occurs-more-times',
        version: '1.0.0'
      }]
      const actualOutput = depsExtractor.extractDependenciesToReferenceFormat({
        sourcesJsonArray: inputArray,
        versionOfDetect: inputDetectVersion
      })
      expect(actualOutput)
        .toEqual(expectedOutput)
    })
})
