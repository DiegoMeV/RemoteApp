import { useMutationDynamicBaseUrl } from '@/lib'
const useProcessInfoRegionesContrato = ({ contractsAffected, setRegionAffectedAccState }) => {
  const {
    mutateAsync: searchRegionContract,
    isPending: loadingSearchRegion,
    isError: errorRegion,
  } = useMutationDynamicBaseUrl({
    baseKey: 'urlCgr',
    url: '/regionesContrato?aumentarInfo=true&esBorrado=false',
    method: 'get',
    isCompanyRequest: true,
    onSuccess: (e) => {
      // processInfoRegionesContrato(e, contractsAffected, setRegionAffectedAccState)
      setRegionAffectedAccState((prev) => {
        // Convert the previous array to an object to search for existing elements by ID
        const prevMap = prev.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {})

        // Process `e.data` elements and update the search object
        e.data.forEach((item) => {
          const newItem = {
            departamento: item.departamentoInfo?.nombre,
            municipio: item.municipioInfo?.nombre,
            region: item.departamentoInfo?.regionInfo?.nombre,
            satelite: item.departamentoInfo?.sateliteInfo?.nombre,
            id: item.id,
            identifier_contrato: contractsAffected?.data?.find(
              (contract) => contract.contrato_id === item.contrato_id
            )?.contratoInfo?.identificador,
          }

          // If the element exists and is different, overwrite; if not, add the new one.
          if (!prevMap[item.id] || JSON.stringify(prevMap[item.id]) !== JSON.stringify(newItem)) {
            prevMap[item.id] = newItem
          }
        })

        // Create a final array with updated and new items
        return Object.values(prevMap)
      })
    },
  })

  return { searchRegionContract, loadingSearchRegion, errorRegion }
}

export default useProcessInfoRegionesContrato
