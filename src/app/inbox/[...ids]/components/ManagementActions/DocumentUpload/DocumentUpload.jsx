import { Add, FileUploadOutlined } from '@mui/icons-material'
import ElementUpload from './ElementUpload'
import { DocumentContainer } from '../'
import { CustomAccordion, Loading, useGetDocument } from '@/lib'
import { Box, Divider, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { AdditionalDocuments } from './components'

const DocumentUpload = ({
  action,
  ids,
  refetchElementActions,
  elementData,
  fechingElementActions,
  idActivityAction,
  accordionState,
  onChangeAccordion,
}) => {
  const idActivity = ids?.[1]

  const {
    data: documentsByActivity,
    isFetching: loadingDocumentsById,
    isError: errorDocumentsById,
    refetch: refecthDocumentsByActivity,
  } = useGetDocument({
    qry: `/${idActivity}/activity?adicional=true&filterAnulados=true`,
  })

  const [documents, setDocuments] = useState([])

  const handleNewRow = () => {
    setDocuments([{ id: crypto.randomUUID(), isNew: true }, ...documents])
  }

  useEffect(() => {
    if (documentsByActivity?.data) {
      setDocuments(documentsByActivity.data)
    }
  }, [documentsByActivity])

  const handleDelete = useCallback((idToDelete) => {
    setDocuments((documents) => documents.filter((document) => document.id !== idToDelete))
  }, [])

  return (
    <>
      <CustomAccordion
        title={action?.name ?? 'Acción sin nombre'}
        icon={<FileUploadOutlined color='primary' />}
        badge={elementData?.length ?? ''}
        expandedValue={accordionState}
        onClickAccordion={onChangeAccordion}
      >
        <DocumentContainer>
          {fechingElementActions ? (
            <Loading />
          ) : elementData.length > 0 ? (
            elementData?.map((elementAction, index) => {
              return (
                <Box key={index}>
                  <ElementUpload
                    index={index}
                    elementAction={elementAction}
                    idActivityAction={idActivityAction}
                    ids={ids}
                    refetchElementActions={refetchElementActions}
                    refecthDocumentsByActivity={refecthDocumentsByActivity}
                    idAction={action?.id}
                  />
                  <Divider />
                </Box>
              )
            })
          ) : (
            <Typography variant='body1'>
              Revisar parametrización, esta acción no contiene elementos.
            </Typography>
          )}
        </DocumentContainer>
      </CustomAccordion>
      <CustomAccordion
        title={'Documentos adicionales'}
        icon={<Add color='primary' />}
        badge={documentsByActivity?.data?.length ?? ''}
      >
        {loadingDocumentsById ? (
          <Loading />
        ) : (
          <AdditionalDocuments
            errorDocumentsById={errorDocumentsById}
            documents={documents}
            ids={ids}
            refecthDocumentsByActivity={refecthDocumentsByActivity}
            handleNewRow={handleNewRow}
            handleDelete={handleDelete}
          />
        )}
      </CustomAccordion>
    </>
  )
}
export default DocumentUpload
