import { MagicString, useManageActionItems } from '@/lib'
import toast from 'react-hot-toast'
import {
  onErrorCreateActionItemReq,
  onErrorDeleteActionItemReq,
  onErrorUpdateActionItemReq,
  updateActionItems,
} from '../funcs'

const useRequestActionItems = ({ setInfoToActionsItems, actionItems, setActionItems }) => {
  const { mutateAsync: deleteElement, isPending: loadingADelete } = useManageActionItems({
    onSuccess: (response) => {
      const newActionItems = updateActionItems(actionItems, response?.data)
      setActionItems(newActionItems ?? [])
    },
    onError: onErrorDeleteActionItemReq,
  })

  const { mutateAsync: postElement, isPending: loadingAPost } = useManageActionItems({
    onSuccess: (response) => {
      setInfoToActionsItems(response)
      toast.success(MagicString.CONSTRUCTOR.SUCCESS_MESSAGE_CREATE_ELEMENT)
    },
    onError: onErrorCreateActionItemReq,
  })

  const { mutateAsync: putElement, isPending: loadingAPut } = useManageActionItems({
    onSuccess: (response) => {
      setInfoToActionsItems(response)

      toast.success(MagicString.CONSTRUCTOR.SUCCESS_MESSAGE_UPDATE_ELEMENT)
    },
    onError: onErrorUpdateActionItemReq,
  })

  const funcsReq = {
    postElement,
    putElement,
    deleteElement,
  }
  const valReq = {
    loading: loadingAPut || loadingAPost || loadingADelete,
  }
  return [funcsReq, valReq]
}

export default useRequestActionItems
