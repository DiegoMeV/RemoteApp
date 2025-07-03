import { handleCheckSelection } from './funcs/handleCheckSelection'
import { columnsInfoVersions } from './funcs/columnsInfoVersions'
import { DataGridCustom } from '@/libV4'
import { AccordionDetails } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useState } from 'react'

const VersionsTable = ({
  template,
  setVersionInfo,
  modalUploadTemplate,
  editTemplate,
  downloadTemplate,
}) => {
  const newVersion = () => {
    modalUploadTemplate.handleShow()
    setVersionInfo({
      nameTemplate: template?.nombre,
      idTemplate: template?.id,
    })
  }
  const templateId = template?.id ?? null
  const versionAct = template?.idVersion ?? null
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleEditVersion = (event, params) => {
    modalUploadTemplate.handleShow()
    setVersionInfo({
      nameTemplate: template?.nombre,
      info: params ?? null,
    })
    event.stopPropagation()
  }
  const [selectionModel, setSelectionModel] = useState([versionAct ?? ''])
  const { handleSelectionModelChange } = handleCheckSelection({
    setSelectionModel,
    setConfirmAlertProps,
    editTemplate,
  })
  const columns = columnsInfoVersions({
    selectionModel,
    handleSelectionModelChange,
    handleEditVersion,
    downloadTemplate,
  })

  const requestProps = {
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `/plantillas/${templateId}/versiones`,
    isPaginated: false,
  }
  const buttonProps = {
    privilege: 'documentos.plantillas.crear_plantillas',
    onClick: newVersion,
    className:
      'xs:col-span-12 md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10 2xl:col-span-2 2xl:col-start-11',
  }
  return (
    <AccordionDetails>
      <DataGridCustom
        tableProps={{
          columns,
          containerProps: {
            className: 'h-[400px]',
          },
          showPagination: false,
        }}
        toolbarProps={{ searchProps: {}, buttonProps }}
        requestProps={requestProps}
      />
    </AccordionDetails>
  )
}

export default VersionsTable
