import { DynamicTableAlert } from '@/app/applications/components'
import { sxSearchTables } from '@/app/applications/styles'
import { ErrorPage, useGetContractAffected } from '@/lib'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { columnsRegionAffectedContract } from './constant'
import useProcessInfoRegionesContrato from './hooks/useProcessInfoRegionesContrato'
const TableRegionContract = ({ idAlert }) => {
  const [regionAffectedAccState, setRegionAffectedAccState] = useState([])
  // Data contracts
  const {
    data: contractsAffected,
    isFetching: loadingContractsAffected,
    isError: errorRowsContractsAffected,
  } = useGetContractAffected({ idAlert, enabled: !!idAlert })
  const { searchRegionContract, loadingSearchRegion, errorRegion } = useProcessInfoRegionesContrato(
    { contractsAffected, setRegionAffectedAccState }
  )

  // Ids of contracts
  const ids = contractsAffected?.data?.map((contract) => contract.contrato_id)
  // useEffect to search region contract
  useEffect(() => {
    if (ids) {
      ids.forEach((id) => {
        searchRegionContract({ qry: `&contratoId=${id}` })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractsAffected])

  const error = errorRowsContractsAffected || errorRegion
  const loading = loadingContractsAffected || loadingSearchRegion

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : (
        <Box sx={sxSearchTables}>
          <DynamicTableAlert
            loading={loading}
            columns={columnsRegionAffectedContract ?? []}
            rows={regionAffectedAccState || []}
          />
        </Box>
      )}
    </>
  )
}

export default TableRegionContract
