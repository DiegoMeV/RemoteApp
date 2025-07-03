import { a11yProps, usePrivileges } from '@/libV4'
import { Tab, Tabs } from '@mui/material'
import { useStoreState } from 'easy-peasy'

const TabHeader = ({ valueTab, handleChange, isNew }) => {
  const jobTitlePrivilege = usePrivileges('usuarios.usuarios.listar_cargos')
  const rolesPrivilege = usePrivileges('usuarios.usuarios.listar_roles')
  const userData = useStoreState((state) => state.user.userData)

  const superSaiyayin = userData?.superSaiyayin

  return (
    <Tabs
      value={valueTab}
      onChange={handleChange}
      className='backgroundGray2'
    >
      <Tab
        label='Información del usuario'
        {...a11yProps(0)}
      />
      <Tab
        label='Información adicional'
        {...a11yProps(1)}
        disabled={isNew}
      />
      {jobTitlePrivilege && (
        <Tab
          label='Cargos'
          {...a11yProps(2)}
          disabled={isNew}
        />
      )}
      {rolesPrivilege && (
        <Tab
          label='Roles'
          {...a11yProps(3)}
          disabled={isNew}
        />
      )}
      {superSaiyayin && (
        <Tab
          label='Opciones especiales'
          {...a11yProps(4)}
          disabled={isNew}
        />
      )}
      {superSaiyayin && (
        <Tab
          label='Cargar firma'
          {...a11yProps(5)}
          disabled={isNew}
        />
      )}
    </Tabs>
  )
}

export default TabHeader
