import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { ContentDashboard, ViewPersonalCharts } from '../components'
import { AccountTree, QueryStats } from '@mui/icons-material'
import { tabOptions } from '../styles'
import { NoAccessCard, usePrivileges } from '@/lib'

import { ViewProcessCharts } from '@/pages/dashboard'
import { a11yProps, AccessControl, CustomTabPanel } from '@/libV4'

const ViewDashboard = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const privilegePersonalAnalytics = usePrivileges('procesos.consola.analitica_personal')

  const privilegeProcessAnalytics = usePrivileges('procesos.consola.analitica_procesos')

  return (
    <ContentDashboard>
      <Box sx={{ width: '100%', maxWidth: '1440px', typography: 'body1' }}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={tabOptions}
          >
            {privilegePersonalAnalytics && (
              <Tab
                label='Analítica Personal'
                iconPosition='end'
                icon={<QueryStats fontSize='small' />}
                {...a11yProps(0)}
              />
            )}
            {privilegeProcessAnalytics && (
              <Tab
                label='Analítica de Procesos'
                iconPosition='end'
                icon={<AccountTree fontSize='small' />}
                {...a11yProps(1)}
              />
            )}
          </Tabs>
        </Box>

        <CustomTabPanel
          value={value}
          index={0}
          sx={{ backgroundColor: 'backgroundGrey1' }}
        >
          <AccessControl
            privilege='procesos.consola.analitica_personal'
            nodeContent={<NoAccessCard />}
          >
            <ViewPersonalCharts />
          </AccessControl>
        </CustomTabPanel>
        <CustomTabPanel
          value={value}
          index={1}
          sx={{ backgroundColor: 'backgroundGrey1' }}
        >
          <AccessControl
            privilege='procesos.consola.analitica_procesos'
            nodeContent={<NoAccessCard />}
          >
            <ViewProcessCharts />
          </AccessControl>
        </CustomTabPanel>
      </Box>
    </ContentDashboard>
  )
}

export default ViewDashboard
