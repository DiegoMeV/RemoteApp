import { actionComponents } from '@/lib'
import { Grid } from '@mui/material'

const BasicDataModal = ({ infoRowSelected }) => {
  const styles = {
    bgcolor: 'backgroundGrey1',
    p: '10px 30px 20px 10px',
    m: '5px auto',
    width: '100%',
    height: '100%',
    minHeight: '250px',
    borderRadius: '10px',
    WebkitBoxShadow: '0px 2px 8px 0px rgba(0,0,0,0.75)',
    MozBoxShadow: '0px 2px 8px 0px rgba(0,0,0,0.75)',
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.75)',
  }
  const arrInputs = [
    {
      label: 'Tipo de actuacion',
      type: 'lov',
      value: infoRowSelected?.dataTipoActuacion?.nombre,
      disabled: true,
    },
    {
      name: 'otra_actuacion',
      label: 'Otra actuacion',
      type: 'text',
      value: infoRowSelected?.otra_actuacion,
      disabled: true,
    },
    {
      name: 'fecha_inicio',
      label: 'Fecha de inicio',
      type: 'date',
      value: infoRowSelected?.fecha_inicio,
      disabled: true,
    },
    {
      name: 'fecha_final',
      label: 'Fecha final',
      type: 'date',
      value: infoRowSelected?.fecha_final,
      disabled: true,
    },
    {
      name: 'identificacion_actuacion',
      label: 'Identificacion actuacion',
      type: 'text',
      value: infoRowSelected?.identificacion_actuacion,
      disabled: true,
    },
    {
      name: 'aplicativo',
      label: 'Aplicativo',
      type: 'text',
      value: infoRowSelected?.aplicativo,
      disabled: true,
    },
    {
      name: 'cantidad_hallazgos_fiscaliza',
      label: 'Cantidad hallazgos fiscaliza',
      type: 'number',
      value: infoRowSelected?.cantidad_hallazgos_fiscaliza,
      disabled: true,
    },

    {
      name: 'valor_hallazgos_fiscaliza',
      label: 'Valor hallazgos fiscaliza',
      type: 'money',
      value: infoRowSelected?.valor_hallazgos_fiscaliza,
      disabled: true,
    },
    {
      name: 'cantidad_ordenes_ip',
      label: 'Cantidad ordenes ip',
      type: 'number',
      value: infoRowSelected?.cantidad_ordenes_ip,
      disabled: true,
    },
    {
      name: 'valor_ip',
      label: 'Valor ip',
      type: 'money',
      value: infoRowSelected?.valor_ip,
      disabled: true,
    },
    {
      name: 'valor_beneficio_fiscal',
      label: 'Valor beneficio fiscal',
      type: 'money',
      value: infoRowSelected?.valor_beneficio_fiscal,
      disabled: true,
    },
    {
      name: 'resultado',
      label: 'Resultado',
      type: 'multiline',
      minRows: 4,
      space: 12,
      spaceSm: 12,
      value: infoRowSelected?.resultado,
      disabled: true,
    },
  ]
  return (
    <Grid
      container
      py={1}
      spacing={2}
      sx={styles}
    >
      {arrInputs?.map((item, index) => {
        const Input = actionComponents[item?.type] || actionComponents.default
        return (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={item?.space ?? 6}
          >
            <Input {...item} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default BasicDataModal
