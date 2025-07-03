import {
  BackdropLoading,
  downloadFile,
  useBoolean,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/lib'
import { ViewTreasuryByGroup } from './views'
import { useState } from 'react'
import { columnsTreasuriesList } from './constants'
import toast from 'react-hot-toast'
import { qryBuilderTreasury } from './funcs'
import { TreasuriesModals } from './components'
import { useParams, useSearchParams } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

const TreasuryByGroup = () => {
  const setPaymentOrders = useStoreActions((actions) => actions.paymentOrdersModel.setPaymentOrders)
  const params = useParams()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const [idProcess, setIdProcess] = useState('')
  const [infoOrder, setInfoOrder] = useState({})
  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()
  const paymentOrderStates = useBoolean()
  const openModals = {
    handleShowHistorical: historicalStates.handleShow,
    handleShowBasicData: basicDataStates.handleShow,
    handleCurrentDocsStates: currentDocsStates.handleShow,
    handleShowPaymentOrder: paymentOrderStates.handleShow,
  }

  const idGroup = params?.idGroup || ''

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('q')
  const qry = qryBuilderTreasury({ model, querySearch })
  const {
    data: treasuryProcessGroupsList,
    isFetching: loadingTreasuriesList,
    refetch: refetchTreasuriesList,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlApps',
    url: `/app-specific/siif-web/gestion-gasto/pay-order-inbox/${idGroup}/list${qry}`,
    refetchOnWindowFocus: true,
  })
  const columns = columnsTreasuriesList({
    setIdProcess,
    openModals,
    setInfoOrder,
  })

  const { mutateAsync: generateSpreadSheet, isPending: loadinggenerateSpreadSheet } =
    useMutationDynamicBaseUrl({
      url: `/app-specific/siif-web/gestion-gasto/pay-order-inbox/start-process`,
      baseKey: 'urlApps',
      isCompanyRequest: true,
      onSuccess: (e) => {
        downloadFile(e, 'Planilla.jnlp', 'application/x-java-jnlp-file')
        toast.success('Formulario descargado correctamente')
        setPaymentOrders({ idGroup, newSelection: [] })
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al generar la planilla')
      },
    })

  return (
    <>
      <BackdropLoading loading={loadinggenerateSpreadSheet} />
      <ViewTreasuryByGroup
        data={treasuryProcessGroupsList}
        columns={columns}
        loading={loadingTreasuriesList}
        generateSpreadSheet={generateSpreadSheet}
        model={model}
        setModel={setModel}
        idGroup={idGroup}
      />
      <TreasuriesModals
        idProcess={idProcess}
        historicalStates={historicalStates}
        basicDataStates={basicDataStates}
        paymentOrderStates={paymentOrderStates}
        currentDocsStates={currentDocsStates}
        infoOrder={infoOrder}
        refetchTreasuriesList={refetchTreasuriesList}
      />
    </>
  )
}

export default TreasuryByGroup
