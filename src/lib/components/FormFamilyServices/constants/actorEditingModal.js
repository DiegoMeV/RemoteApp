export const setDefaultValues = (
  rowParams,
  formModal,
  getEducationLevelById,
  getProvinceById,
  getNeighborhoodsByID,
  searchCommune
) => {
  const propertyActions = {
    document_type: (value) => formModal.setValue('documentType', value),
    calidad: (value) => formModal.setValue('quality', value),
    identification: (value) => formModal.setValue('documentNumber', value),
    lastNameOne: (value) => formModal.setValue('lastName', value),
    nivel_educativo: (value) => getEducationLevelById({ qry: `${value}?` }),
    barrio_vereda: (value) => getNeighborhoodsByID({ qry: `${value}` }),
    departamento_procedencia: (value) => getProvinceById({ qry: `${value}` }),
    comuna_corregimiento: (value) => searchCommune({ qry: `${value}` }),
  }
  for (const property in rowParams) {
    if (rowParams?.[property]) {
      const action = propertyActions[property] || ((value) => formModal.setValue(property, value))
      action(rowParams[property])
    }
  }
}

export const noRequiredIdentification = [
  'desconocido',
  'menor_sin_identificacion',
  'adulto_sin_identificacion',
  undefined,
  null,
]
