import { BackdropLoading, GenericForm } from '@/libV4'
import { inputsHeaderForm } from '../funcs'
import { ButtonsForm } from '.'
import { useFormPetitions, usePUMutations } from '../hooks'
import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

const FormPUAtoliq = ({
  form,
  nit_compania,
  navigate,
  setVLProps,
  setInfoDetail,
  getQueryResult,
  handleGetDetail,
  handleGenerateSequence,
  handleConfirmSave,
  handleCallOracleReport,
  secuence,
  isNew,
  isPayed,
  isExecuting,
  arePendingChanges,
}) => {
  const { periodGroup, sucursalInfo, operatorInfo } = useFormPetitions({
    nit_compania,
    getQueryResult,
  })

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const {
    downloadTxt,
    deletePlanilla,
    chargeAutoliq,
    handleGetJobStatus,
    jobStatusData,
    showJobStatus,
    setShowJobStatus,
    isLoading,
  } = usePUMutations({
    secuence,
    navigate,
    handleGetDetail,
    setInfoDetail,
  })
  const isSequenceMatchingJobStatus = secuence && secuence === jobStatusData?.identifier

  const handleChargeAutoliq = async () => {
    const body = {
      secuencia: form.getValues('secuencia'),
      grupop: form.getValues('grupop'),
      sucursal: form.getValues('codsucursal'),
      tipoAutoliq: form.getValues('tipoautoliq'),
      estado: form.getValues('estado'),
    }

    await chargeAutoliq({ body })
  }

  const handleConfirmCharge = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cargar autoliquidación',
      content: `¿Está seguro de cargar la autoliquidación para la secuencia: ${secuence}?`,
      onConfirm: () => handleChargeAutoliq(),
    })
  }

  const handleDownloadTxt = () => {
    const newData = {
      secuencia: form.getValues('secuencia'),
      tipoAutoliq: form.getValues('tipoautoliq'),
      grupop: form.getValues('grupop'),
    }
    downloadTxt({ body: newData })
  }

  const handleDeletePlanilla = async () => {
    const body = {
      estado: form.getValues('estado'),
      secuencia: form.getValues('secuencia'),
    }

    await deletePlanilla({ body })
  }

  const handleConfirmDelete = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar planilla',
      content: `¿Está seguro de eliminar la planilla: ${secuence}?`,
      onConfirm: () => handleDeletePlanilla(),
    })
  }

  const inputs = inputsHeaderForm({
    form,
    setVLProps,
    periodGroup,
    sucursalInfo,
    operatorInfo,
  })

  const handleValidateJobStatus = () => {
    if (secuence && secuence === jobStatusData?.identifier) {
      handleGetJobStatus()
    }
  }

  useEffect(() => {
    if (isNew) {
      handleGenerateSequence()
      return
    }
    if (isSequenceMatchingJobStatus) {
      handleValidateJobStatus()
      setShowJobStatus(true)
      handleGetDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form
      className='general_form_container formContainer'
      onSubmit={form.handleSubmit(handleConfirmSave)}
    >
      <BackdropLoading loading={isLoading || isExecuting} />
      <GenericForm
        inputs={inputs}
        control={form.control}
      />
      <ButtonsForm
        jobStatusData={jobStatusData}
        showJobStatus={showJobStatus}
        setShowJobStatus={setShowJobStatus}
        handleGetDetail={handleGetDetail}
        handleDownloadTxt={handleDownloadTxt}
        handleChargeAutoliq={handleConfirmCharge}
        handleDeletePlanilla={handleConfirmDelete}
        handleCallOracleReport={handleCallOracleReport}
        isSequenceMatchingJobStatus={isSequenceMatchingJobStatus}
        isNew={isNew}
        isPayed={isPayed}
        arePendingChanges={arePendingChanges}
      />
    </form>
  )
}

export default FormPUAtoliq
