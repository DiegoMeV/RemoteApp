import { ChartContainer, ChooseInput, ClassicIconButton, formatDateForTextfield } from '@/lib'
import { FormatClear } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import toast from 'react-hot-toast'

const FormFiltersAnalytics = ({ form, requestDIARIMutate }) => {
  const onSubmit = (data) => {
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined && v !== '' && v !== null)
    )
    if (filteredData.after) {
      filteredData.after.$isDayjsObject && !isNaN(Date.parse(filteredData.after.$d))
        ? (filteredData.after = formatDateForTextfield(filteredData.after))
        : delete filteredData.after
    }
    if (filteredData?.before) {
      filteredData.before.$isDayjsObject && !isNaN(Date.parse(filteredData.before.$d))
        ? (filteredData.before = formatDateForTextfield(filteredData.before))
        : delete filteredData.before
    }
    if (filteredData.after && filteredData.before) {
      requestDIARIMutate({
        qry: `/analytics/processes-by-time-frame/from/${filteredData?.after ?? ''}/to/${
          filteredData?.before ?? ''
        }`,
      })
      return
    }
    toast.error('Debe seleccionar un rango de fechas para filtrar')
  }
  const inputsFormRequestManagements = [
    {
      name: 'after',
      label: 'Fecha de inicio',
      type: 'date',
    },
    {
      name: 'before',
      label: 'Fecha de fin',
      type: 'date',
    },
  ]
  return (
    <ChartContainer
      title='Filtros'
      minHeight='200px'
    >
      <Grid
        container
        spacing={3}
        padding={3}
        component='form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {inputsFormRequestManagements.map((input, index) => {
          return (
            <ChooseInput
              key={index}
              item={input}
              control={form.control}
              setValue={form.setValue}
              index={index}
            />
          )
        })}
        <Grid
          item
          container
          xs={12}
          justifyContent='flex-end'
        >
          <ClassicIconButton
            onClick={() => form.reset?.()}
            title='Limpiar'
          >
            <FormatClear />
          </ClassicIconButton>
          <Button
            variant='contained'
            type='submit'
          >
            Aplicar filtro
          </Button>
        </Grid>
      </Grid>
    </ChartContainer>
  )
}

export default FormFiltersAnalytics
