// WILL BE DEPRECATED IN THE FUTURE
import { Box, FormControlLabel, Switch } from '@mui/material'

const ElementSwitchButtons = ({ loadingElement, value, handleChange }) => {
  return (
    <Box display='flex'>
      <FormControlLabel
        required={false}
        control={
          <Switch
            disabled={loadingElement}
            name='isRequired'
            checked={value?.isRequired ?? false}
            onChange={handleChange}
          />
        }
        label='Obligatorio'
        sx={{ pointerEvents: '' }}
      />
      <FormControlLabel
        required={false}
        control={
          <Switch
            name='isEnabled'
            disabled={loadingElement}
            checked={value?.isEnabled ?? false}
            onChange={handleChange}
          />
        }
        label={value?.isEnabled ? 'Activo' : 'Inactivo'}
        sx={{ pointerEvents: '' }}
      />
    </Box>
  )
}

export default ElementSwitchButtons
