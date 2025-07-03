import { ValueListGlobal, useAllUserInfo, usePaginationGlobal, useSearch } from '@/lib'
import { useEffect, useState } from 'react'
import { useBuildQueryUsers, useColumnsUsers } from '../hooks'

const ModalSearchUser = ({ modalUsers, rowParams, refDatagrid }) => {
  const [rows, setRows] = useState([])
  const searchUser = useSearch()
  const columns = useColumnsUsers()
  const [pageSize, setPageSize] = useState(50)
  const [cursor, setCursor] = useState()
  const paramsFilter = {
    setPageSize,
    setCursor,
  }
  const qry = useBuildQueryUsers({
    querySearch: searchUser?.searchText,
    cursor: cursor,
    pageSize: pageSize,
  })
  const { data: users, isLoading: loadingUsers } = useAllUserInfo({
    qry: qry,
    enabled: modalUsers?.show,
  })

  const pagination = usePaginationGlobal(users, paramsFilter, loadingUsers)
  useEffect(() => {
    if (users && users?.data?.length !== 0) {
      setRows(users?.data)
    }
  }, [users, setRows])

  const selectedOption = async (params) => {
    const { id, field } = rowParams
    refDatagrid.current.setEditCellValue({ id, field, value: params.row })
  }

  return (
    <ValueListGlobal
      openOptions={modalUsers}
      columns={columns ?? []}
      rows={rows ?? []}
      selectedOption={selectedOption}
      searchOptions={searchUser}
      loading={loadingUsers}
      pagination={pagination}
    />
  )
}

export default ModalSearchUser
