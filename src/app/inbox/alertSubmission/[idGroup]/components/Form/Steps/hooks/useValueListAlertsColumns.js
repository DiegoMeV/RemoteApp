import { Chip } from '@mui/material'
import { ItemBtnAlert } from '../components'
import { formatToLocaleDate } from '@/lib'

const useValueListAlertsColumns = ({ handleOpenEditAlert }) => {
  return [
    {
      field: 'name',
      headerName: 'Identificador',
      width: 150,
      valueGetter: (params) => {
        return `${params?.row?.alertaInfo?.identificador ?? ''}`
      },
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha inicio',
      width: 100,
      renderCell: (params) => `${formatToLocaleDate(params?.value)}`,
    },
    {
      field: 'nombre_modelo',
      headerName: 'Modelo',
      width: 200,
      valueGetter: (params) => {
        return `${params?.row?.alertaInfo.modeloInfo?.nombre ?? ''}`
      },
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      width: 200,
      valueGetter: (params) => {
        return `${params?.row?.alertaInfo?.descripcion ?? ''}`
      },
    },
    {
      field: 'habilitar_boton',
      headerName: 'Estado',
      width: 150,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params?.row?.estado}
          color='secondary'
          variant='outlined'
        />
      ),
    },
    {
      field: 'options',
      headerName: '',
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      cellClassName: 'actions',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <ItemBtnAlert
            handleOpenEditAlert={handleOpenEditAlert}
            params={params}
          />
        )
      },
      hideable: false,
      filterable: false,
    },
  ]
}

export default useValueListAlertsColumns
