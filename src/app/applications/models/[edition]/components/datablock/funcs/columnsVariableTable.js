import SwitchActiveVariables from '../SwitchActiveVariables'
import SwitchRequired from '../SwitchRequired'

export const columnsVariableTable = (idBlock, idEdition) => {
  const columns = [
    { field: 'titulo', headerName: 'Titulo', width: 200 },
    { field: 'tipo', headerName: 'Tipo', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 200 },
    {
      field: 'activo',
      headerName: 'Estado',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <SwitchActiveVariables
          {...params}
          idBlock={idBlock}
          idEdition={idEdition}
        />
      ),
    },
    {
      field: 'requerido',
      headerName: 'Requerido',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <SwitchRequired params={params} />
      },
    },
  ]
  return columns
}
