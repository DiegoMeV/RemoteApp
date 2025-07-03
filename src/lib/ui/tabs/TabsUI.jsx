import { Tab, Tabs } from '@mui/material'
//TODO: 
//ESTE COMPONENTE SERA UN COMMON COMPONENT, AGREGAR LA DOCUMENTACION DE ESTE COMPONENTE EN PROXIMO PR

const TabsUI = ({ groupTab }) => {
  const { value, handleChange, arrTabs, isCentered, orientation, variant } = groupTab
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      centered={isCentered}
      orientation={orientation}
      variant={variant}
    >
      {arrTabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            icon={tab.icon}
            iconPosition='start'
            value={tab.value}
            label={tab.label}
          />
        )
      })}
    </Tabs>
  )
}

export default TabsUI
