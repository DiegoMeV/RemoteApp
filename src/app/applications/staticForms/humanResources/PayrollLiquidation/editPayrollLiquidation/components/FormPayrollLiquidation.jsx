import { GenericForm } from '@/libV4'
import { inputsHeaderForm } from '../funcs'
import { ButtonsForm } from '.'
import { useFormPetitions } from '../hooks'
import { useEffect } from 'react'

const FormPayrollLiquidation = ({
  form,
  isNew,
  isLiquidated,
  identifier,
  nit_compania,
  division,
  jobStatusData,
  getQueryResult,
  chargeEmployees,
  handleGetDetail,
  handleSave,
  handleGetJobStatus,
  handleCallOracleReport,
  confirmDelete,
  showJobStatus,
  setShowJobStatus,
  setVLProps,
  setConfirmAlertProps,
  arePendingChanges,
  procesessModal,
  dataPayrollProcesses,
}) => {
  const { periodInfo, vinculationInfo } = useFormPetitions({
    nit_compania,
    getQueryResult,
  })

  const liquidarSoloMarcados = form.watch('solo_marcados')
  const liquidarTodos = liquidarSoloMarcados === 'N' ? 'S' : 'N'
  const isIdMatchingJobStatus = identifier && identifier === jobStatusData?.identifier

  const handleChargeEmployees = async () => {
    const body = {
      periodo: form.getValues('periodo')?.periodo,
      nomina: form.getValues('nomina'),
      vinculacion: form.getValues('vinculacion')?.vinculacion,
      fechaInicio: form.getValues('fechaInicio'),
      fechaFin: form.getValues('fechaFin'),
      dias: form.getValues('dias'),
      cargarTodos: liquidarTodos,
    }

    await chargeEmployees({ body })
  }

  const handleConfirmChargeEmployees = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cargar empleados',
      content: `¿Está seguro de cargar empleados para la nómina ${form.getValues('nomina')}?`,
      onConfirm: () => handleChargeEmployees(),
    })
  }

  const handleValidateJobStatus = () => {
    if (identifier && identifier === jobStatusData?.payrollLiquidation?.identifier) {
      handleGetJobStatus()
    }
  }
  const isRetroactive = form.watch('retroactivo') === 'S'

  const inputs = inputsHeaderForm({
    form,
    division,
    setVLProps,
    periodInfo,
    vinculationInfo,
    isRetroactive,
  })

  useEffect(() => {
    if (isIdMatchingJobStatus) {
      handleValidateJobStatus()
      setShowJobStatus(true)
      handleGetDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form
      className='general_form_container formContainer'
      onSubmit={form.handleSubmit(handleSave)}
    >
      <GenericForm
        inputs={inputs}
        control={form.control}
      />
      <ButtonsForm
        jobStatusData={jobStatusData}
        showJobStatus={showJobStatus}
        setShowJobStatus={setShowJobStatus}
        handleChargeEmployees={handleConfirmChargeEmployees}
        handleCallOracleReport={handleCallOracleReport}
        confirmDelete={confirmDelete}
        isIdMatchingJobStatus={isIdMatchingJobStatus}
        isNew={isNew}
        isLiquidated={isLiquidated}
        arePendingChanges={arePendingChanges}
        procesessModal={procesessModal}
        dataPayrollProcesses={dataPayrollProcesses}
      />
    </form>
  )
}

export default FormPayrollLiquidation
