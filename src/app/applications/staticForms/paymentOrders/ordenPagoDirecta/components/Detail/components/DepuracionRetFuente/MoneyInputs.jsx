import { GenericMoney } from '@/lib'
import { Grid, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

const MoneyInputs = ({ control, item }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={7}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='body1'
          color={item?.disabled ? 'secondary' : ''}
        >
          {item?.label ?? ''}
        </Typography>
      </Grid>
      <Grid
        item
        xs={5}
      >
        <Controller
          name={item?.name}
          control={control}
          rules={{
            required: item?.required ? 'Este campo es requerido' : false,
            validate: item?.validate ?? null,
          }}
          defaultValue={item?.defaultValue ?? ''}
          render={({ field, fieldState: { error } }) => {
            const helperText = error
              ? error.message
              : item.helperText ?? item?.textFieldProps?.helperText ?? ''

            return (
              <GenericMoney
                {...field}
                {...item}
                InputProps={{
                  style: {
                    textAlign: 'right',
                  },
                }}
                error={!!error}
                label=''
                helperText={helperText}
              />
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default MoneyInputs
