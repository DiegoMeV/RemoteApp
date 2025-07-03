import { useForm } from 'react-hook-form'
import { ViewBasicData } from './view'

const BasicData = () => {
  const form = useForm()
  return <ViewBasicData form={form} />
}

export default BasicData
