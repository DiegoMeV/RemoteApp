import { useState } from 'react'
import { Box, IconButton, Tab, Tabs } from '@mui/material'
import HistoricalStages from './HistoricalStages'
import HistoricalTimeLine from './HistoricalTimeLine'
import { RelatedProcesses } from './components'
import { useStoreState } from 'easy-peasy'
import { AccountTree } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { a11yProps, CustomTabPanel, Loading, useQueryDynamicApi } from '@/libV4'

const HistoricalTaskList = ({ idProcess }) => {
  const userData = useStoreState((state) => state.user.userData)

  const isSuperSayayin = userData?.superSaiyayin

  const { data: infoActivities, isFetching: loadingActivities } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}/history`,
  })

  const { data: infoProcess, isFetching: loadingProcess } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}`,
  })

  const [value, setValue] = useState(0)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  const handleNavigateToBuilder = () => {
    if (!isSuperSayayin) return

    const idProcessType = infoProcess?.data?.[0]?.idProcessType

    if (!idProcessType) {
      toast.error('El id del tipo de proceso no se encuentra')
      return
    }

    window.open(`${window.location.origin}/fiscalBuilder/${idProcessType}`, '_blank')
  }

  const loading = loadingActivities || loadingProcess

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
            </Tabs>
            {isSuperSayayin && (
              <IconButton
                onClick={handleNavigateToBuilder}
                title='Parametrización'
                placement='bottom'
              >
                <AccountTree />
              </IconButton>
            )}
          </Box>
          <CustomTabPanel
            value={value}
            index={0}
            className='h-[calc(100%-50px)]'
          >
            <HistoricalStages
              infoActivities={infoActivities?.data}
              isLoading={loading}
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
        </>
      )}
    </Box>
  )
}
export default HistoricalTaskList
