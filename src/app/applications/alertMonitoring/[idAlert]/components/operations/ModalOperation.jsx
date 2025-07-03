import { GenericChip } from '@/app/applications/components'
import { AutocompleteDependencies } from '@/app/inbox/requirements/[idGroup]/components/Form/components'
import { ChooseInput, useBoolean, useGetActingTypes, useSearch } from '@/lib'
import { Grid } from '@mui/material'

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

const ModalOperation = ({ setValue, getValues, control, setActingTypes, actingType }) => {
  const isOtherInActingType = actingType?.nombre?.toLowerCase() === 'otro'

  const currentValues = getValues()

  const modalControlLov = useBoolean()
  const searchLov = useSearch()

  const { data: rowsTypeActing, isFetching } = useGetActingTypes()

  //TODO: Pasar a un hook
  const columnsForLov = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 300 },
    {
      field: 'isActive',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => {
        return <GenericChip params={params} />
      },
    },
  ]
  //TODO: Pasar a un hook
  const arrInputs = [
    {
      name: 'id_tipo_actuacion',
      label: 'Tipo de actuacion',
      required: true,
      type: 'lov',
      controlModal: modalControlLov,
      searchText: searchLov,
      options: rowsTypeActing ?? { data: [] },
      columns: columnsForLov ?? [],
      getValues: setActingTypes,
      loading: isFetching ?? false,
      funcRowAdditionalData: false,
    },
    {
      name: 'otra_actuacion',
      label: 'Otra actuacion',
      required: false,
      type: 'text',
      conditionToShow: !isOtherInActingType,
    },
    {
      name: 'fecha_inicio',
      label: 'Fecha de inicio',
      required: true,
      type: 'date',
    },
    {
      name: 'fecha_final',
      label: 'Fecha final',
      required: true,
      type: 'date',
    },
    {
      name: 'identificacion_actuacion',
      label: 'Identificacion actuacion',
      required: true,
      type: 'text',
    },
    {
      name: 'aplicativo',
      label: 'Aplicativo',
      required: true,
      type: 'text',
    },
    {
      name: 'cantidad_hallazgos_fiscaliza',
      label: 'Cantidad hallazgos fiscaliza',
      required: true,
      type: 'number',
    },

    {
      name: 'valor_hallazgos_fiscaliza',
      label: 'Valor hallazgos fiscaliza',
      required: true,
      type: 'money',
    },
    {
      name: 'cantidad_ordenes_ip',
      label: 'Cantidad ordenes ip',
      required: true,
      type: 'number',
    },
    {
      name: 'valor_ip',
      label: 'Valor ip',
      required: true,
      type: 'money',
    },
    {
      name: 'valor_beneficio_fiscal',
      label: 'Valor beneficio fiscal',
      required: true,
      type: 'money',
    },
    {
      name: 'resultado',
      label: 'Resultado',
      required: true,
      type: 'multiline',
      minRows: 4,
      space: 12,
      spaceSm: 12,
    },
  ]
  return (
    <Grid
      container
      py={1}
      spacing={2}
      sx={styles}
    >
      <AutocompleteDependencies
        control={control}
        setValue={setValue}
        currentValues={currentValues}
        md={6}
        px={0}
      />
      {arrInputs?.map((item, index) => {
        if (item?.conditionToShow) return null

        return (
          <ChooseInput
            key={index}
            setValue={setValue}
            item={item}
            control={control}
          />
        )
      })}
    </Grid>
  )
}

export default ModalOperation
