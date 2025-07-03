import { useCreateTypeContracts, useEditTypeContracts } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useUpdateRequest = ({ idContractType, pathBack, handleClose }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const { mutateAsync: createTypeContract, isPending: loadingCreate } = useCreateTypeContracts({
    onSuccess: (response) => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/contractsTypes`])
      toast.success('Modalidad de contratación creada con éxito')
      if (pathBack) {
        navigate(pathBack)
      } else {
        navigate(`/applications/contractsTypes/${response?.data?.id}`)
      }
      if (handleClose) {
        handleClose()
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: editTypeContract, isPending: loadingEdit } = useEditTypeContracts({
    idContractType,
    onSuccess: () => {
      queryClient.invalidateQueries([`/${companyData?.companyId}/contractsTypes`])
      toast.success('Modalidad de contratación editada con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  return { createTypeContract, editTypeContract, loadingUpdate: loadingCreate || loadingEdit }
}

export const conditionalRequest = async (
  data,
  editTypeContract,
  createTypeContract,
  idContractType
) => {
  const adaptedData = {
    ...data,
    activo: data.activo ? 'S' : 'N',
  }
  if (idContractType === 'new') {
    await createTypeContract(adaptedData)
  } else {
    await editTypeContract(adaptedData)
  }
}
