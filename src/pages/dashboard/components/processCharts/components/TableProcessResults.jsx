// TO-DO: Delete xlsx and file-saver from package.json
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetApp } from '@mui/icons-material'

import { ChartContainer, CustomModal, DataGridCustom, useBoolean } from '@/libV4'
import { columnsProcessResults } from '../constanst'

import { ChangeStatus } from '@/app/inbox/components'
import { CurrentDocumentsInbox } from '@/app/inbox/components/currentDocuments'
import { HistoricalTaskList } from '@/app/inbox/components/historical'
import { BasicDataInbox } from '@/lib'

const TableProcessResults = ({ queryParams }) => {
  const navigate = useNavigate()
  const [idProcess, setIdProcess] = useState()
  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()
  const changeStatus = useBoolean()

  const columns = columnsProcessResults({
    setIdProcess,
    openModals: {
      handleShowHistorical: historicalStates.handleShow,
      handleShowCurrentDocs: currentDocsStates.handleShow,
      handleShowBasicData: basicDataStates.handleShow,
      handleShowChangeStatus: changeStatus.handleShow,
    },
    navigate,
  })

  const modals = [
    {
      title: 'Histórico',
      open: historicalStates.show,
      handleClose: historicalStates.handleShow,
      children: (
        <HistoricalTaskList
          idProcess={idProcess}
          closeModal={historicalStates?.handleShow}
        />
      ),
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
    {
      title: 'Cambiar estado del proceso',
      open: changeStatus.show,
      handleClose: changeStatus.handleShow,
      children: (
        <ChangeStatus
          idProcess={idProcess}
          closeModal={changeStatus.handleShow}
        />
      ),
      height: 'auto',
    },
  ]

  const exportToExcel = (dataSource) => {
    const data = dataSource.map((item) => {
      return {
        'Nro. de proceso': item?.identifier ?? '',
        'Tipo de proceso': item?.processType?.name ?? '',
        Estado: item?.status ?? '',
      }
    })

    const ws = XLSX.utils.json_to_sheet(data)
    ws['!cols'] = [{ wch: 30 }, { wch: 30 }, { wch: 30 }]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Datos resultado')

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'resultado.xlsx')
  }

  const requestProps = {
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/analytics/processes-info`,
    isPaginated: true,
    paginationCursor: true,
    // Parameter: nonCursor or Page
    paginationSkip: true,
    additionalQry: `&wholeCompany=true${queryParams ? `&${queryParams}` : ''}`,
  }

  const buttonProps = {
    label: 'Exportar a Excel',
    onClick: exportToExcel,
    startIcon: <GetApp />,
    isData: true,
  }

  return (
    <div className='col-span-12'>
      <ChartContainer
        title='Resultados de la búsqueda'
        minHeight={500}
      >
        <div className='500px overflow-auto'>
          <DataGridCustom
            tableProps={{
              columns,
              usePagination: true,
            }}
            toolbarProps={{ searchProps: {}, buttonProps }}
            requestProps={requestProps}
            backgroundColor='transparent'
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

export default TableProcessResults
