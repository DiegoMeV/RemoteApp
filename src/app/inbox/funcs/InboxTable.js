import { Tooltip, Typography } from '@mui/material'
import { CircleStatus, InboxinRowMenu } from '../components'
import { AccessTime } from '@mui/icons-material'
import { getValue } from '@/lib'

export const colorInfo = (status) => {
  if (status === 'CRITICAL') return '#f44336'
  else if (status === 'WARNING') return '#fdd835'
  else if (status === 'ON_TIME') return '#4caf50'
  else return ''
}

export const tooltipState = (remainingDays) => {
  const remainingDaysInt = Math.abs(parseInt(remainingDays))
  if (remainingDays > 0) return `${remainingDaysInt} días restantes`
  else if (remainingDays < 0) return `Atrasado ${remainingDaysInt} días`
  else return 'Sin datos de vencimiento'
}

// New feature to verify and format dates in ISO 8601 format
const formatDate = (valor) => {
  const regexISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/
  if (typeof valor === 'string' && regexISO8601.test(valor)) {
    const fecha = new Date(valor)
    return fecha.toLocaleString()
  }
  return valor // Returns the original value if it is not a date
}

export const renderCell = (params, source) => {
  const value = getValue(params, source)

  if (typeof value === 'object' && value) {
    const newString = value
      .map((item) => {
        return `${item?.documentType ?? ''} ${item?.documentId ?? ''} - ${item?.firstName ?? ''} ${
          item?.lastName ?? ''
        }`
      })
      .join('\n')
    return (
      <Typography
        component='div'
        style={{ whiteSpace: 'pre-line' }}
      >
        {newString}
      </Typography>
    )
  }
  const formattedValue = formatDate(value)

  return <Typography variant='body2'>{formattedValue ?? ''}</Typography>
}

export const stateColumn = {
  field: 'priority',
  headerName: 'Estado',
  source: 'priority',
  type: 'actions',
  pinned: 'left',
  resizable: false,
  width: 50,
  renderCell: (params) => {
    return (
      <CircleStatus
        status={params?.priority}
        remainingDays={params?.remainingDays}
      />
    )
  },
  renderHeader: () => (
    <Tooltip title='Tiempo restante'>
      <AccessTime />
    </Tooltip>
  ),
  sortable: false,
  disableColumnMenu: true,
  hideable: false,
}

export const optionsColumn = ({
  handleOpenModal,
  setIdProcess,
  setIdActivity,
  filingForm,
  setIdentifier,
}) => {
  return {
    field: 'options',
    headerName: '',
    pinned: 'right',
    width: 20,
    renderCell: (params) => {
      return (
        <InboxinRowMenu
          row={params || {}}
          handleOpenModal={handleOpenModal}
          setIdProcess={setIdProcess}
          setIdActivity={setIdActivity}
          filingForm={filingForm}
          setIdentifier={setIdentifier}
        />
      )
    },
  }
}

export const getColumns = (infoMenu) => {
  return infoMenu?.inboxProps?.columns?.map((column, index) => {
    return {
      headerName: column.title,
      field: `column-${index}`,
      renderCell: (params) => renderCell(params, column.source),
    }
  })
}

export const MWProcessModals = {
  HISTORICAL: 'historical',
  CURRENT_DOCS: 'currentDocs',
  BASIC_DATA: 'basicData',
  CHANGE_STATUS: 'changeStatus',
  ALERTS: 'alerts',
  EDIT_ACTIVITY: 'editActivity',
  DELETE_NOTIFICATION: 'deleteNotification',
}
