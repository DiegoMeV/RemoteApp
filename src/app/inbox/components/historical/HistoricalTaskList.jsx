import { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { ClassicIconButton, Loading, useGetProcess } from '@/lib'
import HistoricalStages from './HistoricalStages'
import HistoricalTimeLine from './HistoricalTimeLine'
import { CreationNotifications, RelatedProcesses } from './components'
import { useStoreState } from 'easy-peasy'
import { AccountTree } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { a11yProps, CustomTabPanel, usePrivileges } from '@/libV4'

const HistoricalTaskList = ({ idProcess }) => {
  const userData = useStoreState((state) => state.user.userData)

  const isSuperSayayin = userData?.superSaiyayin

  const privilegeNotification = usePrivileges('procesos.opciones_especiales.crear_notificacion')

  const {
    data: infoActivities,
    isLoading,
    refetch,
  } = useGetProcess({ qry: `/${idProcess}/history` })

  const { data: infoProcess, isLoading: loadingProcess } = useGetProcess({
    qry: `/${idProcess}`,
  })

  const [value, setValue] = useState(0)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  const handleCloseTab = () => setValue(0)

  const handleNavigateToBuilder = () => {
    if (!isSuperSayayin) return

    const idProcessType = infoProcess?.data?.[0]?.idProcessType

    if (!idProcessType) {
      toast.error('El id del tipo de proceso no se encuentra')
      return
    }

    window.open(`${window.location.origin}/builder/${idProcessType}`, '_blank')
  }

  const loading = isLoading || loadingProcess

  return (
    <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
            >
              <Tab
                label='Histórico'
                {...a11yProps(0)}
              />
              <Tab
                label='Procesos relacionados'
                {...a11yProps(1)}
              />
              <Tab
                label='Linea de Tiempo'
                {...a11yProps(2)}
              />
              {privilegeNotification && (
                <Tab
                  label='Creación de Notificaciones'
                  {...a11yProps(3)}
                />
              )}
            </Tabs>
            {isSuperSayayin && (
              <ClassicIconButton
                onClick={handleNavigateToBuilder}
                title='Parametrización'
                placement='bottom'
              >
                <AccountTree />
              </ClassicIconButton>
            )}
          </Box>
          <CustomTabPanel
            value={value}
            index={0}
            className='h-[calc(100%-50px)]'
          >
            <HistoricalStages
              infoActivities={infoActivities?.data}
              isLoading={isLoading}
              idProcess={idProcess}
            />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={1}
            className='h-[calc(100%-50px)]'
          >
            <RelatedProcesses idProcess={idProcess} />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={2}
            className='h-[calc(100%-50px)] overflow-auto'
          >
            <HistoricalTimeLine infoActivities={infoActivities?.data} />
          </CustomTabPanel>
          {privilegeNotification && (
            <CustomTabPanel
              value={value}
              index={3}
              className='h-[calc(100%-50px)]'
            >
              <CreationNotifications
                idProcess={idProcess}
                infoProcess={infoProcess}
                handleCloseTab={handleCloseTab}
                refetch={refetch}
              />
            </CustomTabPanel>
          )}
        </>
      )}
    </Box>
  )
}
export default HistoricalTaskList
