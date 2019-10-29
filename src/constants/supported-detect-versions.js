const SUPPORTED_DETECT_VERSIONS = ['5.2.0', '5.6.1']

const isSupportedVersionOfDetect = ({ versionOfDetect }) => {
  return SUPPORTED_DETECT_VERSIONS.includes(versionOfDetect)
}

module.exports = {
  SUPPORTED_DETECT_VERSIONS,
  isSupportedVersionOfDetect
}
