import { useQueryDynamicApi } from '@/lib'

export const useAcademyInfo = (additionalData) => {
  // School Info
  const schoolId = additionalData?.school
  const school = useQueryDynamicApi({
    url: `/generic-crud/instituciones_educativas/${schoolId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })

  // career Info
  const careerId = additionalData?.career
  const career = useQueryDynamicApi({
    url: `/generic-crud/titulos_educativos/${careerId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })
  // City Offer Info
  const cityOfferId = career?.data?.data?.[0]?.municipio
  const cityOffer = useQueryDynamicApi({
    url: `/generic-crud/municipios/${cityOfferId}`,
    baseKey: 'urlApps',
    isCompanyRequest: true,
  })
  return {
    school: school?.data,
    career: career?.data,
    cityOffer: cityOffer?.data,
  }
}
