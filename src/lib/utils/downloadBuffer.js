import { createBlobURL, extractFileName } from './blobUtilities'

export const downloadBuffer = async (response, nameFile) => {
  // Extracts the file name using the imported function
  const fileName = nameFile || extractFileName(response?.headers) || ''

  const contentType = response?.headers?.get('Content-Type')
  const data = await response?.arrayBuffer()

  // Creates the blob URL using the imported function
  const url = createBlobURL(data, contentType)

  // Create download link
  const link = document?.createElement('a')
  link.href = url
  link.download = fileName // Uses the extracted filename or a default value
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
