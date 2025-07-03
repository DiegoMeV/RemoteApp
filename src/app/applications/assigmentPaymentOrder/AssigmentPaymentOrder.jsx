import { useBoolean, useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/lib'
import { ViewAssigPayOrder } from './views'
import { useState } from 'react'
import { PaymentOrderModals } from './components'
import { columnsPaymentOrders } from './constants'
import {
  AccessControl,
  BackdropLoading,
  CustomModal,
  GenericAutocompleteRequest,
  isEmpty,
} from '@/libV4'
import toast from 'react-hot-toast'
import { qryBuilderTreasury } from '../treasury/[idGroup]/funcs'

const AssigmentPaymentOrder = () => {
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const [idProcess, setIdProcess] = useState('')
  const [paymentOrders, setPaymentOrders] = useState({})
  const [assignedUser, setAssignedUser] = useState({})
  const [querySearch, setQuerySearch] = useState('')
  const [triggerSearch, setTriggerSearch] = useState(false)

  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()
  const paymentOrderStates = useBoolean()
  const assigmentModal = useBoolean()

  const openModals = {
    handleShowHistorical: historicalStates.handleShow,
    handleShowBasicData: basicDataStates.handleShow,
    handleCurrentDocsStates: currentDocsStates.handleShow,
    handleShowPaymentOrder: paymentOrderStates.handleShow,
  }

  const qry = qryBuilderTreasury({ model, querySearch: triggerSearch })

  const {
    data: treasuryProcessGroupsList,
    isFetching: loadingTreasuriesList,
    refetch: refetchTreasuriesList,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlApps',
    url: `/app-specific/siif-web/gestion-gasto/pay-order-assignment/list${qry}`,
    refetchOnWindowFocus: true,
  })

  const { mutateAsync: assignUser, isPending: assigningUser } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlApps',
    url: '/app-specific/siif-web/gestion-gasto/pay-order-assignment',
    onSuccess: () => {
      toast.success('Asignación exitosa')
      refetchTreasuriesList()
      setPaymentOrders([])
      setAssignedUser({})
      assigmentModal.handleShow()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al asignar funcionario')
    },
  })

  const columns = columnsPaymentOrders({
    setIdProcess,
    openModals,
  })

  const handleAssignPaymentOrder = () => {
    if (isEmpty(assignedUser)) {
      toast.error('Debe seleccionar un funcionario')
      return
    }

    const paymentOrdersArray = Object.values(paymentOrders)

    const paymentOrdersBody = paymentOrdersArray.map((row) => ({
      orden: row?.nroInternoOrden,
      recurso: row?.fondo,
      clase: row?.clase,
    }))

    const data = {
      payOrders: paymentOrdersBody,
      idUserAssigned: assignedUser.id,
    }
    assignUser({ body: data })
  }

  const handleSearch = () => {
    setTriggerSearch(querySearch)
    setModel({ page: 0, pageSize: 25 })
  }
  return (
    <AccessControl privilege='aplicaciones.asignar_ordenes_pago.visualizar'>
      <BackdropLoading open={assigningUser} />
      <ViewAssigPayOrder
        data={treasuryProcessGroupsList}
        columns={columns}
        loading={loadingTreasuriesList}
        model={model}
        setModel={setModel}
        assigmentModal={assigmentModal}
        paymentOrders={paymentOrders}
        setPaymentOrders={setPaymentOrders}
        querySearch={querySearch}
        setQuerySearch={setQuerySearch}
        handleSearch={handleSearch}
      />
      <PaymentOrderModals
        idProcess={idProcess}
        historicalStates={historicalStates}
        basicDataStates={basicDataStates}
        paymentOrderStates={paymentOrderStates}
        currentDocsStates={currentDocsStates}
        refetchTreasuriesList={refetchTreasuriesList}
      />
      {assigmentModal.show && (
        <CustomModal
          title='Asignar funcionario'
          open={assigmentModal.show}
          handleClose={assigmentModal.handleShow}
          actions={[
            {
              label: 'Cancelar',
              color: 'error',
              onClick: assigmentModal.handleShow,
            },
            {
              label: 'Guardar',
              onClick: handleAssignPaymentOrder,
            },
          ]}
        >
          <GenericAutocompleteRequest
            label='Funcionario'
            requestprops={{
              baseKey: 'urlUsers',
              url: '/users',
              isPaginated: true,
              additionalQry: '&isActive=true',
            }}
            value={assignedUser}
            onChange={(_, params) => setAssignedUser(params)}
            required={true}
            autocompleteprops={{
              getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
            }}
            queryRequest={{
              querySearch: 'querySearch',
              additionalQuery: '&rowsPerPage=10&isActive=true',
            }}
            vlprops={{
              shouldClose: true,
              columns: [
                {
                  title: 'Nombre',
                  dataIndex: 'name',
                  width: 200,
                  render: (_, record) => `${record?.firstName ?? ''} ${record?.lastName ?? ''}`,
                },
                {
                  title: 'Correo',
                  dataIndex: 'email',
                  width: 200,
                },
              ],
            }}
          />
        </CustomModal>
      )}
    </AccessControl>
  )
}

export default AssigmentPaymentOrder
