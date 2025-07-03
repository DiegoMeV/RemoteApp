import { AdditionalDocuments, DocumentUploadButton, FormGenericHeader, NavigationBtnSteps } from '.'
import { Box } from '@mui/material'
import { FormGenericContainerStyles, FormGenericGridStyles } from '../../styles'
import { BackdropLoading, CustomAccordion, useGetDocument, useQueryDynamicApi } from '@/lib'
import { useCallback, useEffect, useState } from 'react'
import DocProcess from './DocProcess'
import { useStoreState } from 'easy-peasy'

const DocumentsSupport = ({ stepVars, idProcessParent, idParentActivity, processCreated }) => {
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = userData?.companies[0]?.companyId
  const { step: currentStep, setActiveStep: setStep } = stepVars
  const idProcess = processCreated?.id

  const { data: infoProcessCreated, isLoading: loadingProcess } = useQueryDynamicApi({
    url: `/processes/${idProcess}?inclPendingActs=true`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
  })
  const idActivityCreated = infoProcessCreated?.data[0]?.pendingActivities[0]?.id ?? null
  const ids = [idProcess, idActivityCreated]
  const {
    data: sourceProcessDocuments,
    isFetching,
    isError,
    refetch: refetchSourceProcess,
  } = useGetDocument({
    qry: `/${idProcessParent}/proceso`,
  })

  const {
    data: documentsByActivity,
    isFetching: loadingDocumentsById,
    isError: errorDocumentsById,
    refetch: refecthDocumentsByActivity,
  } = useGetDocument({
    qry: `/${idActivityCreated}/activity?adicional=tru&filterAnulados=true`,
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
    <Box
      overflowY='auto'
      overflowX='hidden'
    >
      <FormGenericHeader title='Documentos de soporte' />
      <Box
        component='form'
        sx={FormGenericContainerStyles}
      >
        <Box
          sx={FormGenericGridStyles}
          minWidth='100%'
          p={2}
        >
          <CustomAccordion title={'Documentos proceso origen'}>
            {isError ? (
              <Box textAlign='center'>
                {'Ha ocurrido un error, no se pudo traer sus documentos'}
              </Box>
            ) : (
              <>
                <BackdropLoading loading={isFetching || loadingProcess} />
                {sourceProcessDocuments?.data.map((document, index) => (
                  <Box key={index}>
                    <DocProcess
                      index={index}
                      document={document}
                      refetchSourceProcess={refetchSourceProcess}
                      refecthDocumentsByActivity={refecthDocumentsByActivity}
                      ids={ids}
                      idCompany={idCompany}
                      documentsByActivity={documentsByActivity?.data}
                    />
                  </Box>
                ))}
              </>
            )}
          </CustomAccordion>
          <CustomAccordion title={'Documentos  adicionales'}>
            {errorDocumentsById ? (
              <Box textAlign='center'>
                {'Ha ocurrido un error, no se pudo traer sus documentos adicionales'}
              </Box>
            ) : (
              <>
                <BackdropLoading loading={loadingDocumentsById} />
                <DocumentUploadButton handleNewRow={handleNewRow} />
                {documents.map((document, index) => (
                  <Box key={document?.id}>
                    <AdditionalDocuments
                      document={document}
                      ids={ids}
                      index={index}
                      refecthDocumentsByActivity={refecthDocumentsByActivity}
                      refetchSourceProcess={refetchSourceProcess}
                      handleDelete={() => handleDelete(document?.id)}
                    />
                  </Box>
                ))}
              </>
            )}
          </CustomAccordion>
        </Box>
        <NavigationBtnSteps
          currentStep={currentStep}
          setStep={setStep}
          idProcessParent={idProcessParent}
          idParentActivity={idParentActivity}
        />
      </Box>
    </Box>
  )
}

export default DocumentsSupport
