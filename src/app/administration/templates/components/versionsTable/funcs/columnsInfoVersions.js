import { Radio } from '@mui/material'
import OptionsInVersionsTable from '../OptionsInVersionsTable'

export const columnsInfoVersions = ({
  selectionModel,
  handleSelectionModelChange,
  handleEditVersion,
  downloadTemplate,
}) => {
  return [
    {
      headerName: '',
      field: 'select',
      width: 50,
      pinned: 'left',
      renderCell: (data) => {
        return (
          <div className='flex items-center justify-center'>
            <Radio
              checked={selectionModel.includes(data?.id)}
              onChange={() => handleSelectionModelChange([data?.id])}
            />
          </div>
        )
      },
    },
    {
      headerName: 'Nombre Version',
      field: 'nombre',
    },
    {
      headerName: 'Fecha Creacion',
      field: 'fechaCreacion',
      renderCell: (row) => new Date(row?.fechaCreacion).toLocaleDateString(),
    },
    {
      headerName: 'Usuario',
      field: 'infoUsuarioAudita',
      renderCell: (row) =>
        `${row?.infoUsuarioAudita?.nombres ?? ''} ${row?.infoUsuarioAudita?.apellidos ?? ''}`,
    },
    {
      headerName: '',
      field: 'options',
      pinned: 'right',
      width: 120,
      renderCell: (data) => (
        <OptionsInVersionsTable
          params={data}
          handleEditVersion={handleEditVersion}
          downloadTemplate={downloadTemplate}
        />
      ),
    },
  ]
}
