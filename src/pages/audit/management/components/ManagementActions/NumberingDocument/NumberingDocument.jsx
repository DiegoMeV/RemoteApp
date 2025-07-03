import { downloadBuffer, useGetBufferDocument } from '@/lib'
import { DocumentContainer } from '..'
import { Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'
import ButtonsReview from './ButtonsNumberingDocument'
import ElementNumberingDocument from './ElementNumberingDocument'

const NumberingDocument = ({
  action,
  ids,
  refetchManagement,
  elementData,
  idActivityAction,
  refetchElementActions,
}) => {
  const idProcess = ids?.[0]
  const [selectedDocuments, setSelecteDocuments] = useState([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const allDocumentsIds = action?.actionSpecs?.askFor?.map(
    (elementAction) => elementAction?.idDocument
  )

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelecteDocuments([])
    } else {
      setSelecteDocuments(allDocumentsIds)
    }
    setIsAllSelected(!isAllSelected)
  }

  const { mutateAsync: getBuffer } = useGetBufferDocument({
    onSuccess: () => {
      toast.success('Descarga exitosa')
    },
    onError: (error) => {
      toast.error('Error ', error)
    },
  })

  const handleDownloadZip = async () => {
    if (!selectedDocuments.length) {
      toast.error('Seleccione al menos un documento primero')
      return
    }
    try {
      const response = await getBuffer({
        body: {
          tipo: 'zip',
          idDocumento: selectedDocuments,
          id_proceso: idProcess,
        },
        qry: `descargar`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      downloadBuffer(response)
    } catch (error) {
      toast.error(error)
    }
  }

  const handleDownloadPdf = async () => {
    if (!selectedDocuments.length) {
      toast.error('Seleccione al menos un documento primero')
      return
    }
    await setPreviewer({
      open: true,
      idDocument: selectedDocuments,
      idProcess: idProcess,
      loadingPreviewer: true,
      advice: selectedDocuments?.length > 1 ? 'Por favor revisar el documento' : null,
    })
  }

  const buttonsProps = {
    selectedDocuments,
    allDocumentsIds,
    handleSelectAll,
    handleDownloadPdf,
    handleDownloadZip,
  }

  return (
    <>
      {elementData?.length > 0 ? (
        <>
          <ButtonsReview {...buttonsProps} />
          <DocumentContainer>
            {elementData?.map((elementAction, index) => {
              return (
                <ElementNumberingDocument
                  key={index}
                  elementAction={elementAction}
                  idTaskAction={elementAction?.idTaskAction ?? ''}
                  idActivityAction={idActivityAction}
                  ids={ids}
                  refetchManagement={refetchManagement}
                  selectedDocuments={selectedDocuments}
                  setSelecteDocuments={setSelecteDocuments}
                  refetchElementActions={refetchElementActions}
                />
              )
            })}
          </DocumentContainer>
        </>
      ) : (
        <Typography variant='body1'>
          Revisar parametrización, esta acción no contiene elementos.
        </Typography>
      )}
    </>
  )
}

export default NumberingDocument
