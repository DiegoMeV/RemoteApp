import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { forwardRef } from 'react'
import dayjs from 'dayjs'

const GenericDateTime = forwardRef(function GenericDateTime(props, ref) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        ref={ref}
        format='DD/MM/YYYY:hh:mm A'
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            ...props?.slotProps?.textField,
          },
        }}
        {...props}
        value={props?.value ? dayjs(props?.value) : null}
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

GenericDateTime.displayName = 'GenericDateTime'

export default GenericDateTime
