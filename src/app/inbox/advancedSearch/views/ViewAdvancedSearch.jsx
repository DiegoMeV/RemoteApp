import {
  BasicDataInbox,
  ClassicIconButton,
  CustomAccordion,
  CustomModal,
  MagicString,
  NoDataOverlay,
  useBoolean,
} from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { FormFilters } from '../components'
import { HistoricalTaskList } from '../../components/historical'
import { CurrentDocumentsInbox } from '../../components/currentDocuments'
import { columnsResults } from '../funcs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { ChangeStatus } from '../../components'
import { useStoreState } from 'easy-peasy'

const ViewAdvancedSearch = ({
  searchResults,
  setFilterOptions,
  resetPagination,
  loadingResults,
  pagination,
}) => {
  const apiRef = useGridApiRef()
  const navigate = useNavigate()
  const [idProcess, setIdProcess] = useState()
  const [identifier, setIdentifier] = useState()
  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()
  const changeStatus = useBoolean()

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
      handleShowChangeStatus: changeStatus.handleShow,
    },
    rows: searchResults?.data,
    userData,
    selectedOption,
    infoMenu,
    navigate,
  })
  const getRowHeight = (params) => {
    const countActors =
      params?.model?.processActorsList?.filter(
        (actor) => actor.idUserActor !== undefined && actor.storedActorData !== undefined
      ).length ?? 1
    return countActors * 50
  }
  useEffect(() => {
    if (searchResults) {
      apiRef?.current?.autosizeColumns?.({ includeOutliers: true, includeHeaders: true })
    }
  }, [apiRef, searchResults, columns])

  const modals = [
    {
      title: `Histórico ${identifier ?? ''}`,
      open: historicalStates.show,
      handleClose: historicalStates.handleShow,
      children: (
        <HistoricalTaskList
          idProcess={idProcess}
          closeModal={historicalStates.handleShow}
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

  const backInbox = (e) => {
    e.stopPropagation()
    navigate('/inbox')
  }

  return (
    <Box
      p={2}
      height='calc(100vh - 65px)'
      overflow='auto'
    >
      <CustomAccordion
        title={MagicString.INBOX.SEARCH_TITLE}
        defaultExpanded={true}
        icon={
          <ClassicIconButton onClick={backInbox}>
            <ArrowBack />
          </ClassicIconButton>
        }
      >
        <FormFilters
          setFilterOptions={setFilterOptions}
          resetPagination={resetPagination}
        />
      </CustomAccordion>
      <CustomAccordion
        title={MagicString.GENERAL.SEARCH_RESULTS}
        defaultExpanded={true}
      >
        <Box height='600px'>
          <DataGridPremium
            apiRef={apiRef}
            columns={columns ?? []}
            rows={searchResults?.data ?? []}
            getRowHeight={getRowHeight}
            loading={loadingResults}
            pagination
            paginationMode={pagination?.paginationModel ? 'server' : 'client'}
            rowCount={pagination?.rowCount ?? 0}
            paginationModel={pagination?.paginationModel ?? null}
            onPaginationModelChange={pagination?.handlePaginationModelChange}
            pageSizeOptions={[10, 25, 50, 100]}
            slots={{
              loadingOverlay: LinearProgress,
              noRowsOverlay: NoDataOverlay,
            }}
            initialState={{
              pinnedColumns: {
                left: ['state'],
                right: ['options'],
              },
            }}
            sx={{ bgcolor: 'backgroundWhite1' }}
          />
        </Box>
      </CustomAccordion>

      {modals.map((modal, index) => {
        return (
          <CustomModal
            key={index}
            open={modal.open}
            handleClose={modal.handleClose}
            size='xxl'
            height='calc(100vh - 150px)'
            title={modal.title}
          >
            {modal.children}
          </CustomModal>
        )
      })}
    </Box>
  )
}

export default ViewAdvancedSearch
