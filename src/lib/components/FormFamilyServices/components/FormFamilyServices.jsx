import { BasicTitle } from '@/lib'
import { Button, Grid } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { selectOptionsFamilyServices } from '../funcs'
import RenderOptions from './RenderOptions'
import { useEffect } from 'react'

const FormFamilyServices = ({
  processTypes,
  steps,
  step,
  form,
  formModal,
  openModal,
  handleNextActivity,
  handleBackActivity,
  idProcess,
  setRowParams,
  idProcessType,
  setValidationComplainant,
  processInfo,
}) => {
  const { dependencies } = useStoreState((state) => state.user.userData || [])

  useEffect(() => {
    if (dependencies?.length === 1) {
      form.setValue('office', dependencies?.[0])
    }
  }, [dependencies, form])

  const selectOptions = selectOptionsFamilyServices(
    dependencies,
    processTypes,
    idProcessType,
    idProcess
  )

  return (
    <Grid
      item
      container
      component='form'
      xs={12}
      md={9}
      spacing={1}
      alignContent='flex-start'
      onSubmit={handleNextActivity}
    >
      <Grid
        item
        xs={12}
      >
        <BasicTitle title={steps?.[step] ?? ''} />
      </Grid>

      <RenderOptions
        selectOptions={selectOptions}
        step={step}
        openModal={openModal}
        form={form}
        formModal={formModal}
        idProcess={idProcess}
        setRowParams={setRowParams}
        idProcessType={idProcessType}
        setValidationComplainant={setValidationComplainant}
        processInfo={processInfo}
      />

      <Grid
        item
        xs={12}
        display='flex'
        justifyContent='flex-end'
        columnGap={2}
      >
        <Button
          variant='contained'
          onClick={handleBackActivity}
          color='error'
        >
          {step === 0 ? 'Cancelar' : 'Atrás'}
        </Button>
        <Button
          variant='contained'
          type='submit'
        >
          {step === steps?.length - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default FormFamilyServices
