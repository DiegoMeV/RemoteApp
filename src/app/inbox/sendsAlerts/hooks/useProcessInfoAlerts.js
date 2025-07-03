import { useMutationOnlyBodyParams } from '@/lib'
import { useEffect } from 'react'

const useProcessInfoAlerts = ({ form, processInfo, setIdOffice = () => {} }) => {
  const { mutateAsync: dynamicRequest } = useMutationOnlyBodyParams({})
  useEffect(() => {
    if (processInfo) {
      const processInfoData = processInfo?.data?.[0]
      setIdOffice(processInfoData?.originOfficeData?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processInfo])

  useEffect(() => {
    if (processInfo) {
      const processInfoData = processInfo?.data?.[0]
      form.setValue('office', processInfoData?.originOfficeData)
      form.setValue('typeProcess', processInfoData?.ProcessType)
      form.setValue('additionalData.month', processInfoData?.processData?.additionalData?.month)

      dynamicRequest({
        isCompanyRequest: true,
        baseKey: 'urlUsers',
        url: `/hierarchy/${processInfoData?.processData?.additionalData?.officeDestination}`,
        methodBody: 'get',
        onSuccess: (response) => {
          const data = response?.data
          form.setValue('additionalData.officeDestination', data)
        },
      })
      dynamicRequest({
        isCompanyRequest: true,
        baseKey: 'urlCgr',
        url: `/modelosAlertas/${processInfoData?.processData?.additionalData?.modelFilter}`,
        methodBody: 'get',
        onSuccess: (response) => {
          const data = response?.data?.[0]
          form.setValue('additionalData.modelFilter', data)
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, processInfo])
}

export default useProcessInfoAlerts
