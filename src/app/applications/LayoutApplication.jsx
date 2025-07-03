import { Box } from '@mui/material'
import { AlertContent, MenuSidebarApplications } from './components'
import { WithAuth } from '../middleware'
import { containerLayoutModules } from './styles'
import { Outlet, useLocation } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import { buildJobStatusUrl } from './funcs'
import { useHandleJobStatus } from './hooks'
import { useEffect } from 'react'

const LayoutApplication = () => {
  const { pathname } = useLocation()
  const isTreasuryMenu = pathname.includes('treasury')

  const jobStatusData = useStoreState((state) => state.jobStatusModel.jobStatusData)

  const autoliqPU = jobStatusData?.autoliqPU || {}
  const payrollLiquidation = jobStatusData?.payrollLiquidation || {}

  const { getJobStatus: getJobStatusAutoliqPU } = useHandleJobStatus('autoliqPU', jobStatusData)
  const { getJobStatus: getJobStatusPayroll } = useHandleJobStatus(
    'payrollLiquidation',
    jobStatusData
  )

  useEffect(() => {
    if (autoliqPU?.identifier && autoliqPU?.isExecuting) {
      const qryAutoliqPU = buildJobStatusUrl(autoliqPU?.queryJobStatus, autoliqPU?.identifier)
      getJobStatusAutoliqPU({ qry: qryAutoliqPU })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoliqPU?.isExecuting])

  useEffect(() => {
    if (payrollLiquidation?.identifier && payrollLiquidation?.isExecuting) {
      const qryPayrollLiquidation = buildJobStatusUrl(
        payrollLiquidation?.queryJobStatus,
        payrollLiquidation?.identifier
      )
      getJobStatusPayroll({ qry: qryPayrollLiquidation })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payrollLiquidation?.isExecuting])

  return (
    <WithAuth>
      <Box sx={containerLayoutModules}>
        {!isTreasuryMenu && <MenuSidebarApplications />}

        <AlertContent>
          <Outlet />
        </AlertContent>
      </Box>
    </WithAuth>
  )
}

export default LayoutApplication
