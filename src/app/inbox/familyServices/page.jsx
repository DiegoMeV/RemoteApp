import { useGetAllParams } from '@/lib'
import { ViewFamilyServices } from '@/lib/components/FormFamilyServices/views'

const FamilyServices = () => {
  const params = useGetAllParams()
  return (
    <ViewFamilyServices
      idGroup={params?.idGroup ?? null}
      idProcessParam={params?.idProcess ?? null}
      idProcessType={params?.idProcessType ?? null}
      idProcessParent={params?.idProcessParent ?? null}
      edition={params?.edition ? Boolean(params?.edition) : false}
      isSubProcess={params?.isSubProcess ? Boolean(params?.isSubProcess) : false}
    />
  )
}
export default FamilyServices
