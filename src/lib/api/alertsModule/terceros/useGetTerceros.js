import { useQueryDynamicApi } from '../../useDynamicApi'

const useGetTerceros = ({ qry, ...props }) => {
  return useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/terceros${qry}`,
    ...props,
  })
}

export default useGetTerceros
