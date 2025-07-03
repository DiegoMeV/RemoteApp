import { Button, IconButton } from '@mui/material'
import { BasicTable, BasicTitle, GenericTextfield } from '@/libV4'
import { Close } from '@mui/icons-material'

const ViewAssigPayOrder = ({
  data,
  columns,
  loading,
  model,
  setModel,
  assigmentModal,
  paymentOrders,
  setPaymentOrders,
  querySearch,
  setQuerySearch,
  handleSearch,
}) => {
  return (
    <>
      <BasicTitle
        title='Lista de ordenes de pago'
        backpath='/applications'
      />
      <div className='flex flex-col backgroundGray1 gap-y-2 p-2 h-[calc(100vh-64px)]'>
        <div className='grid grid-cols-12 gap-2'>
          <GenericTextfield
            label='Buscar'
            value={querySearch}
            onChange={(e) => setQuerySearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    handleSearch('')
                    setQuerySearch('')
                  }}
                >
                  <Close />
                </IconButton>
              ),
            }}
            className='general_form_item lg:col-span-6 xl:col-span-7'
          />
          <Button
            variant='contained'
            className='general_form_item lg:col-span-2 xl:col-span-2'
            onClick={handleSearch}
          >
            Buscar
          </Button>

          <Button
            variant='contained'
            className='general_form_item lg:col-span-4 xl:col-span-3'
            onClick={() => assigmentModal.handleShow()}
            disabled={paymentOrders?.length === 0}
          >
            Asignar funcionario
          </Button>
        </div>
        <BasicTable
          containerProps={{
            className: 'h-[calc(100vh-300px)]',
          }}
          selectionModel={{
            selectedRows: paymentOrders,
            setSelectedRows: setPaymentOrders,
          }}
          loading={loading}
          columns={columns ?? []}
          rows={data?.data ?? []}
          pagination={{
            count: data?.totalRows ?? 1,
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
          rowId='nroInternoOrden'
        />
      </div>
    </>
  )
}

export default ViewAssigPayOrder
