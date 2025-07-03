import { GenericTable } from '@/lib'
import { BasicTitle, GenericForm, useQueryDynamicApi } from '@/libV4'
import { useForm } from 'react-hook-form'

const Facturas = ({ dataForm }) => {
  const { data: facturas, isLoading: isLoadingFacturas } = useQueryDynamicApi({
    baseKey: 'urlPayments',
    url: `/facturacion/facturas?idCodigo=${dataForm?.idCodigo}`,
    enabled: !!dataForm?.idCodigo,
  })
  const form = useForm()
  return (
    <div>
      <BasicTitle title='Facturas' />
      <div className='p-2 backgroundGray1'>
        <form className='general_form_container pb-4'>
          <GenericForm
            inputs={[
              {
                label: 'Generado por',
                name: 'generado por',
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
            rows={facturas?.data ?? []}
            columns={[
              { field: 'fecha', headerName: 'Fecha' },
              { field: 'fechaLimite', headerName: 'Limite' },
              { field: 'factura', headerName: 'Número' },
              { field: 'tipo', headerName: 'Tipo' },
              { field: 'facturacion', headerName: 'Facturación' },
              { field: 'valor', headerName: 'Valor periodo' },
              { field: 'valor2', headerName: 'Valor con descto' },
              { field: 'estado', headerName: 'Estado' },
              { field: 'duplicado', headerName: 'Duplicado' },
              { field: 'observacion', headerName: 'Observación' },
            ]}
            loading={isLoadingFacturas}
            pagination={false}
            sx={{
              backgroundColor: 'backgroundWhite1',
              minHeight: '300px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Facturas
