import { BasicDataInbox, ChooseInput, useGetActorsFamilyServices } from '@/lib'
import TableComplainantOrAccused from './TableComplainantOrAccused'
import { Grid } from '@mui/material'
import FormStepFive from './FormStepFive'

const RenderOptions = ({
  selectOptions,
  step,
  openModal,
  form,
  formModal,
  idProcess,
  setRowParams,
  setValidationComplainant,
  processInfo,
}) => {
  const {
    complainants,
    loadingComplainants,
    errorComplainants,
    accuseds,
    loadingAccuseds,
    errorAccuseds,
  } = useGetActorsFamilyServices(idProcess)

  const options = [
    <>
      {selectOptions[step]?.map((item, index) => (
        <ChooseInput
          key={index}
          item={item}
          control={form.control}
          setValue={form.setValue}
        />
      ))}
    </>,
    <>
      {selectOptions[step]?.map((item, index) => (
        <ChooseInput
          key={index}
          item={item}
          control={form.control}
          setValue={form.setValue}
        />
      ))}
    </>,
    <TableComplainantOrAccused
      actors={complainants}
      loadingActors={loadingComplainants}
      errorActors={errorComplainants}
      step={step}
      key={step}
      type='DENUNCIANTE'
      openModal={openModal}
      formModal={formModal}
      setRowParams={setRowParams}
      setValidationComplainant={setValidationComplainant}
    />,
    <TableComplainantOrAccused
      actors={accuseds}
      loadingActors={loadingAccuseds}
      errorActors={errorAccuseds}
      step={step}
      key={step}
      type='DENUNCIADO'
      openModal={openModal}
      formModal={formModal}
      setRowParams={setRowParams}
    />,
    <FormStepFive
      key={step}
      form={form}
      processInfo={processInfo}
    />,

    <BasicDataInbox
      idProcess={idProcess}
      key={step}
    />,
  ]
  return (
    <Grid
      item
      container
      xs={12}
      spacing={step !== 5 ? 2 : 0}
      maxHeight='calc(100vh - 350px)'
    >
      {options?.[step] ?? null}
    </Grid>
  )
}

export default RenderOptions
