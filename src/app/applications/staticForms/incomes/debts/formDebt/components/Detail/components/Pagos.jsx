import { GenericTable } from '@/lib'
import { BasicTitle, GenericForm, useQueryDynamicApi } from '@/libV4'
import { useForm } from 'react-hook-form'

const Pagos = ({ dataForm }) => {
  const { data: payments, isFetching } = useQueryDynamicApi({
    baseKey: 'urlPayments',
    url: `/rentas/pagos?idCodigo=${dataForm?.idCodigo}`,
    enabled: !!dataForm?.idCodigo,
  })
  const form = useForm()
  return (
    <div>
      <BasicTitle title='Pagos' />
      <div className='p-2 backgroundGray1'>
        <form className='general_form_container pb-4'>
          <GenericForm
            inputs={[
              {
                label: 'Fecha real del pago',
                name: 'fecha_real_pago',
                className: 'col-span-4',
                disabled: true,
                type: 'date',
              },
            ]}
            control={form.control}
          />
        </form>
        <div className={`h-[calc(100vh-300px)]`}>
          <GenericTable
            rows={payments?.data ?? []}
            columns={[
              { field: 'fecha', headerName: 'Fecha' },
              { field: 'secuencia', headerName: 'Consecutivo' },
              { field: 'factura', headerName: 'Factura' },
              { field: 'valor', headerName: 'Valor pagado' },
              { field: 'banco', headerName: 'Banco' },
              { field: 'tipoCta', headerName: 'Tipo' },
              { field: 'observacion', headerName: 'Observación' },
            ]}
            pagination={false}
            loading={isFetching}
            sx={{
              backgroundColor: 'backgroundWhite1',
              minHeight: '300px',
              '.MuiDataGrid-aggregationColumnHeaderLabel': {
                display: 'none',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Pagos
