import { Cancel, CheckCircle, Sync } from '@mui/icons-material'

export const statusMessageIcons = {
  Success: CheckCircle,
  Fail: Cancel,
  EJECUTANDO: Sync,
}

export const statusMessageTitles = {
  Success: '¡Exitoso!',
  Fail: '¡Error!',
  EJECUTANDO: 'Ejecutando',
}

export const statusMessageColors = {
  Success: '#EDF7EE',
  Fail: '#FFEAEA',
  EJECUTANDO: '#DDEFFF',
}
