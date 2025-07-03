export const valueListSelection = (modalCities, modalProvinces, valueList) => {
  if (modalCities) {
    return valueList.VLCities
  } else if (modalProvinces) {
    return valueList.VLProvinces
  }
}

export const valueListsRowFive = (
  provinces,
  loadingProvinces,
  modalProvinces,
  onChangeProvince,
  searchProvinces,
  cities,
  loadingCities,
  modalCities,
  onChangeCity,
  searchCitie,
  model,
  setModel
) => {
  return {
    VLProvinces: {
      title: 'Departamentos',
      rows: provinces?.data,
      columns: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 200,
        },
      ],
      loading: loadingProvinces,
      openOptions: modalProvinces,
      selectedOption: (params) => {
        onChangeProvince(null, params.row)
      },
      searchOptions: searchProvinces,
    },
    VLCities: {
      title: 'Municipios',
      rows: cities?.data,
      columns: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 200,
        },
      ],
      loading: loadingCities,
      openOptions: modalCities,
      selectedOption: (params) => {
        onChangeCity(null, params.row)
      },
      searchOptions: searchCitie,
      pagination: {
        rowCountState: cities?.paginacion?.total ?? 0,
        paginationMode: 'server',
        paginationModel: model,
        handlePaginationModelChange: (model) => {
          setModel(model)
        },
      },
    },
  }
}
