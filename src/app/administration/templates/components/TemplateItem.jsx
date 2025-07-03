import {
  BackdropLoading,
  isDocumentType,
  ModalViewerDocs,
  useBoolean,
  useMutationDynamicBaseUrl,
} from '@/lib'
import { Accordion, AccordionSummary } from '@mui/material'
import VersionsTable from './versionsTable/VersionsTable'
import { useQueryClient } from '@tanstack/react-query'
import { TemplateInfo, TemplateItemButtons } from '.'
import { ExpandMore } from '@mui/icons-material'
import { useStoreState } from 'easy-peasy'
import { useTheme } from '@emotion/react'
import toast from 'react-hot-toast'
import { useState } from 'react'

const TemplateItem = ({
  template,
  setVersionInfo,
  modalUploadTemplate,
  downloadTemplate,
  bufferDocument,
  loading,
}) => {
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId ?? ''

  const { mutateAsync: editTemplate, isPending: loadingEditTemplate } = useMutationDynamicBaseUrl({
    baseKey: 'urlDocuments',
    url: `/plantillas/${template?.id}`,
    isCompanyRequest: true,
    method: 'put',
    onSuccess: () => {
      queryClient.invalidateQueries([`/${idCompany}/plantillas`])
      toast.success('Plantilla actualizada con éxito')
    },
    onError: (error) => {
      toast.error('Error al subir la plantilla', error)
    },
  })

  const theme = useTheme()
  const updateDate = new Date(template?.fechaActualizacion)
  const dateByComputer = updateDate.toLocaleDateString()
  const [isOpen, setIsOpen] = useState(false)
  const modalBooleanDoc = useBoolean()
  const isDocxDocument = isDocumentType('docx', template?.especificaciones?.tipo)

  const handleClickOptionDocument = (e, isDowload) => {
    e.stopPropagation()
    downloadTemplate({ idTemplate: template?.id, idVersion: template?.idVersion }, isDowload)
  }

  return (
    <>
      <BackdropLoading open={loadingEditTemplate || loading} />
      <Accordion
        key={template?.id}
        onChange={(expanded) => setIsOpen(expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel-content'
          id={template?.id}
        >
          <div className='flex items-center space-x-4 w-full'>
            <div className='flex justify-center px-6'>
              <img
                alt='icon'
                src={'/assets/svg/doc.svg'}
                width={50}
                height={50}
              />
            </div>
            <div className='flex flex-col col-span-7 flex-grow'>
              <TemplateInfo
                template={template}
                editTemplate={editTemplate}
              />
              <p
                className='text-sm text-secondary'
                style={{ color: theme.palette.secondary.main }}
              >
                Act: {dateByComputer} por:{' '}
                {template?.infoUsuarioAudita
                  ? `${template?.infoUsuarioAudita.nombres} ${template?.infoUsuarioAudita?.apellidos}`
                  : 'Error al traer datos'}
              </p>
            </div>
            <TemplateItemButtons
              template={template}
              modalBooleanDoc={modalBooleanDoc}
              handleClickOptionDocument={handleClickOptionDocument}
              isDocxDocument={isDocxDocument}
            />
          </div>
        </AccordionSummary>
        {isOpen && (
          <VersionsTable
            template={template}
            loading={loadingEditTemplate || loading}
            setVersionInfo={setVersionInfo}
            modalUploadTemplate={modalUploadTemplate}
            editTemplate={editTemplate}
            downloadTemplate={downloadTemplate}
          />
        )}
        {modalBooleanDoc.show && (
          <ModalViewerDocs
            open={modalBooleanDoc.show}
            handleClose={modalBooleanDoc.handleShow}
            buffer={bufferDocument}
          />
        )}
      </Accordion>
    </>
  )
}

export default TemplateItem
