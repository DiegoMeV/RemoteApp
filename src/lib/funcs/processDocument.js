const processDocument = async ({ buffer }) => {
  try {
    if (!buffer || buffer.bodyUsed) {
      console.error('El documento no es una imagen PNG')
      return
    }

    const clonedBuffer = buffer.clone()
    const data = await clonedBuffer.arrayBuffer()
    const contentType = buffer.headers.get('Content-Type')

    if (!contentType || !contentType.includes('image/png')) {
      console.error('El documento no es una imagen PNG')
      return
    }

    // Crear URL Blob
    const urlBlob = URL.createObjectURL(new Blob([data], { type: contentType }))
    return urlBlob
  } catch (error) {
    console.error('Error al procesar el documento:', error)
  }
}

export default processDocument
