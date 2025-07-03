import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const TextfieldController = ({
  name,
  control,
  multiline,
  label,
  required,
  md,
  minRows,
  maxRows,
  style,
  type,
  currentValues,
  disabled,
  onBlur,
  helperText,
}) => {
  return (
    <Grid
      item
      xs={12}
      md={md ?? 12}
      sx={style}
    >
      <Controller
        name={name ?? ''}
        control={control}
        defaultValue={currentValues?.[name] ?? ''}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type={type ?? 'text'}
            label={label ?? ''}
            size={'small'}
            multiline={multiline ?? false}
            required={required ?? false}
            minRows={minRows}
            maxRows={maxRows}
            disabled={disabled ?? false}
            InputLabelProps={{ shrink: true }}
            inputProps={{ readOnly: disabled ?? false }}
            onBlur={(ev) => {
              if (onBlur) onBlur(ev)
            }}
            helperText={helperText ?? ''}
          />
        )}
      />
    </Grid>
  )
}

export default TextfieldController
