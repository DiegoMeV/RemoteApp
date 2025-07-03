import { useState, useEffect } from 'react'

const usePaginationInbox = (dataRows, paramsFilter, counter = 'count') => {
  const [rowCount, setRowCount] = useState(dataRows?.[counter] ?? 0)

  useEffect(() => {
    if (dataRows?.[counter]) setRowCount(dataRows?.[counter])
  }, [counter, dataRows])

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: paramsFilter?.pageSize ?? 25,
  })

  useEffect(() => {
    setPaginationModel({
      page: 0,
      pageSize: paramsFilter?.pageSize ?? 50,
    })
  }, [paramsFilter.isActive, paramsFilter?.pageSize])

  const [pageInfo, setPageInfo] = useState({
    totalRowCount: 0,
  })

  useEffect(() => {
    if (dataRows && dataRows?.data) {
      setPageInfo({
        totalRowCount: dataRows?.[counter] ?? rowCount,
      })
    }
  }, [dataRows, counter, rowCount])

  useEffect(() => {
    if (paramsFilter?.isResetedPage) {
      setPaginationModel({
        page: 0,
        pageSize: paramsFilter?.pageSize ?? 50,
      })
      paramsFilter?.setIsResetedPage(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsFilter?.isResetedPage, paramsFilter?.pageSize])

  useEffect(() => {
    if (paramsFilter) {
      paramsFilter.setSkip(paginationModel.page * paginationModel.pageSize)
      paramsFilter.setPageSize(paginationModel.pageSize)
    }
  }, [paramsFilter, paginationModel])

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel)
  }

  const [rowCountState, setRowCountState] = useState(pageInfo?.totalRowCount || 0)

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined ? pageInfo?.totalRowCount : prevRowCountState
    )
  }, [pageInfo?.totalRowCount, setRowCountState])

  return { handlePaginationModelChange, rowCountState, paginationModel }
}

export default usePaginationInbox
