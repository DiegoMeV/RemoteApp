// import { BasicDataModal } from '../components'

import { ClassicIconButton, formatToLocaleDateString } from '@/lib'
import { Visibility } from '@mui/icons-material'

export const columnsAlertManagementProcesses = ({ modalInfoAlert, setInfoRowSelected }) => {
  const modalAlert = (info) => {
    setInfoRowSelected(info)
    modalInfoAlert.handleShow()
  }
  const columns = [
    {
      field: 'dataTipoActuacion',
      headerName: 'Tipo de actuaciones',
      width: 250,
      valueGetter: (params) => `${params.row.dataTipoActuacion?.nombre ?? ''}`,
    },
    {
      field: 'dataDependencia',
      headerName: 'Dependencia',
      width: 250,
      valueGetter: (params) => `${params.row.dataDependencia?.name ?? ''}`,
    },
    {
      field: 'user',
      headerName: 'Usuario',
      width: 200,
      valueGetter: (params) =>
        `${`${params.row.dataUserAudita?.firstName ?? ''} ${
          params.row.dataUserAudita?.lastName ?? ''
        }`} `,
    },
    {
      field: 'fecha_acutacion',
      headerName: 'Fecha de actuación',
      width: 200,
      valueGetter: (params) => `${formatToLocaleDateString(params.row.fecha_audita) ?? ''}`,
    },
    {
      field: 'options',
      headerName: '',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      align: 'center',
      renderCell: (params) => {
        return (
          <ClassicIconButton
            title={'Ver datos del proceso'}
            onClick={() => modalAlert(params.row)}
          >
            <Visibility />
          </ClassicIconButton>
        )
      },
    },
  ]
  return columns
}
