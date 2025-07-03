import { Tab, Tabs } from '@mui/material'
import { a11yProps } from '@/lib'

const TabsEditCompany = ({ valueTab, handleChange, isNew }) => {
  return (
    <Tabs
      value={valueTab}
      onChange={handleChange}
      className='backgroundGray2'
    >
      <Tab
        label='Información de la compañia'
        {...a11yProps(0)}
      />
      {!isNew && (
        <Tab
          label='Parámetros de la compañia'
          {...a11yProps(1)}
        />
      )}
    </Tabs>
  )
}

export default TabsEditCompany
