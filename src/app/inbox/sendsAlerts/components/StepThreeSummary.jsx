import { BasicDataInbox, BasicTitle, GenericTable, useQueryDynamicApi } from '@/lib'
import { Grid } from '@mui/material'
import { columnsAlerts } from '../constants'

const StepThreeSummary = ({ ids }) => {
  const idProcess = ids?.idProcess
  const {
    data: alertsByProcess,
    isLoading: loadingAlertsByProcess,
    isFetching: fetchingAlertsByProcess,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `alertasProceso?idProceso=${idProcess}&aumentarInfo=true`,
    enabled: !!idProcess,
  })
  return (
    <>
      <Grid
        item
        xs={12}
      >
        <BasicDataInbox
          idProcess={idProcess}
          showPendingActs={false}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <BasicTitle title='Alertas asociadas al proceso' />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <GenericTable
          columns={columnsAlerts ?? []}
          rows={alertsByProcess?.data ?? []}
          loading={loadingAlertsByProcess || fetchingAlertsByProcess}
        />
      </Grid>
    </>
  )
}

export default StepThreeSummary
