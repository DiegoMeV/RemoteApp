import { EditOption } from '../../../components'

export const columnsTableCities = (navigate, hasPrivilege) => {
  const editResource = (id) => {
    navigate(`/applications/ubication/cities/${id}`)
  }

  const columns = [
    {
      field: 'codigo_dane',
      headerName: 'Código Dane',
      minWidth: 150,
    },
    {
      field: 'nombre',
      headerName: 'Municipio',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.nombre ?? ''}`
      },
    },
    {
      field: 'departamentoInfo',
      headerName: 'Departamento',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.value?.nombre ?? ''}`
      },
    },
    {
      field: 'regionInfo',
      headerName: 'Región',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.departamentoInfo?.regionInfo?.nombre ?? ''}`
      },
    },
    {
      field: 'sateliteInfo',
      headerName: 'Satelitales',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.departamentoInfo?.sateliteInfo?.nombre ?? ''}`
      },
    },
    {
      field: 'lat',
      headerName: 'Latitud',
      minWidth: 200,
      valueGetter: (params) => {
        const coordenadas = params?.row?.coordenadas ? JSON.parse(params?.row?.coordenadas) : {}
        return `${coordenadas?.lat ?? ''}`
      },
    },
    {
      field: 'lng',
      headerName: 'Longitud',
      minWidth: 200,
      valueGetter: (params) => {
        const coordenadas = params?.row?.coordenadas ? JSON.parse(params?.row?.coordenadas) : {}
        return `${coordenadas?.lng ?? ''}`
      },
    },
  ]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      renderHeader: () => '',
      renderCell: (params) => {
        return <EditOption onClick={() => editResource(params.row.id)} />
      },
      hideable: false,
    })
  }
  return columns
}

export const inputsCities = (provinces, loadingProvinces, searchProvince, modalProvinces) => {
  return [
    { name: 'codigo_dane', label: 'Código Dane', required: true, space: 3, type: 'number' },
    { name: 'nombre', label: 'Nombre', required: true, space: 3 },
    {
      name: 'departamento',
      label: 'Departamento',
      type: 'autoCompleteSelect',
      space: 3,
      data: provinces?.data,
      isLoading: loadingProvinces,
      handleSearch: searchProvince,
      openModal: modalProvinces?.handleShow,
    },
    { name: 'lat', label: 'Latitud', space: 3, type: 'number' },
    { name: 'lng', label: 'Longitud', space: 3, type: 'number' },
  ]
}
