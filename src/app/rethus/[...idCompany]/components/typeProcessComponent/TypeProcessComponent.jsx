import ViewFormComponent from '../ViewFormComponent'

const TypeProcessComponent = ({
  setValue,
  control,
  infoGroupProcess,
  getValues,
  watch,
  infoProcessSelected,
  unregister,
}) => {
  const newArray = infoGroupProcess?.data?.map((objeto) => ({
    id: objeto.id,
    name: objeto.name,
    additional: objeto.typeSpecs?.additionalData,
  }))

  let typeProcess = getValues()
  watch('type_process')
  const columnsModal = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      flex: 1,
    },
  ]
  const inputList = [
    {
      label: 'Tipo de proceso',
      name: 'type_process',
      type: 'autoCompleteSelect',
      data: newArray,
      required: true,
      space: 6,
      disabled: !!infoProcessSelected,
      onChange: () => {
        unregister('nroResolucion')
        unregister('fechaResolucion')
      },
    },
  ]

  if (typeProcess?.type_process?.additional?.length > 0) {
    typeProcess.type_process?.additional?.forEach((element) => {
      inputList.push({
        label: element.name ?? '',
        name: element.id ?? element.name ?? '',
        type: element.type ? (element.type === 'string' ? 'text' : element.type) : 'text',
        space: 3,
        disabled: !!infoProcessSelected,
        required: element.isRequired,
        disableFuture: element.name,
        validate: (value) => {
          if (value > new Date()) {
            return 'La fecha no puede ser mayor a la fecha actual'
          }
          return true
        },
      })
    })
  }

  return (
    <ViewFormComponent
      columnsModal={columnsModal}
      inputList={inputList}
      setValue={setValue}
      control={control}
    />
  )
}

export default TypeProcessComponent
