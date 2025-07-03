import { EditOption } from '../../components'
import { useNavigate } from 'react-router-dom'

const useAlertBlocks = ({ hasPrivilege }) => {
  const navigate = useNavigate()
  const editBlock = (id) => {
    navigate(`/applications/blocks/${id}`)
  }
  const columns = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 200 },
  ]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      width: 60,
      renderCell: (params) => <EditOption onClick={() => editBlock(params.row.id)} />,
      hideable: false,
    })
  }
  return { columns }
}

export default useAlertBlocks
