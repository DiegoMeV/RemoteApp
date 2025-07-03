import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { NoAccessCard } from '@/lib'
import { ContentExecutiveInfo, ContentGeneralReport, ContentManagementReport } from '../components'
import { a11yProps, AccessControl, CustomTabPanel } from '@/libV4'

const ViewUriDashboard = ({ value, handleChange }) => {
  const tabs = [
    {
      label: 'Reporte General',
      privilege: 'cgr.uri.visualizar_dashboard_general_report',
      ContentComponent: ContentGeneralReport,
    },
    {
      label: 'Información ejecutiva',
      privilege: 'cgr.uri.visualizar_dashboard_info_executive',
      ContentComponent: ContentExecutiveInfo,
    },
    {
      label: 'Informe de gestión',
      privilege: 'cgr.uri.visualizar_dashboard_management_report',
      ContentComponent: ContentManagementReport,
    },
  ]

  return (
    <>
      <Box
        sx={{
          bgcolor: 'backgroundGrey2',
          borderRadius: '20px 20px 0 0',
          p: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          bgcolor: 'backgroundGrey1',
          height: 'calc(100vh - 100px)',
          borderRadius: '0 0 20px 20px',
          p: 2,
          overflow: 'auto',
        }}
      >
        {tabs.map(({ privilege, ContentComponent }, index) => (
          <CustomTabPanel
            key={index}
            value={value}
            index={index}
          >
            <AccessControl
              privilege={privilege}
              nodeContent={<NoAccessCard />}
            >
              <ContentComponent />
            </AccessControl>
          </CustomTabPanel>
        ))}
      </Box>
    </>
  )
}

export default ViewUriDashboard
