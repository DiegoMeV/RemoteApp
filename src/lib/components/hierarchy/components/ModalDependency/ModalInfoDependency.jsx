import { Box, Grid } from '@mui/material'
import { modalStyles } from '../../styles'
import { useStoreState } from 'easy-peasy'
import { AutocompleteDependencies } from '.'
import { BackdropLoading, CustomTextField, SwitchInput } from '@/lib'
import { useEffect } from 'react'

const ModalInfoDependency = ({
  dependency,
  control,
  setValue,
  required,
  isLoading,
  setIsActive,
}) => {
  const stages = useStoreState((actions) => actions.infoFlowState.infoFlow.stages)

  const allDependencies = stages ?? []

  const itemSelect = {
    name: 'isActive',
    label: 'Estado de la dependencia',
    required: required,
  }

  const inputs = [
    { name: 'identification', label: 'Identificación', required: true },
    { name: 'name', label: 'Nombre Dependencia', required: true },
    { name: 'TRDcode', label: 'Código TRD' },
  ]

  useEffect(() => {
    if (!dependency?.parentId) {
      setValue('parentId', 'origen')
      return
    }
  }, [dependency])

  return (
    <>
      {!setIsActive && (
        <Box
          width='100%'
          display='flex'
          justifyContent='flex-end'
        >
          <SwitchInput
            item={itemSelect}
            control={control}
          />
        </Box>
      )}
      <Grid
        container
        gap={3}
        sx={modalStyles.containerModalForm}
      >
        <BackdropLoading loading={isLoading} />
        {dependency?.parentId && (
          <AutocompleteDependencies
            control={control}
            setValue={setValue}
            allDependencies={allDependencies}
            dependency={dependency}
            required={required}
          />
        )}
        {inputs.map((item, index) => (
          <Grid
            item
            xs={12}
            key={index}
          >
            <CustomTextField
              item={item}
              control={control}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ModalInfoDependency
