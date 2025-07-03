export const downloadFile = (data, fileName, type) => {
  const blob = new Blob([data], { type: type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url

  link.setAttribute('download', fileName)

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
}
