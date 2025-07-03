import { Folder, ViewList } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
//import AccessControl from '@/app/AccessControl' TODO
import { optionMenuModule } from '../styles'
import { useMenuApplication } from '@/lib'
import { useLocation, useNavigate } from 'react-router-dom'

const MenuItem = ({ item, handleClose = () => {} }) => {
  const navigate = useNavigate()
  const setTypeModule = useStoreActions((actions) => actions.moduleTypeSelected.setTypeModule)
  const { pathname } = useLocation()
  const conditionalSelectedOption = pathname.includes(item?.path)

  const setOpenedOptions = useStoreActions((actions) => actions.menuModules.setOpenedOptions)
  const dark = useStoreState((state) => state.darkTheme.dark)
  const openedOptions = useStoreState((state) => state.menuModules.openedOptions)
  const open = openedOptions?.includes(item.id)

  const handleClick = async () => {
    if (item.submenu) {
      if (openedOptions.includes(item.id)) {
        const newOpenedOptions = openedOptions.filter((id) => id !== item.id)
        setOpenedOptions(newOpenedOptions)
      } else {
        setOpenedOptions([...openedOptions, item.id])
      }
    } else {
      await setTypeModule(item.typeModule)
      navigate('/modules')
      handleClose()
    }
  }

  return (
    <Box>
      <ListItemButton
        onClick={handleClick}
        sx={{
          backgroundColor: conditionalSelectedOption
            ? dark === 'dark'
              ? '#ffffff26'
              : '#D6E7FE'
            : 'transparent',
        }}
      >
        <ListItemIcon>{item?.icon ?? item?.submenu ? <Folder /> : <ViewList />}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
      {item.submenu && (
        <Collapse
          in={open}
          timeout='auto'
          unmountOnExit
          sx={{ pl: '20px' }}
        >
          <List
            component='div'
            disablePadding
          >
            <MenuMap
              items={item.submenu}
              handleClose={handleClose}
            />
          </List>
        </Collapse>
      )}
    </Box>
  )
}

const MenuMap = ({ items, handleClose }) => (
  <Box>
    {items.map((item, index) => (
      <MenuItem
        key={index}
        item={item}
        handleClose={handleClose}
      />
    ))}
  </Box>
)

const ModuleMenuOptions = ({ handleClose }) => {
  const { data: dataMenu, isLoading } = useMenuApplication()
  const newMenu =
    dataMenu?.data?.map((item) => ({
      id: item?.id,
      label: item?.optionName,
      typeModule: item?.idComponent,
    })) || []

  return (
    <Box height={'100%'}>
      <ListSubheader
        component='div'
        sx={optionMenuModule}
      >
        Módulos
      </ListSubheader>
      {isLoading ? (
        <Box sx={{ display: 'flex', paddingLeft: '20px' }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <MenuMap
          items={newMenu || []}
          handleClose={handleClose}
        />
      )}
    </Box>
  )
}

export default ModuleMenuOptions
