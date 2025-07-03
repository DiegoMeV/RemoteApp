import {
  BackdropLoading,
  CustomModal,
  ErrorPage,
  SearchTable,
  SquareIconButton,
  useBoolean,
} from '@/lib'
import { getActionsActivityParams, onSubmitTemplates } from '../funcs'
import { useFunctionsTemplates, useHandleCancelModal } from '../hooks'
import { TemplateItem, TemplatesPagination } from '../components'
import { TemplateUpload } from '../components/templateUpload'
import { useQueryClient } from '@tanstack/react-query'
import { UploadFile } from '@mui/icons-material'
import { TitleAdmin } from '../../components'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AccessControl, LoadingSkeleton, toArray } from '@/libV4'
import { useTheme } from '@emotion/react'
import '../styles/styles.css'

const ViewTemplates = ({
  templatesInfo,
  isLoadingTemplates,
  isErrorTemplates,
  searchTemplate,
  setCursorApi,
  totalCount,
}) => {
  const form = useForm()
  const theme = useTheme()
  const queryClient = useQueryClient()
  const modalUploadTemplate = useBoolean()
  const [pageCount, setPageCount] = useState(1)
  const [isDownload, setIsDownload] = useState(false)
  const [versionInfo, setVersionInfo] = useState(null)
  const [bufferDocument, setBufferDocument] = useState(null)

  useEffect(() => {
    if (versionInfo) {
      const defaultSigners = versionInfo?.info?.especificaciones?.firmantesPorDefecto?.map(
        (firmante) => firmante.cargoData
      )
      form.setValue('firmantesPorDefecto', defaultSigners)

      const variablesOrdened = versionInfo?.info?.especificaciones?.variables?.sort((a, b) => {
        return parseInt(a?.orden) - parseInt(b?.orden)
      })

      const variablesStructured = variablesOrdened?.map((variable) => ({
        ...variable,
        uuid: crypto.randomUUID(),
      }))

      form.setValue('variables', variablesStructured)

      const templates = versionInfo?.info?.plantillasRelacionadas?.map((template) => ({
        ...template,
        uuid: crypto.randomUUID(),
      }))

      form.setValue('plantillasRelacionadas', toArray(templates))
    }

    form.setValue(
      'idPlantilla',
      versionInfo?.idTemplate ? versionInfo?.idTemplate : versionInfo?.info?.idPlantilla ?? null
    )
    form.setValue('idVersion', versionInfo?.info?.id ?? null)

    form?.setValue('nombrePlantilla', versionInfo?.nameTemplate ?? '')
    form?.setValue('nombreVersion', versionInfo?.info?.nombre ?? '')
    form?.setValue('estructuraNumero', versionInfo?.info?.estructuraNumero ?? '')
  }, [form, versionInfo])

  const { handleCancelModal } = useHandleCancelModal({ modalUploadTemplate, form, setVersionInfo })
  const actionsActivityParams = getActionsActivityParams({ handleCancelModal })

  const titleModal = versionInfo
    ? versionInfo.info
      ? 'Editar versión'
      : 'Crear Versión'
    : 'Cargue plantilla'

  const {
    createTemplate,
    editVersionTemplate,
    downloadTemplate,
    loadingPostTemplate,
    loadingEditVersionTemplate,
    loadingDownloadTemplate,
  } = useFunctionsTemplates({
    queryClient,
    versionInfo,
    setVersionInfo,
    isDownload,
    setIsDownload,
    setBufferDocument,
    modalUploadTemplate,
  })

  const handleDownloadDocument = (doc, isDownload) => {
    setIsDownload(isDownload)
    downloadTemplate(doc)
  }

  const onSubmit = onSubmitTemplates({ createTemplate, editVersionTemplate, setVersionInfo, form })

  return (
    <>
      <TitleAdmin title='Administración de Documentos' />
      <div
        className='componentContainer'
        style={{ backgroundColor: theme.palette.backgroundGrey1 }}
      >
        <div className='flex justify-between'>
          <SearchTable
            searchText={searchTemplate?.searchText}
            onChange={searchTemplate?.handleSearchText}
            clearSearch={() => searchTemplate?.handleSearchText('')}
          />
          <AccessControl privilege='documentos.plantillas.crear_plantillas'>
            <SquareIconButton
              tooltip={'Cargue plantilla'}
              text={'Cargue plantilla'}
              IconComponent={<UploadFile />}
              onClick={modalUploadTemplate.handleShow}
              size={'medium'}
              sx={{ width: '200px' }}
            />
          </AccessControl>
        </div>
        {isLoadingTemplates ? (
          <LoadingSkeleton />
        ) : isErrorTemplates ? (
          <ErrorPage />
        ) : (
          <>
            <div className='templatesContainer'>
              {templatesInfo?.data?.map((template) => (
                <TemplateItem
                  key={template.id}
                  template={template}
                  setVersionInfo={setVersionInfo}
                  modalUploadTemplate={modalUploadTemplate}
                  downloadTemplate={handleDownloadDocument}
                  bufferDocument={bufferDocument}
                  loading={loadingEditVersionTemplate || loadingPostTemplate}
                />
              ))}
            </div>
            <TemplatesPagination
              templatesInfo={templatesInfo}
              isLoading={isLoadingTemplates}
              isError={isErrorTemplates}
              totalCount={totalCount}
              setCursorApi={setCursorApi}
              queryClient={queryClient}
              pageCount={pageCount}
              setPageCount={setPageCount}
            />
          </>
        )}
      </div>
      {modalUploadTemplate.show && (
        <CustomModal
          title={titleModal}
          open={modalUploadTemplate.show}
          handleClose={() => handleCancelModal()}
          modalType='form'
          onSubmit={form.handleSubmit(onSubmit)}
          actions={actionsActivityParams}
          size='lg'
        >
          <BackdropLoading
            loading={loadingPostTemplate || loadingEditVersionTemplate || loadingDownloadTemplate}
          />
          <TemplateUpload
            loading={loadingDownloadTemplate}
            downloadTemplate={handleDownloadDocument}
            form={form}
            apiVars={versionInfo}
          />
        </CustomModal>
      )}
    </>
  )
}

export default ViewTemplates
