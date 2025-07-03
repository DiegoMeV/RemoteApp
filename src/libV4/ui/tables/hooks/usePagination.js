import { useEffect, useRef, useState } from 'react'

const usePagination = (
  dataRows,
  loadingInfoRows,
  setCursor,
  paginationModel,
  setPaginationModel,
  counter = 'count',
  getCursor = 'last'
) => {
  const [rowCount, setRowCount] = useState(dataRows?.[counter] ?? 0)
  const mapPageToNextCursor = useRef({})

  useEffect(() => {
    if (dataRows?.[counter]) setRowCount(dataRows?.[counter])
  }, [counter, dataRows])

  const [pageInfo, setPageInfo] = useState({
    nextCursor: '',
    totalRowCount: 0,
  })
  const prevPageInfo = useRef(pageInfo)

  useEffect(() => {
    if (dataRows && dataRows?.data) {
      const cursor = getCursor === 'last' ? [dataRows.data?.length - 1] : 0
      const newPageInfo = {
        ...pageInfo,
        nextCursor: dataRows?.data[cursor]?.id,
        totalRowCount: dataRows?.[counter] ?? rowCount,
      }
      if (JSON.stringify(newPageInfo) !== JSON.stringify(prevPageInfo.current)) {
        setPageInfo(newPageInfo)
        prevPageInfo.current = newPageInfo
      }
    }
  }, [dataRows, counter, getCursor, rowCount, pageInfo])

  useEffect(() => {
    setCursor(mapPageToNextCursor.current[paginationModel?.page - 1])
  }, [setCursor, paginationModel])

  const handlePaginationModelChange = (newPaginationModel) => {
    // We have the cursor, we can allow the page transition.
    if (
      newPaginationModel?.page === 0 ||
      mapPageToNextCursor.current[newPaginationModel?.page - 1]
    ) {
      setPaginationModel(newPaginationModel)
    }
  }

  useEffect(() => {
    if (!loadingInfoRows && pageInfo?.nextCursor) {
      // We add nextCursor when available
      mapPageToNextCursor.current[paginationModel?.page] = pageInfo?.nextCursor
    }
  }, [paginationModel?.page, loadingInfoRows, pageInfo?.nextCursor])

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading

  return { handlePaginationModelChange, rowCount }
}

export default usePagination
