import { Box, Divider, Grid } from '@mui/material'
import HeaderBlockVars from './HeaderBlockVars'
import VariableBox from './VariableBox'
import { ChooseInput, CustomAccordion } from '@/lib'

const VariablesByBlock = ({ blockInfo, control, setValue, isView }) => {
  const tansformVars = blockInfo?.variables?.map((variable) => ({
    name: `variables.${variable.variable_id}.value`,
    label: variable.variable_titulo,
    required: variable.variable_modelo_requerido,
    space: 12,
    type: variable.variable_tipo === 'boolean' ? 'switch' : variable.variable_tipo,
    description: variable.variable_descripcion,
    disabled: isView,
    options:
      variable.variable_tipo === 'select'
        ? variable.variable_dominio.split(',').map((option) => ({
            value: option.trim(),
            label: option.trim(),
          }))
        : [],
  }))

  return (
    <CustomAccordion
      defaultExpanded={false}
      title={blockInfo?.bloques_datos_nombre}
      color='primary'
    >
      <Box
        sx={{ p: 2 }}
        bgcolor={'backgroundWhite1'}
        borderRadius={2}
      >
        <HeaderBlockVars />
        <Divider />
        {tansformVars?.map((variable, index) => (
          <Grid
            key={index}
            container
            py={1}
          >
            <VariableBox>{variable.label}</VariableBox>
            <Divider
              orientation='vertical'
              flexItem
            />
            <VariableBox>{variable.description}</VariableBox>
            <Divider
              orientation='vertical'
              flexItem
            />
            <VariableBox>
              <ChooseInput
                setValue={setValue}
                item={variable}
                control={control}
              />
            </VariableBox>
          </Grid>
        ))}
      </Box>
    </CustomAccordion>
  )
}

export default VariablesByBlock
