import { useEffect, useState } from 'react'
import ViewContractAffected from './ViewContractAffected'
import { useBoolean, useSearch } from '@/lib'
import { columnsContractAffected, useApisContractAffected } from './funcs'
import { useNavigate } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import { useModelPagination } from '@/app/applications/hooks'
import { createQuery } from '@/app/applications/funcs'

const ContractAffected = ({ idAlert, setValue, watch, isView }) => {
  const setBackPathUrl = useStoreActions((actions) => actions.backPathUrl.setBackPathUrl)
  const [rowModesModel, setRowModesModel] = useState({})
  const navigate = useNavigate()
  const [newRow, setNewRow] = useState(false)
  const [contractAffectedAccState, setContractAffectedAccState] = useState(false)
  const valueListContracts = useBoolean()
  const { model, handlePaginationModelChange } = useModelPagination()
  const searchContract = useSearch()
  const param = createQuery({ search: searchContract, model })

  const {
    contractsAffected,
    loadingRows,
    errorRowsContractsAffected,
    updateContract,
    contracts,
    loadingContracts,
    errorContracts,
    addContractAffected,
    loadingUpdates,
  } = useApisContractAffected(setNewRow, contractAffectedAccState, idAlert, setValue, watch, param)

  useEffect(() => {
    setRowModesModel({})
    setNewRow(false)
  }, [contractAffectedAccState])

  const columns = columnsContractAffected({
    valueListContracts,
    contracts,
    loadingContracts,
    errorContracts,
    searchContract,
    handlePaginationModelChange,
    model,
  })
  const deleteContractAffected = (id) => {
    updateContract({
      id,
      body: { esBorrado: true },
    })
  }
  const updateInfo = (data) => {
    if (data?.isNew) {
      addContractAffected({
        contrato_id: data?.contratoInfo?.id,
        descripcion: data?.descripcion,
        valor_contrato: data?.valor_contrato,
        alerta_id: idAlert,
      })
      return
    }
    updateContract({
      id: data?.id,
      body: { contrato_id: data?.contratoInfo?.id, valor_contrato: data?.valor_contrato },
    })
  }
  const createContractAffected = () => {
    const currentUrl = window.location.href
    setBackPathUrl(currentUrl)
    navigate('/applications/contracts/new')
  }

  const handleOpenContractAffectedAcc = () => {
    setContractAffectedAccState(!contractAffectedAccState)
  }

  return (
    <ViewContractAffected
      loadingUpdate={loadingUpdates}
      columns={columns}
      contracts={contractsAffected}
      updateInfo={updateInfo}
      loadingRows={loadingRows}
      errorRows={errorRowsContractsAffected}
      rowModesModel={rowModesModel}
      setRowModesModel={setRowModesModel}
      newRow={newRow}
      setNewRow={setNewRow}
      delItem={deleteContractAffected}
      createContract={createContractAffected}
      contractAffectedAccState={contractAffectedAccState}
      handleOpenContractAffectedAcc={handleOpenContractAffectedAcc}
      isView={isView}
    />
  )
}

export default ContractAffected
