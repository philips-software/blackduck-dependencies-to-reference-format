const hasFileExtension = ({ fileName, extension }) => {
  const actualExtension = fileName.split('.').pop()
  if (actualExtension && actualExtension.toLowerCase() === extension.toLowerCase()) {
    return true
  }
  return false
}

module.exports = {
  hasFileExtension
}
