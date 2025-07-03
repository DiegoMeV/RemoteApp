import { Tab, Tabs } from '@mui/material'

const AccountTabs = ({ activeTab, handleTabChange }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      indicatorColor='primary'
      textColor='primary'
    >
      <Tab
        label='Perfil'
        value='perfil'
      />
      {/* TODO: Use the history actions for each user 
      <Tab
        label='Historial'
        value='historial'
      /> */}
    </Tabs>
  )
}

export default AccountTabs
