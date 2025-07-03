export const rowFiveInputs = (
  provinces,
  cities,
  modalCities,
  modalProvinces,
  loadingProvinces,
  loadingCities,
  onChangeProvince,
  onChangeCity,
  searchProvinces,
  searchCitie
) => {
  return [
    {
      name: 'departamento',
      type: 'autocomplete',
      space: 6,
      autocompleteProps: {
        options: provinces?.data ?? [],
        onChange: onChangeProvince,
        loadingOptions: loadingProvinces ?? false,
        openModal: modalProvinces?.handleShow,
        filterOptions: (options) => options,
      },
      textFieldProps: {
        label: 'Departamento',
        onChange: (e) => searchProvinces.handleSearchText(e.target.value),
      },
    },
    {
      name: 'municipio',
      type: 'autocomplete',
      space: 6,
      autocompleteProps: {
        options: cities?.data ?? [],
        onChange: onChangeCity,
        loadingOptions: loadingCities ?? false,
        openModal: modalCities?.handleShow,
        filterOptions: (options) => options,
      },
      textFieldProps: {
        label: 'Municipio',
        onChange: (e) => searchCitie.handleSearchText(e.target.value),
      },
    },
    {
      name: 'nombre_proyecto',
      type: 'text',
      label: 'Nombre del proyecto',
      space: 12,
    },
  ]
}
