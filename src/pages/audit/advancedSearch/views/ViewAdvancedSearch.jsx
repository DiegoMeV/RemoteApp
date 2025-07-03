import { useState } from 'react'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

import { GetApp } from '@mui/icons-material'
import { Button } from '@mui/material'

import { FormFilters } from '../components'
import { MagicString } from '@/lib'
import { AuditManagement } from '../../management'
import { columnsResults } from '../../funcs'

import { BackdropLoading, BasicTable, CustomAccordion, CustomModal, useBoolean } from '@/libV4'
import { BasicDataInbox, CurrentDocumentsInbox, HistoricalTaskList } from '../../components'

const ViewAdvancedSearch = ({
  searchResults,
  setFilterOptions,
  setPaginationModel,
  loadingResults,
  pagination,
  handleExportToExcel,
  isGeneratingExcel,
  isDisabledSendToExcel,
}) => {
  const navigate = useNavigate()
  const [idProcess, setIdProcess] = useState()
  const [identifier, setIdentifier] = useState()
  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()
  const management = useBoolean()

  const selectedOption = useStoreState((state) => state.menu.selectedOption)
  const userData = useStoreState((state) => state.user.userData)

  const infoMenu = useStoreState((state) => state.menu.infoMenu)

  const columns = columnsResults({
    setIdProcess,
    setIdentifier,
    openModals: {
      handleShowHistorical: historicalStates.handleShow,
      handleShowCurrentDocs: currentDocsStates.handleShow,
      handleShowBasicData: basicDataStates.handleShow,
      handleShowManagement: management.handleShow,
    },
    rows: searchResults?.data,
    userData,
    selectedOption,
    infoMenu,
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
    {
      title: 'Gestión',
      open: management.show,
      handleClose: management.handleShow,
      children: (
        <AuditManagement
          idProcessModal={idProcess}
          onSuccFinMan={management.handleShow}
        />
      ),
    },
  ]

  return (
    <div className='grid grid-cols-12 p-2 h-[calc(100vh-150px)] overflow-auto'>
      <div className='col-span-12'>
        <CustomAccordion
          title={MagicString.INBOX.SEARCH_TITLE}
          accordionprops={{ defaultExpanded: true }}
        >
          <FormFilters
            setFilterOptions={setFilterOptions}
            setPaginationModel={setPaginationModel}
          />
        </CustomAccordion>
        <CustomAccordion
          title={MagicString.GENERAL.SEARCH_RESULTS}
          accordionprops={{ defaultExpanded: true }}
        >
          <BackdropLoading loading={isGeneratingExcel} />
          <div className='flex justify-end pb-3'>
            <Button
              className='w-[200px]'
              variant='contained'
              startIcon={<GetApp />}
              disabled={isDisabledSendToExcel || isGeneratingExcel}
              onClick={handleExportToExcel}
            >
              Exportar a excel
            </Button>
          </div>

          <BasicTable
            containerProps={{
              className: 'h-[650px]',
            }}
            columns={columns ?? []}
            rows={searchResults?.data ?? []}
            loading={loadingResults}
            pagination={pagination}
          />
        </CustomAccordion>

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
    </div>
  )
}

export default ViewAdvancedSearch
