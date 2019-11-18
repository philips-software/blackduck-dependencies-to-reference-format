const utilities = require('../utilities/utilities')
const chalk = require('chalk')

const {
  infoMessage,
  warningMessage
} = require('../logger/logger')

const {
  DETECT_COMPONENTS_ORIGINIDS_KEY,
  DETECT_COMPONENTS_LICENSENAMES_KEY
} = require('../constants/components-keys-values')

const logUniqueLicenseNames = ({ jsonArray }) => {
  const uniqueValuesOfLicenseNames = Array.from(new Set(jsonArray.map(el => el[DETECT_COMPONENTS_LICENSENAMES_KEY])))
  infoMessage(chalk`Reading license values from the components: there are {blue ${uniqueValuesOfLicenseNames.length}} unique values for key {blue 'License names'}: {cyan ${uniqueValuesOfLicenseNames}}`)
}

const getLicensesForDependency = ({ componentsJsonArray, dependencyNameVersion }) => {
  const componentAggregatingDependency = componentsJsonArray.find(componentElem => {
    const originIdsAsString = componentElem[DETECT_COMPONENTS_ORIGINIDS_KEY]
    const originIdsArray = originIdsAsString.split(', ')
    return originIdsArray.includes(dependencyNameVersion)
  })
  const licensesAsArray = componentAggregatingDependency[DETECT_COMPONENTS_LICENSENAMES_KEY].split(', ')
  return licensesAsArray
}

const extractLicensesToExtendedReferenceFormat = ({ componentsJsonArray, sbomJsonArray, nameVersionSeparator }) => {
  if (componentsJsonArray.length === 0) {
    warningMessage(chalk`{yellow Input array is empty}; returning empty array.`)
    return []
  }

  logUniqueLicenseNames({ jsonArray: componentsJsonArray })

  const separator = nameVersionSeparator

  const mandatoryKeys = [DETECT_COMPONENTS_LICENSENAMES_KEY, DETECT_COMPONENTS_ORIGINIDS_KEY]
  if (!utilities.everyElementHasAllKeys({ jsonArray: componentsJsonArray, keys: mandatoryKeys })) {
    throw chalk`There are objects missing the mandatory keys ${mandatoryKeys}; throwing exception`
  }

  // For each dependency in the sbom array, find the license info
  const dependenciesWithLicenseInfo = sbomJsonArray.map(dependency => {
    const dependencyNameVersion = `${dependency.name}${separator}${dependency.version}`
    const licenses = getLicensesForDependency({ componentsJsonArray, dependencyNameVersion })
    const dependencyWithLicenseInfo = ({ ...dependency, licenses })
    return dependencyWithLicenseInfo
  })

  return dependenciesWithLicenseInfo
}

module.exports = {
  extractLicensesToExtendedReferenceFormat
}
