import { useQueryDynamicApi } from '@/lib/api'
import { useSearch } from '@/lib/components'
import { buildGeneralQuery, ErrorPage, SearchAndAdd, usePagination } from '@/libV4'
import { useState } from 'react'
import { GenericTable } from '.'

const RequestTable = ({ requestProps = {}, tableProps = {}, toolbarProps, divProps = {} }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  })
  const [cursor, setCursor] = useState(null)
  const searchModel = useSearch()

  const {
    additionalQry,
    querySearch = null,
    isPaginated = true,
    paginationCursor = true,
    ...restRequestProps
  } = requestProps

  const qry = buildGeneralQuery(
    paginationModel?.pageSize,
    cursor,
    searchModel?.value,
    querySearch,
    paginationCursor,
    paginationModel?.page,
    isPaginated
  )

  const {
    data: rows,
    isFetching,
    isError,
  } = useQueryDynamicApi({
    enabled: !!requestProps,
    ...restRequestProps,
    url: `${requestProps.url}${qry}${additionalQry ?? ''}`,
  })

  const { columns, ...rest } = tableProps

  const { handlePaginationModelChange, rowCount } = usePagination(
    rows,
    isFetching,
    setCursor,
    paginationModel,
    setPaginationModel
  )

  const pagination = isPaginated
    ? {
        rowCount: rowCount,
        paginationModel: 'server',
        onPaginationModelChange: handlePaginationModelChange,
      }
    : {}

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <div className=' backgroundGray1'>
          <SearchAndAdd
            searchProps={{
              value: searchModel.value,
              onChange: (e) => {
                searchModel.handleChange(e.target.value)
                handlePaginationModelChange({ current: 1, pageSize: 50 })
              },
              ...toolbarProps?.searchProps,
            }}
            buttonProps={toolbarProps?.buttonProps}
          >
            {toolbarProps?.children}
          </SearchAndAdd>
          <div
            {...divProps}
            className={`grid grid-cols-12 gap-4 p-4 h-[calc(100vh-230px)] ${
              divProps.className ?? ''
            }`}
          >
            <GenericTable
              columns={columns}
              rows={rows?.data ?? []}
              loading={isFetching}
              {...pagination}
              {...rest}
              className='col-span-12'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default RequestTable
