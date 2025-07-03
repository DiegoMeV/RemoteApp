import { MagicString } from '@/lib'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { forwardRef } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/es'

dayjs.extend(utc)
dayjs.locale('es')

const DatePickerDynamic = forwardRef(function DatePickerDynamic(
  { value, onChange, error, helperText, format, ...props },
  ref
) {
  const cleanedFormat = format?.trim()
  const dateFormat = cleanedFormat || MagicString.DATE_FORMAT.ORACLE_FORMAT

  const handleDateChange = (newValue) => {
    const formattedDate = dayjs.utc(newValue).startOf('day').format(dateFormat)
    onChange(formattedDate)
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale='es'
    >
      <DateTimePicker
        {...props}
        ref={ref}
        value={value ? dayjs.utc(value).startOf('day') : null}
        onChange={handleDateChange}
        format={dateFormat}
        ampm={false}
        slotProps={{
          textField: {
            InputLabelProps: { shrink: true },
            fullWidth: true,
            error: !!error,
            size: 'small',
            helperText: error ? helperText : null,
          },
        }}
      />
    </LocalizationProvider>
  )
})

export default DatePickerDynamic
