import { useState } from 'react'
import { CustomTabPanel } from '@/libV4'
import { ConstructionPage, CustomTabHeaders } from '@/lib'
import { Article } from '@mui/icons-material'
import { ManagementFile } from '../components'

const ViewDashboard = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (_, newValue) => {
    setCurrentTab(newValue)
  }

  const dashboardTabs = [
    {
      // TO-DO:
      // privilege: 'procesos.consola.gestion_solicitudes',
      value: 0,
      label: 'Gestión de expedientes',
      props: {
        icon: <Article />,
        iconPosition: 'end',
        sx: { display: 'flex', fontWeight: 'normal' },
      },
    },
  ]

  const dashboardViews = [
    {
      component: <ManagementFile />,
    },
  ]

  const styleTabHeaders = {
    borderRadius: '20px 20px 0 0',
    backgroundColor: 'backgroundGrey2',
    py: 2,
    px: 2,
  }

  return (
    <article className='flex flex-col h-[calc(100vh-130px)] shadow-xl'>
      <CustomTabHeaders
        value={currentTab}
        variant='scrollable'
        scrollButtons='auto'
        sx={styleTabHeaders}
        options={dashboardTabs}
        handleChange={handleChangeTab}
      />
      <section className='backgroundGray1 h-100% flex-1 rounded-bl-lg rounded-br-lg overflow-auto'>
        {dashboardViews.map((view, index) => {
          return (
            <CustomTabPanel
              key={index}
              value={currentTab}
              index={index}
              sx={{
                minHeight: '550px',
                backgroundColor: 'backgroundWhite1',
                p: 4,
              }}
            >
              {view?.component ?? <ConstructionPage />}
            </CustomTabPanel>
          )
        })}
      </section>
    </article>
  )
}

export default ViewDashboard
