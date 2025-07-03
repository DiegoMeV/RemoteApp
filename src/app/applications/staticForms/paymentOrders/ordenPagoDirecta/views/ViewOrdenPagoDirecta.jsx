import { useState } from 'react'
import { MasterForm } from '../components'
import { useTabsDetails } from '../hooks'

const ViewOrdenPagoDirecta = ({
  form,
  nit_compania,
  newGlobalVariables,
  queryParams,
  queryParamsPks,
  getFormValue,
  setFormValue,
  ordenPagoData,
  loadingOrdenPagoData,
  refetchOrdenPago,
  getFechaBLQ,
  setNewGlobalVariables,
  miaplicanum,
  commonPostInsert,
  commonPostUpdate,
  isPendingBD,
  controlMaster,
}) => {
  const [bloquearBloques, setBloquearBloques] = useState(false)

  const { detailTabs } = useTabsDetails({
    nit_compania,
    queryParamsPks: queryParamsPks,
    getFormValue,
    globalVariables: newGlobalVariables,
    ordenPagoData: ordenPagoData?.data?.[0],
    controlMaster,
    commonPostInsert,
    commonPostUpdate,
  })

  const [valueTab, setValueTab] = useState(0)

  const handleChangeTab = (_, newValue) => {
    setValueTab(newValue)
  }

  return (
    <MasterForm
      form={form}
      nit_compania={nit_compania}
      queryParamsPks={queryParamsPks}
      queryParams={queryParams}
      getFormValue={getFormValue}
      setFormValue={setFormValue}
      globalVariables={newGlobalVariables}
      ordenPagoData={ordenPagoData}
      loadingOrdenPagoData={loadingOrdenPagoData}
      refetchOrdenPago={refetchOrdenPago}
      handleChangeTab={handleChangeTab}
      getFechaBLQ={getFechaBLQ}
      setNewGlobalVariables={setNewGlobalVariables}
      bloquearBloques={bloquearBloques}
      setBloquearBloques={setBloquearBloques}
      miaplicanum={miaplicanum}
      detailTabs={detailTabs}
      valueTab={valueTab}
      commonPostInsert={commonPostInsert}
      commonPostUpdate={commonPostUpdate}
      isPendingBD={isPendingBD}
    />
  )
}

export default ViewOrdenPagoDirecta
