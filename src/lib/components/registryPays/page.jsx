import { useForm } from 'react-hook-form'
import ViewRegistryPays from './ViewRegistryPays'
import { useState } from 'react'
import { useGetAllParams } from '@/lib'

const RegistryPays = () => {
  const params = useGetAllParams()
  const idGroup = params?.idGroup ?? null
  const form = useForm()
  const [activeStep, setActiveStep] = useState(0)
  const onSubmit = () => {
    setActiveStep(activeStep + 1)
  }
  const props = {
    activeStep,
    form,
    onSubmit,
    idGroup,
  }
  return <ViewRegistryPays {...props} />
}

export default RegistryPays
