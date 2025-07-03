import { useMutationDynamicBaseUrl } from '../useDynamicApi'

const useMutateProcess = ({ qry, ...props }) => {
  return useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/processes${qry ?? ''}`,
    ...props,
  })
}

export default useMutateProcess
