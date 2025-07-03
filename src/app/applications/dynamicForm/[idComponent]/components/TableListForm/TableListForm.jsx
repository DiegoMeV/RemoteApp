import { BasicTable, GenericTextfield } from '@/libV4'
import { Close } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'

const TableListForm = ({
  columns,
  addNewData,
  isLoading,
  rows,
  setModel,
  model,
  pageCount,
  searchParameter,
  setSearchParam,
  getDataComponent,
  addAllowed,
}) => {
  const classNameSearchTextfield = addAllowed
    ? 'xs:col-span-12 sm:col-span-6 md:col-span-8 lg:col-span-8'
    : 'xs:col-span-12 sm:col-span-6 md:col-span-10 lg:col-span-10'

  return (
    <section className='grid grid-cols-12 gap-4 p-4 backgroundGray1'>
      <GenericTextfield
        className={classNameSearchTextfield}
        fullWidth
        label='Buscar'
        size='small'
        value={searchParameter}
        onChange={(e) => setSearchParam(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && getDataComponent()}
        InputProps={{
          endAdornment: (
            <IconButton
              title='Limpiar búsqueda'
              onClick={() => {
                if (searchParameter?.trim() === '') return
                setSearchParam('')
                getDataComponent()
              }}
            >
              <Close />
            </IconButton>
          ),
        }}
      />
      <Button
        className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
        onClick={getDataComponent}
        variant='contained'
        color='primary'
        size='small'
        //disabled={isPending || !isFormReady || dataBlock?.isReadOnly}
        fullWidth
      >
        Buscar
      </Button>
      {addAllowed && (
        <Button
          className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
          onClick={() => addNewData()}
          variant='contained'
          color='primary'
          size='small'
          //disabled={isPending || !isFormReady || dataBlock?.isReadOnly}
          fullWidth
        >
          Agregar
        </Button>
      )}

      <BasicTable
        containerProps={{
          className: 'h-[calc(100vh-320px)]',
        }}
        columns={columns}
        loading={isLoading}
        rows={rows ?? []}
        pagination={{
          count: pageCount ?? 1,
          page: model.page ?? 10,
          rowsPerPage: model.pageSize ?? 0,
          onPageChange: (_, page) =>
            setModel({
              page: page,
              pageSize: model.pageSize,
            }),
          onRowsPerPageChange: (e) => {
            const rowsPerPage = parseInt(e.target.value, 10)
            setModel({
              page: 0,
              pageSize: rowsPerPage,
            })
          },
        }}
      />
    </section>
  )
}

export default TableListForm
