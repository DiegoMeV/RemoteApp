import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import {
  BackdropLoading,
  downloadFile,
  useMutationDynamicBaseUrl,
  useValidateDirtyForm,
} from '@/lib'
import toast from 'react-hot-toast'
import MenuMap from './MenuMap'
import { sxMenuItem } from './styles'
import { useCallback, useState } from 'react'
import { useGetIconByType } from '../hooks'
import { useLocation, useSearchParams } from 'react-router-dom'
const MenuItem = ({ item, handleClose = () => {}, getMenuApplications }) => {
  const [isOpen, setIsOpen] = useState(false) // Estado local para controlar la apertura del submenú
  const { mutateAsync: downloadOracleForm, isPending: isPendingOracleForm } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlApps',
      onSuccess: (e) => {
        const fileName = `${item?.label}.jnlp`
        downloadFile(e, fileName, 'application/x-java-jnlp-file')
        toast.success('Formulario descargado correctamente')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al descargar el formulario')
      },
    })
  const validateDirtyForm = useValidateDirtyForm()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const itemId = searchParams.get('itemId')
  const conditionalSelectedOption = pathname.includes(item?.id) || itemId === item?.id
  const dark = useStoreState((state) => state.darkTheme.dark)

  const handleClick = useCallback(async () => {
    const { submenu, isApplication, id, type, module, optionModule, url, path } = item

    const actions = {
      ORACLE_FORM: () =>
        downloadOracleForm({
          qry: `/app-specific/siif-web/${module}/${optionModule}/generate-jnlp`,
          methodBody: 'get',
        }),
      ORACLE_REPORT: () => window.open(url, url),
      DEFAULT: () => {
        validateDirtyForm(path)
        handleClose()
      },
    }

    if (submenu) {
      if (isApplication && id) {
        await getMenuApplications(id)
      }
      setIsOpen((prevIsOpen) => !prevIsOpen)
    } else {
      ;(actions[type] || actions.DEFAULT)()
    }
  }, [item, downloadOracleForm, validateDirtyForm, handleClose, getMenuApplications])
  const icon = useGetIconByType(item?.type, item?.submenu)
  return (
    <Box>
      <BackdropLoading open={isPendingOracleForm} />
      <ListItemButton
        onClick={handleClick}
        sx={sxMenuItem(conditionalSelectedOption, dark)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
      {item.submenu && (
        <Collapse
          in={isOpen}
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
              getMenuApplications={getMenuApplications}
            />
          </List>
        </Collapse>
      )}
    </Box>
  )
}

export default MenuItem
