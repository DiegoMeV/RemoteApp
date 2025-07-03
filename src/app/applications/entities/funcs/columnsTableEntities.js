import { EditOption, GenericChip } from '@/app/applications/components'
import { Typography } from '@mui/material'

const columnsTableEntities = (navigate, hasPrivilege) => {
  const editEntity = (id) => {
    navigate(`/applications/entities/${id}`)
  }

  const columns = [
    { field: 'identificacion', headerName: 'ID sujeto', width: 150 },
    {
      field: 'nombre',
      headerName: 'Sujeto',
      minWidth: 500,
      maxWidth: 800,

      renderCell: (params) => {
        return (
          <Typography
            variant='body2'
            sx={{
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {params.value ?? ''}
          </Typography>
        )
      },
    },
    {
      field: 'vigencia',
      headerName: 'Año',
      width: 100,
      valueGetter: (params) => {
        return `${params.value ?? ''}`
      },
    },
    {
      field: 'resolucion',
      headerName: 'Resolución',
      width: 200,
      valueGetter: (params) => {
        return `${params.value ?? ''}`
      },
    },
    {
      field: 'fecha_resolucion',
      headerName: 'Fecha de resolución',
      width: 200,
      valueGetter: (params) => {
        return `${params.value ? new Date(params.value).toLocaleDateString() : ''}`
      },
    },
    {
      field: 'dataDependencia',
      headerName: 'Competencía',
      minWidth: 600,
      valueGetter: (params) => {
        return `${params.value ? params.value.name : ''}`
      },
    },
    {
      field: 'activo',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => {
        return <GenericChip params={params} />
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
      resizable: false,
      headerAlign: 'center',
      renderHeader: () => '',
      renderCell: (params) => {
        return <EditOption onClick={() => editEntity(params.row.id)} />
      },
    })
  }
  return columns
}

export default columnsTableEntities
