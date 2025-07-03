import { GenericTable } from '@/lib'
import { BasicTitle, GenericForm } from '@/libV4'
import { useForm } from 'react-hook-form'

const Propietarios = () => {
  const form = useForm()
  return (
    <div>
      <BasicTitle title='Propietarios' />
      <div className='p-2 backgroundGray1'>
        <form className='general_form_container pb-4'>
          <GenericForm
            inputs={[
              {
                label: 'Fecha',
                name: 'fecha',
                className: 'col-span-3',
                disabled: true,
                type: 'date',
              },
              {
                label: 'Porcentaje',
                name: 'porcentaje',
                className: 'col-span-3',
                disabled: true,
              },
            ]}
            control={form.control}
          />
        </form>
        <div className={`h-[calc(100vh-300px)]`}>
          <GenericTable
            rows={[]}
            columns={[
              { field: 'tipo_identificacion', headerName: 'Tipo de identificación' },
              { field: 'numero', headerName: 'Número' },
              { field: 'nombres', headerName: 'Nombres y Apellidos' },
              { field: 'relacion', headerName: 'Relación' },
              { field: 'resolucion', headerName: 'Resolución' },
              { field: 'estado', headerName: 'Estado' },
            ]}
            pagination={false}
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

export default Propietarios
