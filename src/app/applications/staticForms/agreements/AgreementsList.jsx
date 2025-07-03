import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutationDynamicBaseUrl } from '@/libV4'

import { useSearch } from '@/lib'
import { ViewAgreementsList } from './views'
import { columnsAgreementsTable, handleParamSearch } from './constants'

const AgreementsList = () => {
  const searchAgreement = useSearch()
  const navigate = useNavigate()
  const location = useLocation()
  const [rowsAgreement, setRowsAgreement] = useState([])
  const columns = columnsAgreementsTable(navigate)

  const queryParams = new URLSearchParams(location?.search)

  const paramsModule = queryParams.get('module') ?? ''

  const qry = `/convenios/list-convenios/${paramsModule}`

  const handleAdd = () => {
    navigate(
      `/applications/staticForms/agreements/editAgreements?module=${paramsModule}&isNew=true`
    )
  }

  const { mutateAsync: listPaymentAgreements, isPending: isPendingGetAgreement } =
    useMutationDynamicBaseUrl({
      url: qry,
      method: 'GET',
      baseKey: 'urlRentasApi',
      isCompanyRequest: true,
      onSuccess: (response) => setRowsAgreement(response?.data ?? []),
      onError: () => toast.error('Error al obtener los acuerdos de pago'),
    })

  const handleGetData = (searchText = '') => {
    if (!paramsModule) {
      toast.error('No está definido el módulo para los acuerdos de pago')
      return
    }

    const additionalParam = handleParamSearch({ searchText })
    listPaymentAgreements({
      qry: additionalParam,
    })
  }

  useEffect(() => {
    handleGetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!paramsModule || paramsModule === '') return <></>

  return (
    <ViewAgreementsList
      rows={rowsAgreement}
      columns={columns}
      isPendingQuery={isPendingGetAgreement}
      searchAgreement={searchAgreement}
      handleAdd={handleAdd}
      handleGetData={handleGetData}
    />
  )
}

export default AgreementsList
