import { useEffect, useState } from 'react'
import { tableDataAlertsReview } from './funcs'
import { ViewAlertsReview } from './views'
import { MagicString, useProcessAlertsCreation, useQueryDynamicApi } from '@/lib'
import toast from 'react-hot-toast'
import { GridRowModes } from '@mui/x-data-grid-premium'

const AlertsReview = ({ ids }) => {
  const [rowModesModels, setRowModesModels] = useState({})
  const [rowEdited, setRowEdited] = useState(false)
  const [idProcess] = ids || []
  const {
    data: processAlerts,
    isLoading,
    refetch,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/alertasProceso/?idProceso=${idProcess}&aumentarInfo=true`,
  })

  const { columns } = tableDataAlertsReview(rowModesModels, setRowModesModels)

  const ROWS_ALERTS_REVIEW =
    processAlerts?.data?.map((alert) => ({
      id: alert?.id,
      identificador: alert?.alertaInfo?.identificador,
      fecha: alert?.alertaInfo?.fecha_registro,
      estado: alert?.estado ?? '',
      comentario: alert?.comentario ?? '',
      nameModel: alert?.alertaInfo?.modeloInfo?.nombre ?? '',
      identificador_diari: alert?.alertaInfo?.identificador_diari ?? '',
    })) ?? []

  /**
   * Effect hook that runs when the `processAlerts` dependency changes.
   * This hook sets all rows in the alerts table to start in edit mode.
   *
   * Required information received by the hook:
   * @param {Object} processAlerts - The alerts data object that contains the alerts.
   * @param {Array} processAlerts.data - The array of alert objects.
   * @param {string} processAlerts.data[].id - The unique identifier for each alert.
   *
   * @returns {void}
   */
  useEffect(() => {
    // Executes when `processAlerts` has the request data
    if (processAlerts) {
      // Sets the row mode models for the table rows
      setRowModesModels(
        // Reduce `processAlerts.data` into an object where each alert's id is a key
        // and the row mode is the value (in this case, edit mode)
        processAlerts?.data?.reduce((acc, alert) => {
          return { ...acc, [alert.id]: { mode: GridRowModes.Edit } }
        }, {})
      )
    }
  }, [processAlerts]) // The effect is executed when `processAlerts` has the request data

  const setMode = () => {
    setRowModesModels({ ...rowModesModels, [rowEdited]: { mode: GridRowModes.Edit } })
  }
  const { mutate: createAlertReview } = useProcessAlertsCreation({
    onSuccess: () => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      setMode()
      refetch()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      setMode()
    },
  })

  const processRowUpdate = (row) => {
    setRowEdited(row.id)
    createAlertReview({ id: row.id, estado: row.estado, comentario: row?.comentario ?? '' })
  }

  return (
    <ViewAlertsReview
      columns={columns}
      rows={ROWS_ALERTS_REVIEW}
      models={{ rowModesModels, setRowModesModels }}
      isLoading={isLoading}
      processRowUpdate={processRowUpdate}
    />
  )
}

export default AlertsReview
