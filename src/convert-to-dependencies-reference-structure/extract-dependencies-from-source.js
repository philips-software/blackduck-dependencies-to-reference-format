const utilities = require('../utilities/utilities')
const chalk = require('chalk')

const {
  infoMessage,
  warningMessage,
  errorMessage
} = require('../logger/logger')

const {
  REFERENCE_OUTPUT_NAME_KEY,
  REFERENCE_OUTPUT_VERSION_KEY
} = require('../constants/reference-output-keys')

const {
  DETECT_SOURCES_MATCHCONTENT_KEY,
  DETECT_SOURCES_MATCHTYPE_KEY,
  DETECT_SOURCES_MATCH_TYPE_VALUE_FILE_DEPENDENCY,
  DETECT_SOURCES_MATCHTYPE_VALUE_DIRECTDEPENDENCY,
  DETECT_SOURCES_MATCHTYPE_VALUE_TRANSIENTDEPENDENCY,
  DETECT_SOURCES_MATCH_TYPE_VALUE_EXACT
} = require('../constants/source-keys-values')

const {
  SUPPORTED_DETECT_VERSIONS,
  isSupportedVersionOfDetect
} = require('../constants/supported-detect-versions')

const getDetectDifferentiatorsForVersion = ({ versionOfDetect }) => {
  switch (versionOfDetect) {
    case '5.2.0': return ({
      mandatoryKeys: [DETECT_SOURCES_MATCHCONTENT_KEY, DETECT_SOURCES_MATCHTYPE_KEY],
      keyAndValuesToFilterFor: {
        key: DETECT_SOURCES_MATCHTYPE_KEY,
        values: [DETECT_SOURCES_MATCH_TYPE_VALUE_FILE_DEPENDENCY]
      },
      nameVersionSeparator: '@'
    })

    case '5.6.1': return ({
      mandatoryKeys: [DETECT_SOURCES_MATCHCONTENT_KEY, DETECT_SOURCES_MATCHTYPE_KEY],
      keyAndValuesToFilterFor: {
        key: DETECT_SOURCES_MATCHTYPE_KEY,
        values: [DETECT_SOURCES_MATCHTYPE_VALUE_DIRECTDEPENDENCY, DETECT_SOURCES_MATCHTYPE_VALUE_TRANSIENTDEPENDENCY]
      },
      nameVersionSeparator: '/'
    })
    default :
      errorMessage(`could not find differentiators for ${versionOfDetect}`)
  }
}

const getUniqueValuesOfMatchType = ({ jsonArray }) => {
  return Array.from(new Set(jsonArray.map(el => el[DETECT_SOURCES_MATCHTYPE_KEY])))
}

const logNumberOfDependenciesPerMatchType = ({ jsonArray }) => {
  const uniqueValuesOfMatchType = getUniqueValuesOfMatchType({ jsonArray })
  infoMessage(chalk`There are {blue ${uniqueValuesOfMatchType.length}} unique values for key {blue 'Match type'}: {cyan ${uniqueValuesOfMatchType}}`)

  uniqueValuesOfMatchType.forEach(
    (matchType) => {
      const filteredElemsMatchingType = utilities.filterForKeyValues({ jsonArray, key: DETECT_SOURCES_MATCHTYPE_KEY, keyValuesToMatchTo: [matchType] })
      infoMessage(chalk` - Number of elements with 'Match type'={cyan ${matchType}}: ${filteredElemsMatchingType.length}`)
    }
  )
  infoMessage(chalk`\n`)
}

const throwIfInvalidMatchContentStructure = ({ matchContentString, separator }) => {
  let foundMalformedMatchContent = false
  const lastIndexOfSeparator = matchContentString.lastIndexOf(separator)
  if (lastIndexOfSeparator < 0) {
    errorMessage(chalk`{red Expected ${separator}} to separate name from version in value for key ${DETECT_SOURCES_MATCHCONTENT_KEY}: ${matchContentString}`)
    foundMalformedMatchContent = true
  } else {
    if (lastIndexOfSeparator === 0 || lastIndexOfSeparator === matchContentString.length - 1) {
      errorMessage(chalk`Expected that last occurence of ${separator} is prefixed and suffixed by a string in: ${matchContentString}`)
      foundMalformedMatchContent = true
    }
  }
  if (foundMalformedMatchContent) {
    throw chalk`Value {red ${matchContentString}} of key ${DETECT_SOURCES_MATCHCONTENT_KEY} should be formatted as 'name${separator}version'`
  }
}

const extractNameAndVersionFrom = ({ jsonObject, separator }) => {
  const nameSeparatorVersion = jsonObject[DETECT_SOURCES_MATCHCONTENT_KEY]
  throwIfInvalidMatchContentStructure({ matchContentString: nameSeparatorVersion, separator })

  const lastIndexOfSeparator = nameSeparatorVersion.lastIndexOf(separator)
  const name = jsonObject[DETECT_SOURCES_MATCHCONTENT_KEY].slice(0, lastIndexOfSeparator)
  const version = jsonObject[DETECT_SOURCES_MATCHCONTENT_KEY].slice(lastIndexOfSeparator + 1, jsonObject[DETECT_SOURCES_MATCHCONTENT_KEY].length)

  return ({
    [REFERENCE_OUTPUT_NAME_KEY]: name,
    [REFERENCE_OUTPUT_VERSION_KEY]: version
  })
}

const extractDependenciesToReferenceFormat = ({ sourcesJsonArray, versionOfDetect }) => {
  if (sourcesJsonArray.length === 0) {
    warningMessage(chalk`{yellow Input array is empty}; returning empty array.`)
    return []
  }
  logNumberOfDependenciesPerMatchType({ jsonArray: sourcesJsonArray })

  if (!isSupportedVersionOfDetect({ versionOfDetect })) {
    throw chalk`Unsupported version of the detect tool: {red ${versionOfDetect}}. Supported versions: {blue ${SUPPORTED_DETECT_VERSIONS}}`
  }

  const sourceParamsSpecificPerDetectVersion = getDetectDifferentiatorsForVersion({ versionOfDetect })
  const mandatoryKeys = sourceParamsSpecificPerDetectVersion.mandatoryKeys
  const keyAndValuesToFilterFor = sourceParamsSpecificPerDetectVersion.keyAndValuesToFilterFor
  const separator = sourceParamsSpecificPerDetectVersion.nameVersionSeparator

  infoMessage(chalk`Will filter dependencies from the input file based on these parameters specific to detect version {blue ${versionOfDetect}}:\n\tmandatoryKeys: {yellow ${mandatoryKeys}}\n\tkeyAndValuesToFilterFor:{yellow ${JSON.stringify(keyAndValuesToFilterFor)}}\n\tnameVersionSeparator:{yellow ${separator}}`)

  if (!utilities.everyElementHasAllKeys({ jsonArray: sourcesJsonArray, keys: mandatoryKeys })) {
    throw chalk`There are objects missing the mandatory keys ${mandatoryKeys}; throwing exception`
  }

  const filteredDependencies = utilities.filterForKeyValues({
    jsonArray: sourcesJsonArray,
    key: keyAndValuesToFilterFor.key,
    keyValuesToMatchTo: keyAndValuesToFilterFor.values
  })

  const filteredDependenciesInReferenceFormat = filteredDependencies.map(element =>
    extractNameAndVersionFrom({ jsonObject: element, separator })
  )
  return utilities.sortByNameAndVersionCaseInsensitive(filteredDependenciesInReferenceFormat)
}

const filterExactMatchesInOriginalFormat = ({ sourcesJsonArray }) => {
  return utilities.filterForKeyValues({
    jsonArray: sourcesJsonArray,
    key: DETECT_SOURCES_MATCHTYPE_KEY,
    keyValuesToMatchTo: [DETECT_SOURCES_MATCH_TYPE_VALUE_EXACT]
  })
}

module.exports = {
  extractDependenciesToReferenceFormat,
  filterExactMatchesInOriginalFormat
}
