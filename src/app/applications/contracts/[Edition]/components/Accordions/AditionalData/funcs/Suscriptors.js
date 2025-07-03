export const suscriptorInputs = ({
  entities,
  loadingEntities,
  modalTerceros,
  setNameVL,
  onChangeEntidad,
  searchTerceros,
}) => [
  {
    name: 'entidad_origen_recursos',
    required: true,
    type: 'autocomplete',
    autocompleteProps: {
      options: entities?.data ?? [],
      loadingOptions: loadingEntities,
      openModal: () => {
        modalTerceros.handleShow()
        setNameVL('entidad_origen_recursos')
      },
      getOptionLabel: (option) =>
        `${option?.nombre_1 ?? ''} ${option?.nombre_2 ?? ''} ${option?.apellido_1 ?? ''} ${
          option?.apellido_2 ?? ''
        }`,
      onChange: (_, newValue) => onChangeEntidad(newValue, 'entidad_origen_recursos'),
      onBlur: () => {
        searchTerceros.clearSearch()
      },
    },
    textFieldProps: {
      label: 'Suscriptor emisor',
      onChange: (e) => searchTerceros.handleSearchText(e.target.value),
    },
  },
  {
    name: 'entidad_contratante',
    required: true,
    type: 'autocomplete',
    autocompleteProps: {
      options: entities?.data ?? [],
      loadingOptions: loadingEntities,
      openModal: () => {
        modalTerceros.handleShow()
        setNameVL('entidad_contratante')
      },
      getOptionLabel: (option) =>
        `${option?.nombre_1 ?? ''} ${option?.nombre_2 ?? ''} ${option?.apellido_1 ?? ''} ${
          option?.apellido_2 ?? ''
        }`,
      onChange: (_, newValue) => onChangeEntidad(newValue, 'entidad_contratante'),
      onBlur: () => {
        searchTerceros.clearSearch()
      },
    },
    textFieldProps: {
      label: 'Suscriptor receptor',
      onChange: (e) => {
        searchTerceros?.handleSearchText(e.target.value)
      },
    },
  },
]

export const columnsVLSuscriptors = [
  {
    field: 'Nombre',
    headerName: 'Nombre',
    flex: 1,
    valueGetter: ({ row }) =>
      `${`${row?.nombre_1 ?? ''} ${row?.nombre_2 ?? ''} ${row?.apellido_1 ?? ''} ${
        row?.apellido_2 ?? ''
      }`}`,
  },
]
