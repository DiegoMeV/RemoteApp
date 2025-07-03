import ViewVariablesContract from './ViewVariablesContract'
import { useEffect } from 'react'

const VariablesContract = ({
  variablesContract,
  openAccordion,
  handleOpenAccordion,
  control,
  setValue,
}) => {
  const changeVariableInfo = (valor, id, datos_contrato_id) => {
    setValue(`variables.${id}`, { id, valor, datos_contrato_id })
  }

  useEffect(() => {
    const setValues = () => {
      const valores = {}
      variablesContract?.data.forEach((variable) => {
        if (
          variable.tipo === 'boolean' &&
          (variable.valor === null || variable.valor === undefined)
        ) {
          setValue(`variables.${variable.variable_id}`, {
            id: variable.variable_id,
            valor: false,
            datos_contrato_id: null,
          })
          valores[variable.variable_id] = false
        } else {
          valores[variable.variable_id] = variable.valor
        }
      })

      setValue('variablesContrato', valores)
    }
    setValues()
  }, [setValue, variablesContract?.data])

  const transformVars = variablesContract?.data?.map((variable) => ({
    id: variable.variable_id,
    name: `variablesContrato.${variable.variable_id}`,
    label: '',
    title: variable.titulo,
    required: variable.requerido,
    space: 12,
    type: variable.tipo === 'boolean' ? 'switch' : variable.tipo,
    description: variable.descripcion,
    onChange: (value) =>
      changeVariableInfo(value, variable.variable_id, variable.datos_contrato_id),
    options:
      variable.tipo === 'select'
        ? variable.dominio.split(',').map((option) => ({
            value: option.trim(),
            label: option.trim(),
          }))
        : [],
  }))

  return (
    <ViewVariablesContract
      transformVars={transformVars}
      openAccordion={openAccordion}
      handleOpenAccordion={handleOpenAccordion}
      control={control}
      setValue={setValue}
    />
  )
}

export default VariablesContract
