export const inputsList = ({
  school,
  career,
  setSchoolSelected,
  unregister,
  setValue,
  setTitleSelect,
  titleSelect,
  schoolSelected,
}) => {
  const inputList = [
    {
      type: 'autocomplete',
      name: 'school',
      label: 'Institución Educativa',
      md: 6,
      control: school,
      getValues: (newValue) => {
        setSchoolSelected(newValue)
        unregister('career')
        setValue('career', null)
      },
      errorMsj: 'Por favor ingrese la institución educativa',
      required: true,
      columnsModal: [
        {
          headerName: 'Nombre',
          field: 'nombre',
          flex: 1,
        },
      ],
    },
    {
      type: 'autocomplete',
      name: 'career',
      label: 'Nombre del programa',
      md: 6,
      control: career,
      errorMsj: 'Por favor ingrese la carrera',
      required: true,
      disabled: !schoolSelected?.id,
      labelOption: (option) => {
        return `${option.codigo_programa} - ${option.nombre} - ${option.nombreMunicipio ?? ''} `
      },
      getValues: (newValue) => {
        setTitleSelect(newValue)
      },
      columnsModal: [
        {
          field: 'codigo_programa',
          headerName: 'Código programa',
          flex: 1,
        },
        {
          headerName: 'Nombre',
          field: 'nombre',
          flex: 1,
        },
        {
          headerName: 'Municipio de oferta',
          field: 'nombreMunicipio',
          flex: 1,
        },
      ],
    },
    {
      type: 'text',
      name: 'resolutionTitle',
      label: 'Título otorgado',
      space: 6,
      errorMsj: 'Por favor ingrese la resolución del título',
      required: true,
      helperText: titleSelect?.titulo_otorgado
        ? `Sugerencia: ${titleSelect?.titulo_otorgado ?? ''}`
        : '',
    },
  ]
  return inputList
}
