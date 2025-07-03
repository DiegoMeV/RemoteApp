import { Grid } from '@mui/material'
import { GenericForm } from '@/lib'

const FormComponent = ({ control }) => {
  return (
    <Grid
      container
      spacing={2}
    >
      <GenericForm
        inputs={[
          {
            name: 'expedient',
            label: 'Generar expediente',
            type: 'select',
            defaultValue: 'Pending',
            options: [
              { label: 'Pendiente', value: 'Pending' },
              { label: 'Si', value: 'yes' },
              { label: 'No', value: 'no' },
            ],
          },
          {
            name: 'numRecords',
            label: 'Cantidad de registros',
            type: 'select',
            defaultValue: 'total',
            options: [
              { label: 'Cantidad total de la muestra', value: 'total' },
              { label: 'Cantidad de registros aprobados', value: 'approved' },
              { label: 'Cantidad de registros rechazados', value: 'rejected' },
              { label: 'Cantidad de registros pendientes', value: 'pending' },
            ],
          },
        ]}
        control={control}
      />
    </Grid>
  )
}

export default FormComponent
