import { useGetAllParams } from '@/lib'
import { ViewFormPqrs } from '@/lib/components/FormPqrs'

const ReqPqrs = () => {
  const params = useGetAllParams()
  const idGroup = params?.idGroup ?? null
  const idProcess = params?.idProcess ?? null

  return (
    <ViewFormPqrs
      idGroup={idGroup}
      idProcess={idProcess}
    />
  )
}

export default ReqPqrs
