const {
  REFERENCE_OUTPUT_NAME_KEY,
  REFERENCE_OUTPUT_VERSION_KEY
} = require('../constants/reference-output-keys')

const everyElementHasAllKeys = ({ jsonArray, keys }) => {
  const objectsMissingMandatoryKeys = jsonArray
    .filter(jsonObj => {
      let elementHasAllKeys = true
      keys.forEach(key => {
        if (!jsonObj.hasOwnProperty(key)) {
          elementHasAllKeys = false
        }
      })
      return !elementHasAllKeys
    })
  return objectsMissingMandatoryKeys.length === 0
}

const filterForKeyValues = ({ jsonArray, key, keyValuesToMatchTo }) => {
  return jsonArray.filter(element =>
    !!keyValuesToMatchTo.includes(element[key])
  )
}

const componentNameAndVersionCaseInsensitiveComparator = (a, b) => {
  const nameA = a[REFERENCE_OUTPUT_NAME_KEY].toUpperCase()
  const nameB = b[REFERENCE_OUTPUT_NAME_KEY].toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  const versionA = a[REFERENCE_OUTPUT_VERSION_KEY].toUpperCase()
  const versionB = b[REFERENCE_OUTPUT_VERSION_KEY].toUpperCase()
  if (versionA < versionB) {
    return -1
  }
  if (versionA > versionB) {
    return 1
  }
  return 0
}

const sortByNameAndVersionCaseInsensitive = array => array
  .sort(componentNameAndVersionCaseInsensitiveComparator)

const getUniquesByKeyValues = ({ jsonArray, keys }) => {
  if (keys && keys.length === 0) {
    return []
  }
  const uniqueElements = []
  const map = new Map()
  jsonArray.forEach((element) => {
    let elementHash = ''
    keys.forEach(key => {
      if (!Object.keys(element).includes(key)) {
        throw new Error(`Object ${element} does not include key ${key}`)
      }
      elementHash = `${elementHash}${element[key]}`
    })
    if (!map.has(elementHash)) {
      map.set(elementHash, true)
      uniqueElements.push(element)
    }
  })
  return uniqueElements
}

module.exports = {
  sortByNameAndVersionCaseInsensitive,
  everyElementHasAllKeys,
  filterForKeyValues,
  getUniquesByKeyValues
}
