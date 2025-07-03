import { List, ListItem, ListItemText, Typography } from '@mui/material'
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
  const value = getValue(params?.row, source)

  if (typeof value === 'object' && value) {
    return (
      <List>
        {value.map((item, index) => {
          return (
            <ListItem key={index}>
              <ListItemText
                primary={`${item?.documentType ?? ''} ${item?.documentId ?? ''} - ${
                  item?.firstName ?? ''
                } ${item?.lastName ?? ''}`}
              />
            </ListItem>
          )
        })}
      </List>
    )
  }
  const formattedValue = formatDate(value)

  return <Typography variant='body2'>{formattedValue ?? ''}</Typography>
}

export const getColumns = (infoMenu) => {
  return infoMenu?.inboxProps?.columns?.map((column, index) => {
    return {
      field: `column-${index}`,
      headerName: column.title,
      source: column.source,
      aggregable: false,
      renderCell: (params) => renderCell(params, column.source),
    }
  })
}

export const getRowHeight = (params) => {
  const data = params?.model || {}

  let someDataIsArray = []

  Object.keys?.(params?.model)?.forEach?.((key) => {
    const dataKey = data[key]
    if (Array.isArray(dataKey)) {
      someDataIsArray = dataKey
      return true
    }
    return false
  })

  if (someDataIsArray?.length > 1) {
    const someDataIsArrayLength = someDataIsArray?.length
    return someDataIsArrayLength * 50
  }

  return 50
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
