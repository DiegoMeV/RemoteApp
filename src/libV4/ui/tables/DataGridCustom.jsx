import { useState } from 'react'
import { useQueryDynamicApi } from '../../api'
import { ErrorPage } from '../../components'
import { SearchAndAdd } from './components'
import { usePagination } from './hooks'
import { buildGeneralQuery } from '../../funcs'
import { useSearch } from '../inputs'
import { BasicTable } from './BasicCustomTable'

const DataGridCustom = ({
  requestProps = {},
  tableProps = {},
  toolbarProps = {},
  loading,
  className = '',
}) => {
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
    counter = 'count',
    paginationCursor = true,
    paginationSkip = false,
    ...restRequestProps
  } = requestProps

  const qry = buildGeneralQuery(
    paginationModel?.pageSize,
    cursor,
    searchModel?.value,
    querySearch,
    paginationCursor,
    paginationModel?.page,
    isPaginated,
    paginationSkip
  )

  const {
    data: rows,
    isFetching,
    isError,
  } = useQueryDynamicApi({
    ...restRequestProps,
    enabled: !!requestProps,
    url: `${requestProps.url}${qry}${additionalQry ?? ''}`,
  })

  const { columns, ...rest } = tableProps

  const { handlePaginationModelChange, rowCount } = usePagination(
    rows,
    isFetching,
    setCursor,
    paginationModel,
    setPaginationModel,
    counter
  )

  const searchProps = toolbarProps.searchProps
    ? Object.keys(toolbarProps.searchProps).length === 0
      ? {}
      : {
          value: searchModel.value,
          onChange: (e) => {
            searchModel.handleChange(e.target.value)
            handlePaginationModelChange({ current: 1, pageSize: 50 })
          },
          ...toolbarProps.searchProps,
        }
    : {
        value: searchModel.value,
        onChange: (e) => {
          searchModel.handleChange(e.target.value)
          handlePaginationModelChange({ current: 1, pageSize: 50 })
        },
      }

  return (
    <div className={`grid grid-cols-12 gap-4 p-4 ${className}`}>
      {isError ? (
        <div className='col-span-12'>
          <ErrorPage />
        </div>
      ) : (
        <>
          <SearchAndAdd
            searchProps={searchProps}
            buttonProps={toolbarProps?.buttonProps}
            dataSource={rows?.data ?? []}
          >
            {toolbarProps?.children}
          </SearchAndAdd>
          <div className={`col-span-12 flex flex-col min-h-[300px]] ${rest?.divClassName ?? ''}`}>
            <BasicTable
              rows={rows?.data ?? []}
              columns={columns}
              loading={isFetching || loading}
              containerProps={{
                className: 'h-[calc(100vh-350px)] w-full',
              }}
              pagination={
                isPaginated
                  ? {
                      count: rowCount,
                      page: paginationModel.page,
                      rowsPerPage: paginationModel.pageSize,
                      labelRowsPerPage: 'Filas por página',
                      onPageChange: (_, page) =>
                        handlePaginationModelChange({
                          page: page,
                          pageSize: paginationModel.pageSize,
                        }),
                      onRowsPerPageChange: (e) => {
                        const rowsPerPage = parseInt(e.target.value, 10)
                        handlePaginationModelChange({
                          page: 0,
                          pageSize: rowsPerPage,
                        })
                      },
                    }
                  : null
              }
              {...rest}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default DataGridCustom
