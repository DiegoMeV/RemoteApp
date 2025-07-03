import {
  BackdropLoading,
  BasicTitle,
  CustomModal,
  encodeKeys,
  encodeString,
  formatDayjsProperties,
  getFormValuesFiltered,
  isEmpty,
  iterationNumber,
  useMutationDynamicBaseUrl,
} from '@/libV4'
import { DetailTable, FormPayrollLiquidation, PayrollProcesses } from '../components'
import { useStoreActions } from 'easy-peasy'
import { useFormHandlers, usePayrollMutations } from '../hooks'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { getPayrollDifferences } from '../funcs'
import { useCallOracleReport } from '@/app/applications/hooks'
import { datesToConvert, savableFields } from '../constants'
import { useBoolean, useSearch } from '@/lib'

const ViewEditPayrollLiquidation = ({
  infoNomina,
  form,
  componentForm,
  identifier,
  titleForm,
  nit_compania,
  division,
  getQueryResult,
  isPendingQuery,
  isNew,
  periodo,
  nomina,
}) => {
  const setVLProps = useStoreActions((actions) => actions.valueList.setVLProps)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const searchDetail = useSearch()
  const procesessModal = useBoolean()
  const searchPayrollProcesses = useSearch()
  const isLiquidated = form.watch('estado') === 'L'
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [rowsChanged, setRowsChanged] = useState([])
  const initialLiquidationState = useRef({})
  const [modelDetail, setModelDetail] = useState({ page: 0, pageSize: 100 })
  const handlePaginationModelChange = (newModel) => {
    setModelDetail(newModel)
  }

  const {
    handleGetDetail,
    handleGetVolante,
    handleGetPayrollProcesses,
    infoDetail,
    infoVolante,
    dataPayrollProcesses,
  } = useFormHandlers({
    nit_compania,
    getQueryResult,
    componentForm,
    periodo,
    nomina,
    modelDetail,
    initialLiquidationState,
  })
  const totalCount = infoDetail?.[0]?.total_count ?? 0

  const { mutateAsync: updateEmployeeStatus, isPending: isLoadinSave } = useMutationDynamicBaseUrl({
    baseKey: 'urlNomina',
    url: `/nomina/liquidarEmpleado/table/empleados_por_nomina?periodo=${periodo}&nomina=${nomina}`,
    method: 'put',
    onSuccess: (response) => {
      toast.success(response?.message ?? 'Operación exitosa')
      handleGetDetail(searchDetail?.searchText)
      setRowsChanged([])
      initialLiquidationState.current = {}
    },
    onError: (e) => {
      toast.error(e?.message ?? 'Error al actualizar los empleados')
      setRowsChanged([])
    },
  })

  const handleSaveDetail = async () => {
    updateEmployeeStatus({ body: { data: rowsChanged } })
  }

  const numIterations = iterationNumber()

  const {
    chargeEmployees,
    payrollLiquidate,
    deleteNomina,
    executeAction,
    handleGetJobStatus,
    jobStatusData,
    showJobStatus,
    setShowJobStatus,
    isLoading,
  } = usePayrollMutations({
    isNew,
    identifier,
    handleGetDetail,
    searchDetail,
    numIterations,
  })

  const diferences = getPayrollDifferences({ form, infoNomina })
  const arePendingChanges = !isNew && (rowsChanged.length > 0 || !isEmpty(diferences))

  const handleSave = async () => {
    const diferences = getPayrollDifferences({ form, infoNomina })
    const formatedDiferences = formatDayjsProperties({ obj: diferences, dateKeys: datesToConvert })
    const filteredFields = getFormValuesFiltered({ form, array: savableFields })
    const formatedFilteredFields = formatDayjsProperties({
      obj: filteredFields,
      dateKeys: datesToConvert,
    })

    if (rowsChanged.length > 0) {
      await handleSaveDetail()
    } else if (!isNew && !isEmpty(formatedDiferences)) {
      executeAction({
        body: {
          action: encodeString(numIterations, 'update'),
          data: encodeKeys(formatedDiferences, numIterations),
          where: encodeKeys({ periodo, nomina, nit_compania }, numIterations),
        },
      })
    } else if (isNew && !isEmpty(formatedFilteredFields)) {
      executeAction({
        body: {
          action: encodeString(numIterations, 'insert'),
          data: encodeKeys(
            {
              ...formatedFilteredFields,
              cuenta_salud: '98754332-1',
              nomina: Number(formatedFilteredFields?.nomina),
              periodo: formatedFilteredFields?.periodo?.periodo,
              ...(formatedFilteredFields?.vinculacion?.vinculacion !== null && {
                vinculacion: formatedFilteredFields?.vinculacion?.vinculacion,
              }),
            },
            numIterations
          ),
        },
      })
    }
  }

  const handleDeleteNomina = async () => {
    await deleteNomina({ body: { periodo, nomina } })
  }

  const confirmDelete = async () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Liquidar nómina',
      content: `¿Está seguro de liquidar la nómina ${form.getValues('nomina')}?`,
      onConfirm: () => handleDeleteNomina(),
    })
  }

  const handleLiquidate = async () => {
    const liquidarSoloMarcados = form.watch('solo_marcados')
    const liquidarTodos = liquidarSoloMarcados === 'N' ? 'S' : 'N'
    const body = {
      periodo: form.getValues('periodo')?.periodo,
      nomina: form.getValues('nomina'),
      estado: form.getValues('estado'),
      liquidarTodos: liquidarTodos,
    }

    await payrollLiquidate({ body })
  }

  const handleConfirmLiquidate = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Liquidar nómina',
      content: `¿Está seguro de liquidar la nómina ${form.getValues('nomina')}?`,
      onConfirm: () => handleLiquidate(),
    })
  }

  const { handleCallOracleReport } = useCallOracleReport({
    reportName: 'volante_pago',
    queryParams: `extra_unanomina=${nomina}&extra_unperiodo=${periodo}&extra_unacompania=${nit_compania}`,
    nameShowModal: 'Volantes de pago',
  })

  useEffect(() => {
    if (periodo && nomina) {
      handleGetDetail(searchDetail?.searchText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelDetail])

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleGetPayrollProcesses(searchPayrollProcesses?.searchText)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BackdropLoading loading={isLoadinSave || isLoading} />
      <BasicTitle
        title={`${isNew ? 'Creación de nómina' : titleForm}`}
        backpath='/applications/staticForms/humanResources/PayrollLiquidation'
      />
      <div className='p-8 backgroundGray1 flex flex-col'>
        <FormPayrollLiquidation
          form={form}
          isNew={isNew}
          isLiquidated={isLiquidated}
          identifier={identifier}
          nit_compania={nit_compania}
          division={division}
          jobStatusData={jobStatusData}
          getQueryResult={getQueryResult}
          chargeEmployees={chargeEmployees}
          handleGetDetail={handleGetDetail}
          handleSave={handleSave}
          handleGetJobStatus={handleGetJobStatus}
          handleCallOracleReport={handleCallOracleReport}
          confirmDelete={confirmDelete}
          showJobStatus={showJobStatus}
          setShowJobStatus={setShowJobStatus}
          setVLProps={setVLProps}
          setConfirmAlertProps={setConfirmAlertProps}
          arePendingChanges={arePendingChanges}
          procesessModal={procesessModal}
          dataPayrollProcesses={dataPayrollProcesses}
        />
        <DetailTable
          jobStatusData={jobStatusData}
          componentForm={componentForm}
          isNew={isNew}
          isLiquidated={isLiquidated}
          infoDetail={infoDetail}
          infoVolante={infoVolante}
          isPendingQuery={isPendingQuery}
          handleGetDetail={handleGetDetail}
          handleGetVolante={handleGetVolante}
          handleConfirmLiquidate={handleConfirmLiquidate}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          setRowsChanged={setRowsChanged}
          searchDetail={searchDetail}
          pagination={{ totalCount, modelDetail, handlePaginationModelChange }}
          arePendingChanges={arePendingChanges}
          initialLiquidationState={initialLiquidationState}
        />
      </div>
      {procesessModal?.show && (
        <CustomModal
          open={procesessModal?.show}
          handleClose={procesessModal?.handleShow}
          size='lg'
        >
          <PayrollProcesses
            nit_compania={nit_compania}
            periodo={periodo}
            nomina={nomina}
            getQueryResult={getQueryResult}
            isPendingQuery={isPendingQuery}
            setVLProps={setVLProps}
            dataPayrollProcesses={dataPayrollProcesses}
            handleGetPayrollProcesses={handleGetPayrollProcesses}
            searchPayrollProcesses={searchPayrollProcesses}
          />
        </CustomModal>
      )}
    </>
  )
}

export default ViewEditPayrollLiquidation
