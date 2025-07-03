import { a11yProps, CustomModal, CustomTabPanel } from '@/libV4'
import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { Cpc } from './cpc'
import { Cpi } from './cpi'
import { Pac } from './pac'

const tabOptions = {
  borderRadius: '10px 10px 0 0',
  maxHeight: '60px',
}
const ModalBlockDetails = ({
  row,
  open,
  handleClose,
  nit_compania,
  pushDataForm,
  formComponent,
}) => {
  const [valueTab, setValueTab] = useState(0)
  const handleChange = (_, newValue) => {
    setValueTab(newValue)
  }
  const basicData = [
    { label: 'Nombre rubro:', value: row?.nombre_rubro },
    { label: 'Fondo:', value: row?.recurso, bg: true },
    { label: 'Centro de costo:', value: row?.id_centrocosto },
    { label: 'Proyecto:', value: row?.proyecto, bg: true },
  ]

  const tabs = [
    { label: 'CPC', ally: 0 },
    { label: 'Detalle proyecto - CPI', ally: 1 },
    { label: 'Programación de PAC', ally: 2 },
  ]

  const props = {
    row,
    nit_compania,
    pushDataForm,
    formComponent,
  }

  const tabPanelInfo = [
    {
      Component: <Cpc {...props} />,
    },
    {
      Component: <Cpi {...props} />,
    },
    {
      Component: <Pac {...props} />,
    },
  ]
  return (
    <CustomModal
      title='Detalle movimiento presupuestal'
      open={open}
      handleClose={handleClose}
      size='lg'
    >
      <aside className='space-y-10'>
        <section className='flex flex-col'>
          <div className='backgroundGray2 rounded-t-lg p-1 px-4'>
            <h2 className='text-primary-light'>Información básica</h2>
          </div>
          {basicData.map((item, index) => (
            <div
              key={index}
              className={`flex p-1 px-4 ${item.bg ? 'backgroundGray2' : ''}`}
            >
              <h2 className='text-backgroundGray2 text-xs min-w-[120px]'>{item.label}</h2>
              <h2 className='text-gray-700 text-xs'>{item.value}</h2>
            </div>
          ))}
        </section>
        <section className='flex flex-col'>
          <Tabs
            value={valueTab}
            onChange={handleChange}
            sx={tabOptions}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                {...a11yProps(tab.ally)}
              />
            ))}
          </Tabs>
          {tabPanelInfo.map((tab, index) => (
            <CustomTabPanel
              key={index}
              value={valueTab}
              index={index}
              sx={{ backgroundColor: 'backgroundGrey1' }}
            >
              {tab.Component}
            </CustomTabPanel>
          ))}
        </section>
      </aside>
    </CustomModal>
  )
}

export default ModalBlockDetails
