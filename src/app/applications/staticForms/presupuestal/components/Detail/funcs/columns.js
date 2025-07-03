import { formatColombianMoney } from '@/libV4'
import { DeleteOutline, Edit, OpenInNew } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const columnsDetailObligPre = ({
  handleRowClick,
  handleDetailClick,
  readOnly,
  handleRemoveRubro,
}) => {
  const options = {
    field: 'options',
    headerName: '',
    pinned: 'right',
    minWidth: 90,
    renderCell: (row) => (
      <>
        {row?.isNew && (
          <IconButton onClick={() => handleRowClick(row)}>
            <Edit />
          </IconButton>
        )}
        {!row?.isNew && (
          <IconButton onClick={() => handleDetailClick(row)}>
            <OpenInNew />
          </IconButton>
        )}
        <IconButton>
          <DeleteOutline onClick={() => handleRemoveRubro(row)} />
        </IconButton>
      </>
    ),
  }

  const columns = [
    { field: 'rubro_id', headerName: 'Id Rubro' },
    { field: 'numero_rubro', headerName: 'Número Rubro' },
    { field: 'nombre_rubro', headerName: 'Nombre Rubro' },
    { field: 'codigo_cpc', headerName: 'Código cpc' },
    { field: 'cpc', headerName: 'cpc' },
    { field: 'codigo_cpi', headerName: 'Código cpi' },
    { field: 'cpi', headerName: 'cpi' },
    { field: 'proyecto', headerName: 'Proyecto' },
    { field: 'recurso', headerName: 'fondo' },
    { field: 'id_centrocosto', headerName: 'Centro de costo' },
    { field: 'recurso', headerName: 'Id Fondo' },
    { field: 'valor', headerName: 'Valor', renderCell: (row) => formatColombianMoney(row.valor) },
    { field: 'nromovpptal', headerName: 'Número movimiento' },
    { field: 'nro_comprobantepptal', headerName: 'Número relacionado' },
    { field: 'nromovpptal', headerName: 'Número movimiento relacionado' },
  ]

  return readOnly ? columns : [...columns, options]
}
