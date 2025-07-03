import { ClassicIconButton } from '@/lib'
import { Delete } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { ChooseInput } from './Inputs'
import { variablesInputs } from './objects'

const ProcessVariables = ({ ProcessTypesForm, variablesProcessType, deleteVariable }) => {
  return (
    <Grid
      container
      spacing={3}
      padding={2}
    >
      {variablesProcessType?.map((item) => {
        return (
          <Grid
            key={item.id}
            item
            container
            xs={12}
            spacing={1}
            justifyContent='space-between'
            alignItems='center'
          >
            {variablesInputs?.map((variables, index) => (
              <Grid
                key={index}
                item
                xs={variables.xs ?? 12}
                sm={variables.sm ?? 6}
                md={variables.md ?? 3}
              >
                <ChooseInput
                  item={{
                    name: `typeSpecs.additionalData[${item.id}][${variables.name}]`,
                    label: variables.label,
                    type: variables.type,
                    options: variables.options,
                    helperText: variables?.helperText,
                  }}
                  control={ProcessTypesForm.control}
                />
              </Grid>
            ))}

            <Grid
              item
              xs={1}
            >
              <ClassicIconButton
                color='secondary'
                hoverColor='red'
                onClick={() => deleteVariable(item.id)}
              >
                <Delete />
              </ClassicIconButton>
            </Grid>
          </Grid>
        )
      })}
      {variablesProcessType?.length === 0 ? (
        <Grid
          item
          xs={12}
        >
          <Typography variant='h6'>
            No existen variables para este tipo de proceso, puedes crearlas en el botón de agregar
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default ProcessVariables
