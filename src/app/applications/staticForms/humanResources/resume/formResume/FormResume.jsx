import { useForm } from 'react-hook-form'
import { ViewFormResume } from './views'
import { useGlobalVaribles } from '@/lib'

const FormResume = () => {
  const form = useForm()
  const getGlobalVariables = useGlobalVaribles()
  const { division } = getGlobalVariables({})
  return (
    <ViewFormResume
      form={form}
      division={division}
    />
  )
}

export default FormResume
