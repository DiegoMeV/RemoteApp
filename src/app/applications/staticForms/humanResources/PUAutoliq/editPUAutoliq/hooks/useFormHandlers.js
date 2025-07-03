import { useState } from 'react'
import { infoCompany, infoDetailPUAtoliq } from '../constants'
import toast from 'react-hot-toast'
import { useExecuteAction } from '@/app/applications/hooks/useExecuteAction'

const useFormHandlers = ({
  nit_compania,
  getQueryResult,
  form,
  navigate,
  secuence,
  isNew,
  numIterations,
  paginationModel,
}) => {
  const [infoDetail, setInfoDetail] = useState([])

  const handleGetDetail = async () => {
    try {
      const queryDetail = infoDetailPUAtoliq({ nit_compania, secuence, paginationModel })
      const response = await getQueryResult(queryDetail)
      setInfoDetail(response?.data ?? [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleGenerateSequence = async () => {
    try {
      const infoQuery = infoCompany({ nit_compania })
      const response = await getQueryResult(infoQuery)
      form.reset(response?.data?.[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const { executeAction, isPendingExecute } = useExecuteAction({
    shema: 'siif',
    tableName: 'atoliq_punica',
    numIterations,
    onSuccessFunc: (e) => {
      const newInfo = e?.data?.[0]
      const newSecuence = newInfo?.secuencia
      if (newSecuence) {
        const newPath = `/applications/staticForms/humanResources/PUAutoliq/editPUAutoliq?secuence=${newSecuence}`
        navigate(newPath)
      }
      handleGetDetail()
      toast.success(
        e?.msg ?? isNew
          ? 'Planilla creada correctamente'
          : `Se actualizaron ${e?.affectedRows} registros`
      )
    },
  })

  return {
    handleGetDetail,
    handleGenerateSequence,
    infoDetail,
    setInfoDetail,
    executeAction,
    isExecuting: isPendingExecute,
  }
}

export default useFormHandlers
