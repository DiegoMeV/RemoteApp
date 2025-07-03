export const inputsList = ({
  expeditionDepartment,
  expeditionCity,
  bornCity,
  bornProvince,
  setProvinceSelected,
  setProvinceBornSelected,
  unregister,
  setValue,
  watch,
  isEditing,
}) => {
  const typeDocument = watch('documentType')
  const inputList = [
    {
      type: 'text',
      name: 'firstName',
      label: 'Primer Nombre',
      space: 3,
      errorMsj: 'Por favor ingrese el nombre del solicitante.',
      required: true,
      disabled: isEditing,
    },
    {
      type: 'text',
      name: 'secondName',
      label: 'Segundo Nombre',
      space: 3,
      errorMsj: 'Por favor ingrese el segundo nombre del solicitante.',
      required: false,
      disabled: isEditing,
    },
    {
      type: 'text',
      name: 'firstLastName',
      label: 'Primer Apellido',
      space: 3,
      errorMsj: 'Por favor ingrese el apellido del solicitante.',
      required: true,
      disabled: isEditing,
    },
    {
      type: 'text',
      name: 'secondLastName',
      label: 'Segundo Apellido',
      space: 3,
      errorMsj: 'Por favor ingrese el segundo apellido del solicitante.',
      required: false,
      disabled: isEditing,
    },
    {
      type: 'select',
      name: 'gender',
      label: 'Género',
      space: 3,
      required: true,
      options: [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
      ],
      noDefaultValue: true,
      disabled: isEditing,
    },
    {
      type: 'date',
      name: 'bornDate',
      label: 'Fecha de nacimiento',
      space: 3,
      required: true,
      errorMsj: 'Por favor ingrese la fecha de nacimiento del solicitante.',
      disableFuture: true,
      disabled: isEditing,
      validate: (value) => {
        if (value > new Date(new Date().setFullYear(new Date().getFullYear() - 18))) {
          return 'Debe ser mayor de edad para realizar la solicitud.'
        }
        return true
      },
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    },
    {
      type: 'select',
      name: 'documentType',
      label: 'Tipo de documento de identificación',
      space: 3,
      required: true,
      options: [
        { value: 'CC', label: 'Cédula de ciudadanía' },
        { value: 'CE', label: 'Cédula de extranjería' },
        { value: 'PT', label: 'Permiso por protección temporal' },
      ],
      noDefaultValue: true,
      onChange: () => {
        unregister('bornProvince')
        setValue('bornProvince', null)
        unregister('bornCity')
        setValue('bornCity', null)
      },
      disabled: isEditing,
    },
    {
      type: 'text',
      name: 'documentNumber',
      label: 'Número de documento de identificación',
      space: 3,
      errorMsj: 'Por favor ingrese el número de documento del solicitante.',
      required: true,
      disabled: isEditing,
    },
    {
      type: 'date',
      name: 'expeditionDate',
      label: 'Fecha de expedición',
      space: 3,
      required: true,
      errorMsj: 'Por favor ingrese la fecha de expedición del documento.',
      disableFuture: true,
      disabled: isEditing,
      validate: (value) => {
        if (value > new Date()) {
          return 'No puede ser mayor a la fecha actual'
        }
        return true
      },
    },
    {
      type: 'autocomplete',
      name: 'expeditionProvince',
      label: 'Departamento de expedición',
      md: 4.5,
      control: expeditionDepartment,
      getValues: (newValue) => {
        setProvinceSelected(newValue)
        unregister('expeditionCity')
        setValue('expeditionCity', null)
      },
      required: true,
      errorMsj: 'Por favor seleccione el departamento de expedición del documento.',
      disabled: isEditing,
    },
    {
      type: 'autocomplete',
      name: 'expeditionCity',
      label: 'Municipio de expedición',
      md: 4.5,
      control: expeditionCity,
      required: true,
      errorMsj: 'Por favor seleccione el municipio de expedición del documento.',
      disabled: isEditing,
    },
    {
      type: 'select',
      name: 'maritalStatus',
      label: 'Estado civil',
      space: 3,
      required: true,
      options: [
        { value: 'SO', label: 'Soltero' },
        { value: 'CA', label: 'Casado' },
        { value: 'UM', label: 'Unión Marital de Hecho' },
        { value: 'DI', label: 'Divorciado' },
        { value: 'VI', label: 'Viudo' },
      ],
      noDefaultValue: true,
      disabled: isEditing,
    },
    {
      type: 'autocomplete',
      name: 'bornProvince',
      label: 'Departamento de nacimiento',
      md: 4.5,
      control: bornProvince,
      getValues: (newValue) => {
        setProvinceBornSelected(newValue)
        unregister('bornCity')
        setValue('bornCity', null)
      },
      required: typeDocument === 'CC' ? true : false,
      disabled: typeDocument === 'CC' ? isEditing ?? false : true,
      errorMsj: 'Por favor seleccione el departamento de expedición del documento.',
    },
    {
      type: 'autocomplete',
      name: 'bornCity',
      label: 'Municipio de nacimiento',
      md: 4.5,
      control: bornCity,
      required: typeDocument === 'CC' ? true : false,
      disabled: typeDocument === 'CC' ? isEditing ?? false : true,
      errorMsj: 'Por favor seleccione el municipio de expedición del documento.',
    },
    {
      type: 'select',
      name: 'ethnicity',
      label: 'Grupo étnico',
      space: 3,
      required: true,
      options: [
        { value: '1', label: 'Indígena' },
        { value: '2', label: 'Rom' },
        { value: '3', label: 'Raizal del archipiélago de San Andres y Providencia' },
        { value: '4', label: 'Palenquero de San Basilio' },
        { value: '5', label: 'Negro(a), Mulato(a), Afro colombiano(a) o Afro descendiente' },
        { value: '6', label: 'Ninguno de los anteriores' },
      ],
      noDefaultValue: true,
      disabled: isEditing,
    },
  ]
  return inputList
}
