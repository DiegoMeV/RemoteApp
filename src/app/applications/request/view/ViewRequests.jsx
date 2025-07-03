import { NoAccessCard } from '@/lib'
import { Article, AutoAwesomeMosaic, BarChart } from '@mui/icons-material'
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import {
  ViewAnalyticsInformation,
  ViewManagementIndicators,
  ViewRequestManagement,
} from '../components'
import { a11yProps, AccessControl, CustomTabPanel } from '@/libV4'

const ViewRequests = ({
  privilegeRequestManagement,
  privilegeManagementIndicators,
  privilegeAnalyticsInformation,
}) => {
  const [value, setValue] = useState(
    privilegeRequestManagement ? 0 : privilegeManagementIndicators ? 1 : 2
  )

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Box
        bgcolor='backgroundGrey2'
        borderRadius='20px 20px 0 0'
        p={2}
      >
        <Tabs
          value={value}
          onChange={handleChange}
        >
          {privilegeRequestManagement && (
            <Tab
              label='Gestión de solicitudes'
              iconPosition='end'
              icon={<Article fontSize='small' />}
              {...a11yProps(0)}
            />
          )}
          {privilegeManagementIndicators && (
            <Tab
              label='Estadisticas y cifras'
              iconPosition='end'
              icon={<BarChart fontSize='small' />}
              {...a11yProps(1)}
            />
          )}
          {privilegeAnalyticsInformation && (
            <Tab
              label='Información de analítica'
              iconPosition='end'
              icon={<AutoAwesomeMosaic fontSize='small' />}
              {...a11yProps(2)}
            />
          )}
        </Tabs>
      </Box>
      <Box
        bgcolor='backgroundGrey1'
        height='calc(100vh - 100px)'
        borderRadius='0 0 20px 20px'
        p={2}
        overflow='auto'
      >
        <CustomTabPanel
          value={value}
          index={0}
          sx={{ backgroundColor: 'backgroundGrey1' }}
        >
          <AccessControl
            privilege='procesos.consola.gestion_solicitudes'
            nodeContent={<NoAccessCard />}
          >
            <ViewRequestManagement />
          </AccessControl>
        </CustomTabPanel>

        <CustomTabPanel
          value={value}
          index={1}
          sx={{ backgroundColor: 'backgroundGrey1' }}
        >
          <AccessControl
            privilege='procesos.consola.estadisticas_cifras'
            nodeContent={<NoAccessCard />}
          >
            <ViewManagementIndicators />
          </AccessControl>
        </CustomTabPanel>
        <CustomTabPanel
          value={value}
          index={2}
          sx={{ backgroundColor: 'backgroundGrey1' }}
        >
          <AccessControl
            privilege='procesos.consola.informacion_analitica'
            nodeContent={<NoAccessCard />}
          >
            <ViewAnalyticsInformation />
          </AccessControl>
        </CustomTabPanel>
      </Box>
    </>
  )
}

export default ViewRequests
