import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { ViewForm } from './views'
import { useCreateAri } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = ({ activeStep, setActiveStep, dataEditRegistry, idRegistry }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [requiredInput, setRequiredInput] = useState(false)
  const companyData = useStoreState((state) => state.company.companyData)
  const companyid = companyData?.companyId || ''
  const { mutateAsync: createAri, isPending } = useCreateAri({
    onSuccess: (response) => {
      if (!dataEditRegistry) {
        navigate(`/applications/uri/registryUri?idRecord=${response?.data?.id}`)
        setTimeout(() => {
          setActiveStep(3)
        }, 1000)
      }
      queryClient.invalidateQueries([`/${companyid}/registroAri`])
      toast.success('Formulario enviado con exito')
      setActiveStep(3)
      form.setValue('id_registro_ari', response?.data?.id)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
    id: dataEditRegistry ? `/${idRegistry}` : '',
    type: dataEditRegistry ? 'put' : 'post',
  })
  const form = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
  })

  useEffect(() => {
    if (Boolean(idRegistry) && dataEditRegistry !== undefined) {
      Object.entries(dataEditRegistry).forEach(([key, value]) => {
        form.setValue(key, value)
      })
      form.setValue('id_registro_ari', idRegistry)
    }
  }, [idRegistry, dataEditRegistry, form])

  const aperturaActuacion = form.watch('sigedoc_inclusion')
  const fechaAperturaActuacion = form.watch('fecha_inicial_apertura_actuacion')

  const changeStep = (step) => {
    if (activeStep === 0) {
      if (
        aperturaActuacion === undefined ||
        aperturaActuacion === '' ||
        fechaAperturaActuacion === undefined ||
        fechaAperturaActuacion === ''
      ) {
        setRequiredInput(true)
        return
      }
      setRequiredInput(false)
    }
    setActiveStep(step)
  }

  useEffect(() => {
    if (aperturaActuacion !== undefined) {
      setRequiredInput(false)
    }
  }, [aperturaActuacion, setRequiredInput])

  const onSubmit = async (data) => {
    data = {
      ...data,
      intervencion_funcional_oficio: data.intervencion_funcional_oficio === 'SI' ? true : false,
    }
    if (activeStep === 2) {
      try {
        await createAri(data)
      } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
      }
      return
    }
    if (activeStep === 3) {
      navigate('/applications/uri/records')
    }
  }

  return (
    <ViewForm
      form={form}
      onSubmit={onSubmit}
      activeStep={activeStep}
      isPending={isPending}
      changeStep={changeStep}
      requiredInput={requiredInput}
    />
  )
}

export default Form
