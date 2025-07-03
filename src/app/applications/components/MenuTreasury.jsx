import { BackdropLoading, useQueryDynamicApi } from '@/lib'
import {
  Badge,
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { Settings, ViewList } from '@mui/icons-material'
import { useStoreState } from 'easy-peasy'
import { itemsTopItemOrder, sxMenuItem } from './styles'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const MenuTreasury = () => {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const queryParams = searchParams.get('q')
  const qry = queryParams ? `?searchString=${queryParams}` : ''
  const { data: treasuryProcessGroups, isFetching: loadingTreasuries } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlApps',
    url: `/app-specific/siif-web/gestion-gasto/pay-order-inbox/menu${qry}`,
    refetchOnWindowFocus: true,
  })
  const group = pathname.split('/').pop()
  const dark = useStoreState((state) => state.darkTheme.dark)

  const handleClickOrder = (item) => {
    const newQueryParams = queryParams ? `?q=${queryParams}` : ''
    if (pathname.includes(item?.grupo)) {
      window.location.href = `/applications/treasury/${item?.grupo}${newQueryParams}`
    } else {
      navigate(`/applications/treasury/${item?.grupo}${newQueryParams}`)
    }
  }

  return (
    <Box ml={0}>
      <BackdropLoading loading={loadingTreasuries} />
      <ListItemButton
        onClick={() => {
          navigate('/applications/treasury')
        }}
        sx={{
          backgroundColor: 'backgroundGrey1',
        }}
      >
        <ListItemIcon>
          <ViewList />
        </ListItemIcon>
        <ListItemText primary='Bandeja ordenes de pago' />
      </ListItemButton>
      <Box
        sx={{
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        }}
      >
        {treasuryProcessGroups?.data?.map((item, index) => {
          const conditionalSelectedOption = group === item?.grupo
          return (
            <Collapse
              key={index}
              in={true}
              timeout='auto'
              unmountOnExit
            >
              <ListItemButton
                key={index}
                sx={{
                  ...sxMenuItem(conditionalSelectedOption, dark),
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                onClick={() => handleClickOrder(item)}
              >
                <Box sx={itemsTopItemOrder}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Settings color='secondary' />
                    <Badge
                      badgeContent={item?.cantPendientes}
                      color='primary'
                      max={9999}
                    />
                  </Box>
                  <Box
                    width='100%'
                    mt={1}
                  >
                    <Typography sx={{ textAlign: 'left' }}>
                      {item?.nomGrupo || item?.grupo || ''}
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </Collapse>
          )
        })}
      </Box>
    </Box>
  )
}

export default MenuTreasury
