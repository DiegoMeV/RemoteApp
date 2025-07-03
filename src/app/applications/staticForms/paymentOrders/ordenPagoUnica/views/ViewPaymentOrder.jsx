import { useState } from 'react'
import { MasterForm } from '../components'
import { useTabsDetails } from '../hooks'

const ViewPaymentOrder = ({
  form,
  nit_compania,
  newGlobalVariables,
  queryParams,
  queryParamsPks,
  getFormValue,
  setFormValue,
  ordenPagouData,
  loadingOrdenPagouData,
  refetchOrdenPagou,
  getFechaBLQ,
  setNewGlobalVariables,
  miaplicanum,
  commonPostInsert,
  commonPostUpdate,
  isPendingBD,
}) => {
  const [bloquearBloques, setBloquearBloques] = useState(false)

  const { detailTabs } = useTabsDetails({
    nit_compania,
    queryParamsPks: queryParamsPks,
    getFormValue,
    globalVariables: newGlobalVariables,
    ordenPagouData: ordenPagouData?.data?.[0],
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
      ordenPagouData={ordenPagouData}
      loadingOrdenPagouData={loadingOrdenPagouData}
      refetchOrdenPagou={refetchOrdenPagou}
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

export default ViewPaymentOrder
