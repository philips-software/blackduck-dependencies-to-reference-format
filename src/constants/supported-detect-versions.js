const SUPPORTED_DETECT_VERSIONS = ['5.*', '6.*']

const isSupportedVersionOfDetect = ({ versionOfDetect }) => {
  return SUPPORTED_DETECT_VERSIONS.includes(versionOfDetect)
}

module.exports = {
  SUPPORTED_DETECT_VERSIONS,
  isSupportedVersionOfDetect
}
