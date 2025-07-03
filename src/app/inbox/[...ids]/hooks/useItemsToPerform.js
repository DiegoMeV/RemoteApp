import { useMutationDynamicBaseUrl } from '@/libV4'

const useItemsToPerform = ({ idProcess, idActivity, idAction, ...props }) => {
  const { mutateAsync: performAction, isPending: updatingItemAction } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${idAction}`,
    method: 'get',
    ...props,
  })
  return { performAction, updatingItemAction }
}

export default useItemsToPerform
