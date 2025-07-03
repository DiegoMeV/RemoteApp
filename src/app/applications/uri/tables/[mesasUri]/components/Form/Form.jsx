import { useForm } from 'react-hook-form'
import { ViewForm } from './views'
import { useCreateMesasAri } from '@/lib'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { useRequiredInputs } from './hooks'

const Form = ({ activeStep, setActiveStep, dataEditTable, idTable }) => {
  const isTotallyApp = dataEditTable?.estado === 'APROBADO TOTAL'
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const [idMesa, setIdMesa] = useState('')
  const [requiredInput, setRequiredInput] = useState(false)
  const [errors, setErrors] = useState({})

  const companyid = companyData?.companyId || ''
  const {
    mutateAsync: createMesasAri,
    isPending,
    isError,
  } = useCreateMesasAri({
    onSuccess: async (data) => {
      await setIdMesa(data?.data?.id)
      queryClient.invalidateQueries([`/${companyid}/mesasAri`])
      toast.success('Formulario enviado con exito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
    id: dataEditTable && idTable ? `/${idTable}` : '',
    type: dataEditTable && idTable ? 'put' : 'post',
  })
  const form = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
  })

  const { setValue, watch } = form

  const { requiredInputsStep0, requiredInputsStep1, requiredInputsStep2 } = useRequiredInputs({
    form,
  })
  const requiredInputs = [requiredInputsStep0, requiredInputsStep1, requiredInputsStep2]

  const changeStep = (step) => {
    const currentInputs = requiredInputs[activeStep]

    if (!currentInputs) {
      console.error('No inputs found for the current step.')
      return
    }

    if (step < activeStep) {
      setActiveStep(step)
      return
    }

    const isEmpty = (value) => {
      if (typeof value === 'string') return value.trim() === ''
      if (typeof value === 'number') return false
      return !value
    }

    const hasEmptyFields = Object.values(currentInputs).some(isEmpty)

    if (hasEmptyFields) {
      setRequiredInput(true)
      setErrors(
        Object.keys(currentInputs).reduce(
          (acc, key) => ({
            ...acc,
            [key]: isEmpty(currentInputs[key]),
          }),
          {}
        )
      )
      return
    }

    setRequiredInput(false)
    setErrors({})
    setActiveStep(step)
  }

  useEffect(() => {
    if (Boolean(idTable) && dataEditTable !== undefined) {
      Object.entries(dataEditTable).forEach(([key, value]) => {
        form.setValue(key, value)
      })
    }
  }, [idTable, dataEditTable, form])

  const onSubmit = async (data) => {
    try {
      await createMesasAri({ ...data, id_registro_ari: data?.id_registro_ari?.id })
    } catch (error) {
      console.error(`An error has occurred: ${error.message}`)
    }
  }

  return (
    <ViewForm
      form={form}
      onSubmit={onSubmit}
      activeStep={activeStep}
      changeStep={changeStep}
      isPending={isPending}
      idTable={idTable}
      idMesa={idMesa}
      requiredInput={requiredInput}
      requiredInputs={requiredInputs}
      errors={errors}
      isError={isError}
      setValue={setValue}
      watch={watch}
      isTotallyApp={isTotallyApp}
    />
  )
}

export default Form
