import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { GetApp } from '@mui/icons-material'

import {
  BackdropLoading,
  ChartContainer,
  CustomModal,
  DataGridCustom,
  useBoolean,
  useMutationDynamicBaseUrl,
} from '@/libV4'

import { BasicDataInbox, CurrentDocumentsInbox, HistoricalTaskList } from '@/pages/audit/components'

import { columnsFilesFiscal } from '../constants'

const TableManagementFile = ({ queryParams = '' } = {}) => {
  const navigate = useNavigate()
  const [idProcess, setIdProcess] = useState()
  const [identifier, setIdentifier] = useState()
  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()

  const columns = columnsFilesFiscal({
    setIdProcess,
    setIdentifier,
    openModals: {
      handleShowHistorical: historicalStates.handleShow,
      handleShowCurrentDocs: currentDocsStates.handleShow,
      handleShowBasicData: basicDataStates.handleShow,
    },
    navigate,
  })

  const modals = [
    {
      title: `Histórico ${identifier ?? ''}`,
      open: historicalStates.show,
      handleClose: historicalStates.handleShow,
      children: <HistoricalTaskList idProcess={idProcess} />,
    },
    {
      title: 'Datos básicos',
      open: basicDataStates.show,
      handleClose: basicDataStates.handleShow,
      children: <BasicDataInbox idProcess={idProcess} />,
    },
    {
      title: 'Documentos Vigentes',
      open: currentDocsStates.show,
      handleClose: currentDocsStates.handleShow,
      children: <CurrentDocumentsInbox idProcess={idProcess} />,
    },
  ]

  const { mutateAsync: sendExcelToEmail, isPending: isGeneratingExcel } = useMutationDynamicBaseUrl(
    {
      isCompanyRequest: true,
      baseKey: 'urlFiscalizacion',
      url: `/processes/expedients/generate-xlsx`,
      method: 'post',
      onSuccess: (response) =>
        toast.success(
          `Estamos procesando la búsqueda. El Excel de expedientes se enviará a ${response?.data?.data?.user?.email} en cuanto esté listo`
        ),
      onError: (error) => toast.error('Error al enviar los expedientes', error),
    }
  )

  const handleExportToExcel = () => {
    const isEnabledToExport = queryParams.trim() !== ''

    if (!isEnabledToExport) {
      toast.error('Al menos un filtro debe estar seleccionado para exportar a Excel')
      return
    }

    const body = Object.fromEntries(new URLSearchParams(queryParams))

    sendExcelToEmail({ body })
  }

  const requestProps = {
    isPaginated: true,
    paginationSkip: true,
    paginationCursor: true,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    // Parameter: nonCursor or Page
    url: `/analytics/processes-info`,
    additionalQry: `&wholeCompany=true${queryParams ? `&${queryParams}` : ''}`,
  }

  const buttonProps = {
    isData: true,
    startIcon: <GetApp />,
    onClick: handleExportToExcel,
    label: 'Exportar a Excel',
    disabled: !(queryParams.trim() !== '') || isGeneratingExcel,
    className: 'xs:col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3',
  }

  return (
    <div className='col-span-12'>
      <BackdropLoading loading={isGeneratingExcel} />
      <ChartContainer
        title='Resultados de la búsqueda'
        minHeight={500}
      >
        <div className='500px overflow-auto'>
          <DataGridCustom
            tableProps={{
              columns,
            }}
            toolbarProps={{
              searchProps: {},
              buttonProps,
              children: (
                <div className='xs:col-span-0 sm:col-span-6 md:col-span-6 lg:col-span-9'></div>
              ),
            }}
            requestProps={requestProps}
          />
        </div>
      </ChartContainer>
      {modals.map((modal, index) => {
        return (
          <CustomModal
            key={index}
            open={modal.open}
            handleClose={modal.handleClose}
            size='xxl'
            height={modal?.height ?? 'calc(100vh - 150px)'}
            title={modal.title}
          >
            {modal.children}
          </CustomModal>
        )
      })}
    </div>
  )
}

export default TableManagementFile
