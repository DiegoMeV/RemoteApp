import { useEffect, useState } from 'react'
import { CustomModal } from '.'
import { extractFileName } from '@/lib/utils'
import { Box, Button } from '@mui/material'
import { useGetBufferDocument, useGetRegenerateDocument } from '@/lib/api'
import { BackdropLoading } from '../loading'
import toast from 'react-hot-toast'
import { AccessControl } from '@/libV4'

const ModalViewerDocs = ({
  isNotRegenerable,
  idDocument,
  buffer,
  url,
  nameFile,
  idActivityActionItem,
  ...otherProps
}) => {
  const [newUrl, setNewUrl] = useState('')
  const [newBuffer, setNewBuffer] = useState(null)
  const [loading, setLoading] = useState(true)
  const { mutateAsync: getBuffer, isPending: loadingDownload } = useGetBufferDocument({
    onSuccess: (response) => {
      setNewBuffer(response)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al obtener el documento')
    },
  })
  const { mutateAsync: reCharge, isPending: loadingRecharge } = useGetRegenerateDocument({
    idDocument,
    onSuccess: async (response) => {
      await getBuffer({ qry: `${response?.data?.[0]?.id}/documentos` })
      toast.success('Documento regenerado con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  let finalBuffer = newBuffer ?? buffer
  const fileName = nameFile || extractFileName(finalBuffer?.headers) || ''

  useEffect(() => {
    let active = true
    let urlBlob
    ;(async () => {
      try {
        const clonedBuffer = await finalBuffer?.clone()
        const data = await clonedBuffer?.arrayBuffer()
        const contentType = await finalBuffer?.headers?.get('Content-Type')

        urlBlob = URL.createObjectURL(new Blob([data], { type: contentType }))
        if (active) {
          setNewUrl(urlBlob)
        }

        setTimeout(() => {
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error al procesar el documento:', error)
        toast.error(`Error al procesar el documento: ${error.message}`)
        setLoading(false)
      }
    })()

    return () => {
      active = false
      if (urlBlob) {
        window.URL.revokeObjectURL(urlBlob)
      }
    }
  }, [finalBuffer])

  return (
    <CustomModal
      size='lg'
      title={fileName}
      height='calc(100vh - 135px)'
      {...otherProps}
    >
      <BackdropLoading loading={loadingRecharge || loadingDownload || loading} />
      <AccessControl privilege='documentos.documentos.regenerar_documento'>
        {!isNotRegenerable && (
          <Box
            item
            container
            xs={4}
            p={2}
            sx={{ gap: 2 }}
            display='flex'
            justifyContent='flex-end'
          >
            <Button
              color='primary'
              variant='contained'
              onClick={() =>
                reCharge({ qry: idActivityActionItem ? `?idItem=${idActivityActionItem}` : '' })
              }
            >
              Regenerar
            </Button>
            {(newUrl || url) && (
              <Button
                color='success'
                variant='contained'
                href={url || newUrl}
                download={fileName || 'documento.pdf'}
                target='_blank'
              >
                Descargar PDF
              </Button>
            )}
          </Box>
        )}
      </AccessControl>
      {(newUrl || url) && (
        <embed
          src={url || newUrl}
          type='application/pdf'
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </CustomModal>
  )
}

export default ModalViewerDocs
