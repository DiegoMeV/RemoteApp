import { useEffect, useMemo, useRef, useState } from 'react'

const usePaginationRoles = (dataRows, paramsFilter, fetchingJobTitles) => {
  const mapPageToNextCursor = useRef({})

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  useEffect(() => {
    setPaginationModel({
      page: 0,
      pageSize: 50,
    })
  }, [paramsFilter?.isActive])

  const initialPageInfo = useMemo(
    () => ({
      nextCursor: '',
      totalRowCount: 0,
    }),
    []
  )
  const [pageInfo, setPageInfo] = useState({
    initialPageInfo,
  })
  useEffect(() => {
    if (dataRows && dataRows?.data) {
      setPageInfo((prevPageInfo) => ({
        ...prevPageInfo,
        nextCursor: dataRows?.data[dataRows.data?.length - 1]?.id,
        totalRowCount: dataRows.count,
      }))
    }
  }, [dataRows])

  useEffect(() => {
    if (paramsFilter) {
      paramsFilter?.setCursor(mapPageToNextCursor.current[paginationModel.page - 1])
      paramsFilter?.setPageSize(paginationModel.pageSize)
    }
  }, [paginationModel, paramsFilter])

  const handlePaginationModelChange = (newPaginationModel) => {
    // We have the cursor, we can allow the page transition.
    if (newPaginationModel.page === 0 || mapPageToNextCursor.current[newPaginationModel.page - 1]) {
      setPaginationModel(newPaginationModel)
    }
  }

  useEffect(() => {
    if (!fetchingJobTitles && pageInfo?.nextCursor) {
      // We add nextCursor when available
      mapPageToNextCursor.current[paginationModel.page] = pageInfo?.nextCursor
    }
  }, [paginationModel.page, fetchingJobTitles, pageInfo?.nextCursor])

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(pageInfo?.totalRowCount || 0)
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined ? pageInfo?.totalRowCount : prevRowCountState
    )
  }, [pageInfo?.totalRowCount, setRowCountState])
  return { handlePaginationModelChange, rowCountState, paginationModel }
}

export default usePaginationRoles
