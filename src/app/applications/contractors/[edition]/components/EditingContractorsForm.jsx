import { useState } from 'react'
import { sxContainer } from '@/app/applications/styles'
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import { useHandleSubmit } from '../hooks'
import { BackdropLoading, ChooseInput } from '@/lib'
import ButtonsFormContracts from './ButtonsFormContracts'
import { adaptDefaultValues, getInputsVariablesToShow, inputsVariables } from '../funcs'
import { Controller, useForm } from 'react-hook-form'
import { identificationTypesSelect } from '../../constants'

const EditingContractorsForm = ({ idEdition, infoEditing, pathBack, handleClose }) => {
  const defaultValues = adaptDefaultValues(infoEditing)
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: defaultValues,
  })
  const { onSubmit, loadingAction } = useHandleSubmit(idEdition, pathBack, handleClose)
  const [tipoIdentificacion, setTipoIdentificacion] = useState(
    infoEditing?.data?.[0]?.tipo_identificacion || 'CC'
  )

  const inputs = inputsVariables()

  const inputsVariablesToShow = getInputsVariablesToShow(tipoIdentificacion, inputs)

  return (
    <Box
      component='form'
      sx={sxContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      {loadingAction && <BackdropLoading />}
      <Grid
        container
        spacing={3}
        width={'100%'}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          <Controller
            name='tipo_identificacion'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={tipoIdentificacion}
                label='Tipo de identificación'
                fullWidth
                required={true}
                size='small'
                select
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: 'backgroundWhite1' }}
                onChange={(e) => {
                  field.onChange(e)
                  setTipoIdentificacion(e.target.value)
                }}
              >
                {identificationTypesSelect.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        {inputsVariablesToShow.map((input, index) => {
          return (
            <ChooseInput
              key={index}
              control={control}
              item={input}
              setValue={setValue}
            />
          )
        })}
      </Grid>
      <ButtonsFormContracts
        pathBack={pathBack}
        handleClose={handleClose}
      />
    </Box>
  )
}

export default EditingContractorsForm
