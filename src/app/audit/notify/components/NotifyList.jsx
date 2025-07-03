import { ArrowForwardIos, NotificationsOff } from '@mui/icons-material'
import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { itemButton } from '../styles/styles'
import { isEmpty, useQueryDynamicApi } from '@/lib'
import { ErrorPage, LoadingSkeleton } from '@/libV4'
import { useNavigate } from 'react-router-dom'

const NotifyList = () => {
  const navigate = useNavigate()
  const { data, isFetching, isError } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    url: `/event-notifications/user/own`,
  })

  const TypeAlerts = {
    PROCESS_ALERT: 'Alerta de procesos',
    PROCESS_TRANSFER: 'Transferencia de procesos',
  }

  const dark = useStoreState((state) => state.darkTheme.dark)
  const handleListItemClick = (index) => {
    if (data?.data[index].eventNotification?.idMassiveActivity) {
      navigate(`/audit/notify/${data?.data[index].eventNotification?.idMassiveActivity}`)
    }
  }

  if (isFetching) {
    return <LoadingSkeleton />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <List>
      {data?.data?.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-80 gap-2'>
          <NotificationsOff
            color='disabled'
            sx={{ fontSize: 60 }}
          />
          <Typography
            variant='body1'
            color='textSecondary'
          >
            No se ha encontrado ninguna notificación
          </Typography>
        </div>
      ) : (
        data?.data?.map((notificacion, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleListItemClick(index)}
            sx={itemButton(dark)}
            disableTouchRipple={!data?.data[index].eventNotification?.idMassiveActivity}
          >
            <ListItemText
              primary={
                <Typography
                  variant='subtitle1'
                  color='primary'
                >
                  {TypeAlerts[notificacion.eventNotification?.notifType]}
                </Typography>
              }
              secondary={notificacion.eventNotification?.description}
              sx={{ mr: 3 }}
            />
            {!isEmpty(data?.data[index].eventNotification?.idMassiveActivity) && (
              <ArrowForwardIos
                color='primary'
                fontSize='large'
              />
            )}
          </ListItemButton>
        ))
      )}
    </List>
  )
}

export default NotifyList
