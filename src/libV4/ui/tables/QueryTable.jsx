import { Button, IconButton } from '@mui/material'
import { GenericTextfield, useSearch } from '../inputs'
import { Close } from '@mui/icons-material'
import { BasicTable } from './BasicCustomTable'
import { useEffect, useState } from 'react'
import { useOracleExecutes } from '@/libV4/api'
import { queryWithPagination } from './funcs'

const QueryTable = ({ queryProps, tableProps, toolbarComp = <></>, handleAdd }) => {
  const [data, setData] = useState([])

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 50 })

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel)
  }

  const searchParam = useSearch()

  const { getQueryResult, isPendingQuery } = useOracleExecutes()

  const getData = async (query) => {
    const response = await getQueryResult(query)
    const data = response?.data
    setData(data)
  }

  useEffect(() => {
    const lovQuery = queryWithPagination(queryProps?.lovQuery, paginationModel)

    const lovWithoutSearch = lovQuery.replaceAll('$busqueda', searchParam?.value ?? '')

    getData(lovWithoutSearch)
  }, [queryProps?.lovQuery, paginationModel])

  const handleSearch = () => {
    const lovQuery = queryWithPagination(queryProps?.lovQuery, paginationModel)

    const lovWithSearch = lovQuery.replaceAll('$busqueda', searchParam?.value ?? '')
    getData(lovWithSearch)
  }

  const totalRows = data?.[0]?.total_count ?? 0

  return (
    <>
      <div className='flex flex-row gap-2 pb-2'>
        {toolbarComp}
        <GenericTextfield
          label='Buscar'
          value={searchParam?.value}
          onChange={(e) => {
            searchParam?.handleChange(e?.target?.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                title='Limpiar búsqueda'
                onClick={() => {
                  if (searchParam?.value?.trim() === '') return
                  searchParam?.handleChange('')

                  const lovQuery = queryWithPagination(queryProps?.lovQuery, paginationModel)

                  const lovWithoutSearch = lovQuery.replaceAll('$busqueda', '')
                  getData(lovWithoutSearch)
                }}
              >
                <Close />
              </IconButton>
            ),
          }}
          className='order-2'
        />
        <Button
          variant='contained'
          onClick={handleSearch}
          className='order-3'
        >
          Buscar
        </Button>
        {handleAdd && (
          <Button
            variant='contained'
            onClick={() => handleAdd()}
            className='order-4'
          >
            Agregar
          </Button>
        )}
      </div>
      <BasicTable
        containerProps={{
          className: 'h-[calc(100vh-300px)]',
        }}
        loading={isPendingQuery}
        columns={tableProps?.columns}
        rows={data ?? []}
        pagination={{
          count: totalRows ?? 1,
          page: paginationModel?.page ?? 10,
          rowsPerPage: paginationModel?.pageSize ?? 0,
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
        }}
        {...tableProps}
      />
    </>
  )
}

export default QueryTable
