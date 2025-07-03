import { useGetBufferDocument, useGetDocument } from '@/lib/api'
import { ModalViewerDocs, useQueryBuilder } from '.'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { downloadBuffer } from '@/lib/utils'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { baseUrls } from '@/lib/constants'
import { BackdropLoading } from '../loading'

const ModalViewerDocsGlobal = () => {
  const {
    open,
    idDocument,
    idVersion,
    idProcess,
    companyId,
    nameFile,
    idActivityActionItem,
    url,
    loadingPreviewer,
    advice,
  } = useStoreState((state) => state.previewer.previewer)

  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const base = baseUrls.urlUsers
  const isInCgr = base.includes('apicgr')
  const [buffer, setBuffer] = useState()
  const handleClose = useStoreActions((actions) => actions.previewer.clearPreviewer)
  const qry = useQueryBuilder(idVersion, isInCgr)
  const { mutateAsync: getBuffer, isLoading: loadingBuffer } = useGetBufferDocument({
    companyId,
    onSuccess: (response) => {
      setPreviewer({ loadingPreviewer: false })
      const contentType = response.headers.get('Content-Type')
      if (contentType?.includes('pdf')) {
        setBuffer(response)
        return
      } else {
        downloadBuffer(response, nameFile)
        handleClose()
      }
    },
    onError: (e) => {
      handleClose()
      setBuffer(null)
      toast.error(e?.data?.error ?? 'Error al obtener el documento')
      setPreviewer({ loadingPreviewer: false })
    },
  })

  useEffect(() => {
    if (idDocument) {
      if (typeof idDocument === 'string' && idDocument !== null) {
        getBuffer({ qry: `${idDocument}/documentos${qry}`, method: 'GET' })
      } else {
        getBuffer({
          body: {
            tipo: 'pdf',
            idDocumento: idDocument,
            id_proceso: idProcess,
          },
          qry: `descargar`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
    }
    if (advice) {
      toast.success(advice)
    }
  }, [getBuffer, idDocument, idVersion, idProcess, qry, advice])

  const {
    data: infoDocument,
    isLoading: loadingInfoDoc,
    isError,
  } = useGetDocument({ qry: `/${idDocument}`, enabled: !!idDocument && !Array.isArray(idDocument) })

  const isNotRegenerable =
    (!infoDocument?.data?.[0]?.especificaciones?.idPlantilla &&
      !infoDocument?.data?.[0]?.especificaciones?.isOracleRegistry) ||
    isError
      ? true
      : false

  const loading = loadingBuffer || loadingInfoDoc

  return (
    <>
      <BackdropLoading loading={loadingPreviewer} />
      {open && (buffer || url) && (
        <ModalViewerDocs
          idDocument={idDocument}
          idActivityActionItem={idActivityActionItem}
          nameFile={nameFile}
          isNotRegenerable={isNotRegenerable}
          buffer={buffer}
          open={open}
          url={url}
          handleClose={() => {
            handleClose()
            setBuffer(null)
          }}
          loading={loading}
        />
      )}
    </>
  )
}

export default ModalViewerDocsGlobal
