import { useStoreActions, useStoreState } from 'easy-peasy'
import { useState } from 'react'
import { useMutationDynamicBaseUrl } from '@/libV4'
import toast from 'react-hot-toast'
import { buildJobStatusUrl } from '../../../funcs'
import { useNavigate } from 'react-router-dom'
import { useExecuteAction } from '@/app/applications/hooks/useExecuteAction'

const usePayrollMutations = ({
  isNew,
  identifier,
  handleGetDetail,
  searchDetail,
  numIterations,
}) => {
  const navigate = useNavigate()
  const jobStatusData = useStoreState((state) => state.jobStatusModel.jobStatusData)
  const updatejobStatusData = useStoreActions(
    (actions) => actions.jobStatusModel.updatejobStatusData
  )
  const payrollLiquidation = jobStatusData?.payrollLiquidation || {}
  const queryJobStatus = 'liquidar_empleados_job'
  const [showJobStatus, setShowJobStatus] = useState(false)

  const { mutateAsync: getJobStatus } = useMutationDynamicBaseUrl({
    baseKey: 'urlNomina',
    isCompanyRequest: true,
    method: 'GET',
    onSuccess: (e) => {
      const jobBody = {
        idJob: e?.data?.[0]?.idJob,
        status: e?.data?.[0]?.estado,
        identifier,
        queryJobStatus,
        isExecuting: true,
      }
      updatejobStatusData({ payrollLiquidation: { ...jobBody } })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al cargar la liquidación')
    },
  })

  const handleGetJobStatus = () => {
    setShowJobStatus(true)
    const qry = buildJobStatusUrl(queryJobStatus, identifier)
    getJobStatus({
      qry,
    })
  }

  const { mutateAsync: chargeEmployees, isPending: isChargingEmployees } =
    useMutationDynamicBaseUrl({
      url: `/nomina/cargarEmpleados`,
      baseKey: 'urlNomina',
      method: 'post',
      onSuccess: (response) => {
        if (response?.data?.outBinds?.P_OutStatus === 'Success') {
          toast.success(
            response?.data?.outBinds?.P_Message ?? 'Se cargaron los empleados correctamente'
          )
          searchDetail?.clearSearch()
          handleGetDetail()
        } else {
          toast.error(response?.data?.outBinds?.P_Message ?? 'Error al cargar la liquidación')
        }
      },
      onError: (e) => {
        toast.error(e?.message ?? 'Error al cargar los empleados')
      },
    })

  const { mutateAsync: payrollLiquidate, isPending: isChargingLiquidation } =
    useMutationDynamicBaseUrl({
      url: `/nomina/liquidarEmpleados`,
      baseKey: 'urlNomina',
      method: 'post',
      onSuccess: (response) => {
        if (response?.data?.outBinds?.P_OutStatus === 'Success') {
          toast.success(
            `Liquidación cargada correctamente,  id tarea: ${
              response?.data?.outBinds?.P_Message ?? ''
            }`
          )
          searchDetail?.clearSearch()
          handleGetJobStatus()
          handleGetDetail()
        } else {
          toast.error(response?.data?.outBinds?.P_Message ?? 'Error al cargar la liquidación')
        }
      },
      onError: (e) => {
        toast.error(e?.message ?? 'Error al cargar la liquidación')
      },
    })

  const { executeAction, isPendingExecute } = useExecuteAction({
    shema: 'siif',
    tableName: 'nomina',
    numIterations,
    onSuccessFunc: (e) => {
      const newInfo = e?.data?.[0]
      const newPeriodo = newInfo?.periodo
      const newVinculacion = newInfo?.vinculacion
      const newNomina = newInfo?.nomina
      if (newPeriodo && newVinculacion && newNomina) {
        const newPath = `/applications/staticForms/humanResources/PayrollLiquidation/editPayrollLiquidation?periodo=${newPeriodo}&vinculacion=${newVinculacion}&nomina=${newNomina}`
        navigate(newPath)
      }
      searchDetail?.clearSearch()
      handleGetDetail()
      toast.success(
        e?.msg ?? isNew
          ? 'Nómina creada correctamente'
          : `Se actualizaron ${e?.affectedRows} registros`
      )
    },
  })

  const { mutateAsync: deleteNomina, isPending: isDeleting } = useMutationDynamicBaseUrl({
    url: `/nomina/nomina`,
    baseKey: 'urlNomina',
    method: 'delete',
    onSuccess: (response) => {
      if (response?.data?.outBinds?.P_OutStatus === 'Success') {
        toast.success(response?.data?.outBinds?.P_Message ?? 'Nómina eliminada correctamente')
        navigate('/applications/staticForms/humanResources/PayrollLiquidation')
      } else {
        toast.error(response?.data?.outBinds?.P_Message ?? 'Error al eliminar la nómina')
      }
    },
    onError: (e) => {
      toast.error(e?.message ?? 'Error al eliminar la nómina')
    },
  })

  return {
    chargeEmployees,
    payrollLiquidate,
    deleteNomina,
    executeAction,
    handleGetJobStatus,
    jobStatusData: payrollLiquidation,
    showJobStatus,
    setShowJobStatus,
    isLoading: isChargingEmployees || isChargingLiquidation || isDeleting || isPendingExecute,
  }
}

export default usePayrollMutations
