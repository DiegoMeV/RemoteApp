import { EditOption } from '../../../components'

const columnsTableProvince = (navigate, hasPrivilege) => {
  const editprovince = (id) => {
    navigate(`/applications/ubication/province/${id}`)
  }
  const columns = [
    { field: 'codigo_dane', headerName: 'Código Dane', minWidth: 150 },
    { field: 'nombre', headerName: 'Departamento', minWidth: 200 },
    {
      field: 'nombre_region',
      headerName: 'Region',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.regionInfo?.nombre ?? ''}`
      },
    },
    {
      field: 'nombre_satelite',
      headerName: 'Satelitales',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.sateliteInfo?.nombre ?? ''}`
      },
    },
    {
      field: 'lat',
      headerName: 'Latitud',
      minWidth: 200,
      width: 200,
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
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      hideable: false,
      resizable: false,
      headerAlign: 'center',
      renderHeader: () => '',
      renderCell: (params) => {
        return <EditOption onClick={() => editprovince(params.row.id)} />
      },
    })
  }
  return columns
}

export default columnsTableProvince
