export const inputList = [
  {
    type: 'date',
    name: 'dateGraduation',
    label: 'Fecha de grado',
    space: 4,
    errorMsj: 'Por favor ingrese la fecha de grado',
    required: true,
    disableFuture: true,
    validate: (value) => {
      if (value > new Date()) {
        return 'La fecha no puede ser mayor a la fecha actual'
      }
      return true
    },
  },
  {
    type: 'number',
    name: 'numberAct',
    label: 'Número de acta de grado',
    space: 4,
    errorMsj: 'Por favor ingrese el número de acta de grado',
    required: true,
  },
  {
    type: 'date',
    name: 'dateAct',
    label: 'Fecha de acta de grado',
    space: 4,
    errorMsj: 'Por favor ingrese la fecha de acta de grado',
    required: true,
    disableFuture: true,
    validate: (value) => {
      if (value > new Date()) {
        return 'La fecha no puede ser mayor a la fecha actual'
      }
      return true
    },
  },
  {
    type: 'number',
    name: 'numberRegistryInstitution',
    label: 'Nro. Libro de registro Institución',
    space: 4,
    errorMsj: 'Por favor ingrese el número de registro de la institución',
    required: true,
  },
  {
    type: 'number',
    name: 'folioNumber',
    label: 'Número de folio',
    space: 4,
    errorMsj: 'Por favor ingrese el número de folio',
    required: true,
  },
  {
    type: 'date',
    name: 'dateBook',
    label: 'Fecha registro en libro',
    space: 4,
    errorMsj: 'Por favor ingrese la fecha de libro',
    required: true,
    disableFuture: true,
    validate: (value) => {
      if (value > new Date()) {
        return 'La fecha no puede ser mayor a la fecha actual'
      }
      return true
    },
  },
]
