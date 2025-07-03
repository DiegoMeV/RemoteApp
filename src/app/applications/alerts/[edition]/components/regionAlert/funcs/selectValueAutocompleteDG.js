export const selectAutocompleteCities = (apiRef, props, newValue) => {
  const { id, field } = props
  if (!newValue) {
    apiRef.current.setEditCellValue({ id, field, value: null })
    apiRef.current.setEditCellValue({ id, field: 'departamentoInfo', value: null })
    apiRef.current.setEditCellValue({ id, field: 'regionInfo', value: null })
    apiRef.current.setEditCellValue({ id, field: 'sateliteInfo', value: null})
    return
  }
  apiRef.current.setEditCellValue({ id, field, value: newValue })
  apiRef.current.setEditCellValue({
    id,
    field: 'departamentoInfo',
    value: {
      id: newValue?.departamentoInfo?.id,
      nombre: newValue?.departamentoInfo?.nombre,
    },
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'regionInfo',
    value: {
      id: newValue?.departamentoInfo?.regionInfo?.id,
      nombre: newValue?.departamentoInfo?.regionInfo?.nombre
    }
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'sateliteInfo',
    value: {
      id: newValue?.departamentoInfo?.sateliteInfo?.id,
      nombre: newValue?.departamentoInfo?.sateliteInfo?.nombre
    }
  })
}

export const selectAutocompleteDepartments = (apiRef, props, newValue) => {
  const { id, field } = props
  if (!newValue) {
    apiRef.current.setEditCellValue({
      id,
      field: 'departamentoInfo',
      value: null,
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'regionInfo',
      value: null
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'sateliteInfo',
      value: null
    })
    apiRef.current.setEditCellValue({
      id,
      field: 'municipioInfo',
      value: null,
    })
    return
  }
  apiRef.current.setEditCellValue({ id, field, value: newValue })
  apiRef.current.setEditCellValue({
    id,
    field: 'regionInfo',
    value: {
      id: newValue?.regionInfo?.id,
      nombre: newValue?.regionInfo?.nombre
    }
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'sateliteInfo',
    value: {
      id: newValue?.sateliteInfo?.id,
      nombre: newValue?.sateliteInfo?.nombre
    }
  })
  apiRef.current.setEditCellValue({
    id,
    field: 'municipioInfo',
    value: null,
  })
}
