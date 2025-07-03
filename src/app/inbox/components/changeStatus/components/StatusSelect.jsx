import { Grid, MenuItem, TextField } from '@mui/material'

export const StatusSelect = ({ infoProcess, setValue, statusOptions }) => (
  <Grid
    item
    xs={3}
  >
    <TextField
      id='statusSelect-Process'
      fullWidth
      select
      label={'Cambiar estado a *'}
      variant='outlined'
      defaultValue={infoProcess?.status}
      onChange={(e) => setValue('statusSelectProcess', e.target.value)}
    >
      {statusOptions.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
)
