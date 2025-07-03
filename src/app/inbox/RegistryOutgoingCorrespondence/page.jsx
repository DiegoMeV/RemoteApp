import { BackdropLoading, ConfirmProcess, useGetAllParams, ViewGenericRegistry } from '@/lib'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useApis, useOnSubmit } from './funcs'
import { ViewStep0, ViewStep1, ViewStep2 } from './components'

const RegistryOutgoingCorrespondence = () => {
  const params = useGetAllParams()
  const idGroup = params?.idGroup ?? null
  const idProcess = params?.idProcess ?? null
  const idProcessParent = params?.idProcessParent ?? null
  const [activeStep, setActiveStep] = useState(idProcess ? 1 : 0)
  const [confirmModalProcess, setConfirmModalProcess] = useState(false)
  const form = useForm()

  const { createProcess, editProcess, finallyProcess, processInfo, sticker, loadingProcess } =
    useApis({
      setActiveStep,
      activeStep,
      idProcess,
      setConfirmModalProcess,
    })

  useEffect(() => {
    if (processInfo) {
      Object.entries(processInfo?.data?.[0]?.processData?.additionalData || {}).forEach(
        ([key, value]) => {
          form.setValue(key, value)
        }
      )
      form.setValue('registryNumber', processInfo?.data?.[0]?.identifier)
      form.setValue('RegistryDate', processInfo?.data?.[0]?.createdAt)
    }
  }, [form, processInfo])

  const onSubmit = useOnSubmit({
    activeStep,
    setActiveStep,
    idProcess,
    createProcess,
    editProcess,
    finallyProcess,
    idProcessParent,
  })
  const props = {
    activeStep,
    form,
    onSubmit,
    idGroup,
    title: 'Correspondencia saliente',
    stepsLabels: ['Datos básicos', 'Remitente(s)', 'Destinatario(s)'],
    setActiveStep,
    finalStep: 2,
  }

  return (
    <ViewGenericRegistry {...props}>
      <BackdropLoading loading={loadingProcess} />
      {activeStep === 0 ? (
        <ViewStep0
          idGroup={idGroup}
          form={form}
        />
      ) : null}
      {activeStep === 1 ? (
        <ViewStep1
          idProcess={idProcess}
          form={form}
        />
      ) : null}
      {activeStep === 2 ? (
        <ViewStep2
          form={form}
          idProcess={idProcess}
        />
      ) : null}
      {confirmModalProcess ? (
        <ConfirmProcess
          infoProcess={processInfo}
          sticker={sticker}
        />
      ) : null}
    </ViewGenericRegistry>
  )
}

export default RegistryOutgoingCorrespondence
