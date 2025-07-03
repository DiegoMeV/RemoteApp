import { useQueryDynamicApi } from '@/lib'

export const useCitiesInfo = (additionalData) => {
  // Residential City Info

  const residencialCityId = additionalData?.city
  const residencialCity = useQueryDynamicApi({
    url: `/generic-crud/municipios/${residencialCityId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })

  // Expedition City Info

  const expeditionCityId = additionalData?.expeditionCity
  const expeditionCity = useQueryDynamicApi({
    url: `/generic-crud/municipios/${expeditionCityId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })

  // Born City Info

  const bornCityId = additionalData?.bornCity
  const bornCity = useQueryDynamicApi({
    url: `/generic-crud/municipios/${bornCityId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })
  return {
    residencialCity: residencialCity?.data,
    expeditionCity: expeditionCity?.data,
    bornCity: bornCity?.data,
  }
}
