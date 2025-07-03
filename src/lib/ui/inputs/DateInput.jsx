import { MagicString } from '@/lib/constants'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import dayjs from 'dayjs'

import { Controller } from 'react-hook-form'

const DateInput = ({ item, control }) => {
  return (
    <Controller
      name={item?.name}
      control={control}
      rules={{
        required: item?.required ? 'Este campo es requerido' : false,
        validate: item?.validate,
      }}
      render={({ field, fieldState: { error } }) => {
        const handleDateChange = (newValue) => {
          const formattedDate = dayjs(newValue).startOf('day')
          field.onChange(formattedDate)
          item?.onChange?.(formattedDate)
        }
        const newHelperText = error ? error?.message : item?.helperText ?? ''
        const newLabel = `${item?.label ?? ''} ${item?.required ? '*' : ''}`
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              {...item}
              minDate={item?.minDate ? dayjs(item.minDate) : null}
              maxDate={item?.maxDate ? dayjs(item.maxDate) : null}
              value={field?.value ? dayjs(field.value) : null}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  label: newLabel,
                  helperText: newHelperText,
                  error: !!error,
                  InputLabelProps: { shrink: true },
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'backgroundWhite1',
                },
              }}
              format={MagicString.DATE_FORMAT.DATE}
            />
          </LocalizationProvider>
        )
      }}
    />
  )
}

export default DateInput
