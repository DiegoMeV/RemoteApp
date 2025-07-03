import { useMutationDynamicBaseUrl } from '../../useDynamicApi'

const useEditProcess = ({ qry, ...props }) => {
  return useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/processes/${qry ?? ''}`,
    method: 'put',
    ...props,
  })
}

export default useEditProcess
