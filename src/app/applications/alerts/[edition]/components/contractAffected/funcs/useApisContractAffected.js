import {
  useCreateContractAffected,
  useGetContractAffected,
  useListContractsInfo,
  useUpdateContractAffected,
} from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

export const useApisContractAffected = (
  setNewRow,
  contractAffectedAccState,
  idAlert,
  setValue,
  watch,
  param
) => {
  const clearBackPathUrl = useStoreActions((actions) => actions.backPathUrl.clearBackPathUrl)
  const queryClient = useQueryClient()
  const {
    data: contractsAffected,
    isFetching: loadingRows,
    isError: errorRowsContractsAffected,
    isRefetching: refetchingLoading,
  } = useGetContractAffected({ idAlert, enabled: contractAffectedAccState })
  const { mutateAsync: updateContract, isPending: loadingUpdateContract } =
    useUpdateContractAffected({
      onSuccess: () => {
        queryClient.invalidateQueries([`/contratosAlerta`])
        queryClient.invalidateQueries([`/alertas/${idAlert}`])
        toast.success('Contrato actualizado correctamente')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al actualizar el contrato')
      },
    })
  const {
    data: contracts,
    isFetching: loadingContracts,
    isError: errorContracts,
  } = useListContractsInfo({
    enabled: contractAffectedAccState,
    param,
  })
  const { mutateAsync: addContractAffected, isPending: loadingCreateContractAffected } =
    useCreateContractAffected({
      onSuccess: () => {
        queryClient.invalidateQueries([`/contratosAlerta`])
        queryClient.invalidateQueries([`/alertas/${idAlert}`])
        toast.success('Contrato asociado a la alerta')
        clearBackPathUrl()
        setNewRow?.(false)
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al asociar el contrato')
      },
    })
  const loadingUpdates = loadingUpdateContract || loadingCreateContractAffected
  return {
    contractsAffected,
    loadingRows: refetchingLoading || loadingRows,
    errorRowsContractsAffected,
    updateContract,
    contracts,
    loadingContracts,
    errorContracts,
    addContractAffected,
    loadingUpdates,
  }
}
