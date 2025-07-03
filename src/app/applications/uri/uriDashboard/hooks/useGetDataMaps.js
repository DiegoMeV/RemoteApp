import { useQueryDynamicApi } from '@/lib'

const useGetDataMaps = ({ qryParams }) => {
  const { data: coorDepartamentos } = useQueryDynamicApi({
    baseKey: 'urlCgr',
    url: `/analytics/coordenadas/departamentosUri/?${qryParams}`,
    isCompanyRequest: true,
  })

  const { data: coorMunicipios } = useQueryDynamicApi({
    baseKey: 'urlCgr',
    url: `/analytics/coordenadas/municipiosUri/?${qryParams}`,
    isCompanyRequest: true,
  })

  return { coorDepartamentos, coorMunicipios }
}

export default useGetDataMaps
