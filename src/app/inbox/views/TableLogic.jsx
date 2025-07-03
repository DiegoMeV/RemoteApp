import { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'
import { downloadFile, isEmpty, useDownloadExcel, useQueryDynamicApi } from '@/lib'
import { getColumns, optionsColumn, stateColumn } from '../funcs'
import { buildQuery, useTableFunctions } from '../hooks'
import { ProcessModals } from '../components'
import TableInbox from './TableInbox'
import { BackdropLoading } from '@/libV4'

const TableLogic = () => {
  const searchText = useStoreState((state) => state.searchText.searchText)
  const infoMenu = useStoreState((state) => state.menu.infoMenu)
  const filingForm = infoMenu?.filingForm

  const [idProcess, setIdProcess] = useState()
  const [idActivity, setIdActivity] = useState()
  const [identifier, setIdentifier] = useState()
  const [searchTriggered, setSearchTriggered] = useState('')

  const [rowCount, setRowCount] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  })

  const [modalOpen, setModalOpen] = useState('')

  const handleOpenModal = (modal) => setModalOpen(modal)
  const handleCloseModal = () => setModalOpen('')

  const query = buildQuery(
    paginationModel,
    infoMenu,
    searchTriggered.trim().length > 0 ? searchTriggered : ''
  )

  const {
    data: infoRows,
    isFetching: loadingInforRows,
    isError,
    refetch: refetchInfoRows,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/inbox${query}`,
  })

  const options = optionsColumn({
    handleOpenModal,
    setIdProcess,
    setIdActivity,
    setIdentifier,
    filingForm,
  })

  const columns = getColumns(infoMenu) || []

  const { mutateAsync: downloadExcel, isPending: isPendingDownloadExcel } = useDownloadExcel({
    baseUrl: 'urlProcess',
    url: `/inbox/group/${infoMenu?.id}/excel`,
    onSuccess: async (blob) => {
      await downloadFile(
        blob,
        `${infoMenu?.name}.xlsx`,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    },
  })

  useEffect(() => {
    if (infoRows?.data) {
      if (infoRows?.count || infoRows?.count === 0) setRowCount(infoRows?.count)
    }
  }, [infoRows])

  const { handleDoubleClick, requestSearch } = useTableFunctions()

  const handleSearch = () => {
    setSearchTriggered(searchText)
    setPaginationModel({ page: 0, pageSize: 25 })
  }

  const handleClearText = () => {
    requestSearch('')
    setSearchTriggered('')
    setPaginationModel({ page: 0, pageSize: 25 })
  }

  useEffect(() => {
    if (isEmpty(searchText)) {
      setSearchTriggered('')
    }
  }, [searchText])

  useEffect(() => {
    if (infoMenu?.id) {
      setPaginationModel({ page: 0, pageSize: 25 })
    }
  }, [infoMenu?.id])

  return (
    <>
      <BackdropLoading loading={isPendingDownloadExcel} />
      <TableInbox
        statesData={{
          infoRows: infoRows?.data,
          columnsApi: [stateColumn, ...columns, options],
          loadingInforRows,
          isError,
        }}
        handleDoubleClick={handleDoubleClick}
        slotProps={{ requestSearch, refetchInfoRows, handleSearch, handleClearText, downloadExcel }}
        rowCountState={rowCount}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
      <ProcessModals
        idProcess={idProcess}
        idActivity={idActivity}
        identifier={identifier}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      />
    </>
  )
}

export default TableLogic
