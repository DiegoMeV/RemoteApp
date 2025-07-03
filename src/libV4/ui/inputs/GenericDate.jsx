import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { forwardRef } from 'react'
import dayjs, { utc } from 'dayjs'
dayjs.extend(utc)

const GenericDate = forwardRef(function GenericDate(props, ref) {
  const useTimeZone = props?.useTimeZone ?? true

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        ref={ref}
        format={props?.format ?? 'DD/MM/YYYY'}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            helperText: props?.helperText,
            error: !!props?.error,
            ...props?.slotProps?.textField,
          },
        }}
        {...props}
        value={
          props?.value
            ? useTimeZone
              ? dayjs(props?.value) // Si useTimeZone es true, usa la lógica predeterminada
              : dayjs.utc(props?.value) // Si useTimeZone es false, usa UTC
            : null
        }
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'backgroundWhite1',
          },
          ...props?.sx,
        }}
      />
    </LocalizationProvider>
  )
})

GenericDate.displayName = 'GenericDate'

export default GenericDate
