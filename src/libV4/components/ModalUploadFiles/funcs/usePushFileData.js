import { baseUrls, useMutationDynamicBaseUrl } from '@/lib'
import { useEffect, useState } from 'react'

export const usePushFileData = (
  setActiveStep,
  setErrors,
  errors,
  setLoadingProgress,
  bodyTo,
  pushUrl,
  pushBase
) => {
  const [requestCount, setRequestCount] = useState(0)

  let chunkSize = parseInt(baseUrls?.chunk_size)

  const { mutateAsync: pushRows } = useMutationDynamicBaseUrl({
    url: pushBase,
    baseKey: 'urlFiscalizacion',
    isCompanyRequest: true,
    onError: (e) => {
      let adjustedWrongRows = []
      if (e.response?.data?.error) {
        adjustedWrongRows = [
          {
            id: crypto.randomUUID(),
            message: `al procesar el archivo, vuelva a cargarlo.`,
          },
        ]
      } else {
        adjustedWrongRows = [
          {
            id: crypto.randomUUID(),
            message: `al procesar el archivo: ${e.message}`,
          },
        ]
      }
      setRequestCount(requestCount + 1)
      setErrors([...(errors || []), ...(adjustedWrongRows || [])])
    },
    onSuccess: () => {
      setRequestCount(requestCount + 1)
    },
  })

  const massiveInsert = async (finalRows) => {
    if (isNaN(chunkSize)) {
      chunkSize = 50
    }
    const rowsToPush = finalRows
    try {
      for (let i = 0; i < rowsToPush.length; i += chunkSize) {
        const chunk = rowsToPush.slice(i, i + chunkSize)
        try {
          if (errors.length > 0) {
            setActiveStep(4)
            setLoadingProgress(100)
            return
          }
          await pushRows({ body: { [bodyTo]: chunk }, qry: pushUrl })
          const progress = Math.round(((i + chunkSize) / rowsToPush.length) * 100)
          setLoadingProgress(progress)
        } catch (error) {
          console.error('Error al enviar el chunk', error)
          const adjustedWrongRows = [
            {
              id: crypto.randomUUID(),
              message: `al procesar el archivo: ${error.message}`,
            },
          ]
          setActiveStep(4)
          setLoadingProgress(100)
          setErrors([...(errors || []), ...(adjustedWrongRows || [])])
          return
        }
      }
    } finally {
      setActiveStep(4)
      setRequestCount(0)
      setLoadingProgress(100)
    }
  }
  useEffect(() => {
    setLoadingProgress(0)
  }, [setLoadingProgress])
  return { massiveInsert }
}
