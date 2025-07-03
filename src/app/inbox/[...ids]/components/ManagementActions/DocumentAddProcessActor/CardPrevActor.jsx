import { BackdropLoading, BasicTitle, useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/libV4'
import { Delete } from '@mui/icons-material'
import { Grid, IconButton, LinearProgress, Typography } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const CardPrevActor = ({ keyActorType, idProcess, refetchElementActions }) => {
  const {
    data: processActors,
    isFetching: loadingProcessActors,
    refetch: refetchActors,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors/?inclActorType=true&actorTypeKey=${keyActorType}`,
  })

  const { mutateAsync: deleteActor, isPending: deletingActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors`,
    method: 'delete',
    onSuccess: () => {
      toast.success('Actor eliminado correctamente')
      refetchElementActions?.()
      refetchActors?.()
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al eliminar el actor')
    },
  })

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleDeleteActor = async (idActor) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar actor',
      content: '¿Esta seguro que desea eliminar este actor?',
      onConfirm: () => {
        deleteActor({
          qry: `/${idActor}`,
        })
      },
    })
  }

  return (
    <Grid
      item
      xs={12}
    >
      <BackdropLoading loading={deletingActor} />
      {loadingProcessActors ? (
        <LinearProgress />
      ) : (
        processActors?.data?.length > 0 && (
          <div className='w-full shadow-md rounded-md'>
            <BasicTitle title='Actor registrado previamente' />
            {processActors?.data?.map((actor) => {
              const userInfo = actor?.userActorData
              return (
                <div
                  key={actor?.id}
                  className='grid grid-cols-12 px-4 py-1 items-center'
                >
                  <Typography
                    variant='body1'
                    className='col-span-4'
                  >{`${userInfo?.firstName ?? ''} ${userInfo?.lastName ?? ''}`}</Typography>

                  <Typography
                    variant='body1'
                    className='col-span-4'
                  >
                    {actor?.ActorType?.name ?? ''}
                  </Typography>

                  <div className='col-span-4 flex justify-end'>
                    <IconButton
                      title='Eliminar'
                      onClick={() => handleDeleteActor(actor?.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}
    </Grid>
  )
}

export default CardPrevActor
