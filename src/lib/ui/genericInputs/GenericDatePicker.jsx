import { MagicString } from '@/lib/constants'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import dayjs from 'dayjs'

const GenericDatePicker = ({ ...props }) => {
  const { datePickerProps, textFieldProps, ...rest } = props
  const value = rest?.value ? dayjs(rest?.value) : null
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...rest}
        {...datePickerProps}
        value={value}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            InputLabelProps: {
              shrink: true,
            },
            ...textFieldProps,
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'backgroundWhite1',
          },
          ...datePickerProps?.sx,
        }}
        format={datePickerProps?.dateFormat ?? MagicString.DATE_FORMAT.DATE}
      />
    </LocalizationProvider>
  )
}

export default GenericDatePicker
