import { CustomModal, GenericTable } from '@/lib/ui'
import { Box, Button, Typography } from '@mui/material'
import { useMemo } from 'react'

const ModalPendingActivities = ({
  modalPendingActs: { show },
  handleCloseModalPendingActivities,
  pendingActivities,
}) => {
  const hasPendingActivities = !!pendingActivities?.length

  const columns = useMemo(
    () => [
      { field: 'task', headerName: 'Actividad', width: 200 },
      { field: 'firstName', headerName: 'Usuario asignado', width: 200 },
    ],
    []
  )

  const rows = useMemo(
    () =>
      pendingActivities.map((item) => ({
        id: item.id,
        task: item?.Task?.name,
        firstName: item?.assignedToUserData
          ? `${`${item?.assignedToUserData?.firstName ?? ''} ${
              item?.assignedToUserData?.lastName ?? ''
            }`}`
          : `${item?.userOfficeData?.depencyName ?? ''}`,
      })),
    [pendingActivities]
  )

  return (
    <CustomModal
      open={show}
      handleClose={handleCloseModalPendingActivities}
      title={hasPendingActivities ? 'Usuarios notificados' : 'Sin usuarios notificados'}
      height={hasPendingActivities ? '400px' : '200px'}
      maxHeight={hasPendingActivities ? '80vh' : '60vh'}
      size='sm'
      minHeight={200}
    >
      {hasPendingActivities ? (
        <GenericTable
          columns={columns}
          rows={rows}
          sx={{ height: '300px', maxHeight: '60vh' }}
        />
      ) : (
        <Typography
          variant='h5'
          px={2}
          py={4}
          sx={{ height: '100px' }}
        >
          No hay actividades por notificar
        </Typography>
      )}

      <Box
        mt={2}
        display='flex'
        justifyContent='flex-end'
        sx={{ position: 'relative' }}
      >
        <div>
          <Button
            onClick={handleCloseModalPendingActivities}
            variant='contained'
            color='primary'
            fullWidth
          >
            Cerrar
          </Button>
        </div>
      </Box>
    </CustomModal>
  )
}

export default ModalPendingActivities
