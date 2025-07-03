import { usePutTypeContracts } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

/**
 * Custom hook to handle form submission.
 *
 * This hook sets up a function that, when called with form data, will attempt to update a contract type.
 * If the update is successful, the user will be redirected to the contracts types page and a success message will be displayed.
 * If the update fails, an error message will be displayed.
 *
 * @param {string} idEdition - The ID of the contract type to update.
 * @returns {Object} The onSubmit function and the loading state.
 * @property {function} onSubmit - The function to call with the form data when the form is submitted.
 * @property {boolean} loadingPut - Whether the update request is currently pending.
 */

export const useHandleSubmit = (idEdition) => {
  const navigate = useNavigate()
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = userData?.companies[0]?.companyId
  const queryClient = useQueryClient()
  const { mutate: putVersionTemplate, isPending: loadingPut } = usePutTypeContracts({
    id: idEdition,
    onSuccess: () => {
      toast.success('Versión actualizada con éxito')
      queryClient.invalidateQueries([`/${idCompany}/tiposContrato`])
      navigate(`/applications/contractsTypes`)
    },
    onError: () => {
      toast.error('Error al actualizar la versión')
    },
  })

  const onSubmit = (data) => {
    if (idEdition) {
      putVersionTemplate(data)
      navigate(`/applications/contractsTypes`)
    }
  }

  return { onSubmit, loadingPut }
}
