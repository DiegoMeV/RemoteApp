import { basciData } from '../../../../const'
import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsRowFour = ({ form, handleChangeNumber }) => {
  return (
    <>
      {basciData.rowFour.map((input) => (
        <Grid
          item
          xs={12}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <>
                {(input.type === 'text' || input.type === 'number') && (
                  <TextField
                    {...field}
                    label={input.label}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type={input.type}
                    onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                    size='small'
                    variant='outlined'
                    fullWidth
                    sx={{ backgroundColor: 'backgroundWhite1' }}
                  />
                )}
              </>
            )}
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowFour
