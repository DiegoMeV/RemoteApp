import { useForm } from 'react-hook-form'
import { ViewForm } from './views'
import { useCreateCopromisos } from '@/lib'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Form = ({ activeStep, setActiveStep, dataEditCompromisee, idCompromise }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyid = companyData?.companyId || ''
  const { mutateAsync: createMesasAri, isPending } = useCreateCopromisos({
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyid}/compromisosAri`])
      toast.success('Formulario enviado con exito')
      navigate('/applications/uri/compromise')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
    id: dataEditCompromisee ? `/${idCompromise}` : '',
    type: dataEditCompromisee ? 'put' : 'post',
  })
  const form = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
  })

  useEffect(() => {
    if (Boolean(idCompromise) && dataEditCompromisee !== undefined) {
      Object.entries(dataEditCompromisee).forEach(([key, value]) => {
        form.setValue(key, value)
      })
    }
  }, [idCompromise, dataEditCompromisee, form])

  const onSubmit = async (data) => {
    try {
      createMesasAri(data)
    } catch (error) {
      console.error(`An error has occurred: ${error.message}`)
    }
  }

  return (
    <ViewForm
      form={form}
      onSubmit={onSubmit}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      isPending={isPending}
    />
  )
}

export default Form
