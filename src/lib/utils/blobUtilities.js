/**
 * Generates a URL for a given Blob object.
 *
 * @param {BlobPart} data - The data to be placed inside the Blob.
 * @param {string} contentType - MIME type of the data.
 * @return {string} The URL created from the Blob.
 */
export const createBlobURL = (data, contentType) => {
  const blob = new Blob([data], { type: contentType })
  const url = window.URL.createObjectURL(blob)
  return url
}

/**
 * Extracts the file name from the Content-Disposition header of a response.
 *
 * @param {Headers} headers - The headers object from a response.
 * @return {string|null} The extracted file name, or null if not found.
 */
export const extractFileName = (headers) => {
  const disposition = headers?.get('Content-Disposition')
  if (!disposition) {
    return null // Content-Disposition header is missing.
  }

  const matches = disposition.match(/filename="?(.+?)"?$/)
  if (matches && matches.length > 1) {
    return matches[1].replace(/["']/g, '') // Remove potential quotes around the file name.
  }

  return null // No file name found in the Content-Disposition header.
}
