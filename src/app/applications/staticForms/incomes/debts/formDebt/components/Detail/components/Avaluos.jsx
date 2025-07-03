import { GenericTable } from '@/lib'
import { BasicTitle, useQueryDynamicApi } from '@/libV4'

const Avaluos = ({ dataForm }) => {
  const { data: avaluos, isLoading: isLoadingAvaluos } = useQueryDynamicApi({
    baseKey: 'urlPayments',
    url: `/vehicular/${dataForm?.idCodigo}/caracteristicas`,
    enabled: !!dataForm?.idCodigo,
  })
  return (
    <div>
      <BasicTitle title='Avalúos y otros atributos' />
      <div className={`h-[calc(100vh-300px)]`}>
        <GenericTable
          rows={avaluos?.data ?? []}
          columns={[
            { field: 'periodo', headerName: 'Vigencia' },
            { field: 'avaluo', headerName: 'Avalúo' },
            { field: 'texto_tarifa', headerName: 'Tarifa' },
          ]}
          pagination={false}
          loading={isLoadingAvaluos}
          sx={{
            backgroundColor: 'backgroundWhite1',
            minHeight: '300px',
          }}
        />
      </div>
    </div>
  )
}

export default Avaluos
