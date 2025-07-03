import { useQueryDynamicApi } from '@/lib'

export const useProvinceInfo = (additionalData) => {
  // province Info
  const residencialProvinceId = additionalData?.province
  const residencialProvince = useQueryDynamicApi({
    url: `/generic-crud/departamentos/${residencialProvinceId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })

  // bornProvince

  const bornProvinceId = additionalData?.bornProvince
  const bornProvince = useQueryDynamicApi({
    url: `/generic-crud/departamentos/${bornProvinceId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })

  // expeditionProvince

  const expeditionProvinceId = additionalData?.expeditionProvince
  const expeditionProvince = useQueryDynamicApi({
    url: `/generic-crud/departamentos/${expeditionProvinceId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })

  return {
    residencialProvince: residencialProvince?.data,
    bornProvince: bornProvince?.data,
    expeditionProvince: expeditionProvince?.data,
  }
}
