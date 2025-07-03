import {
  BackdropLoading,
  BasicTitle,
  DataGridCustom,
  DrawerEdition,
  useBoolean,
  useGetProcess,
  useMutationDynamicBaseUrl,
  usePrivileges,
} from '@/libV4'
import { AddActor } from '../components'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'
import { useQueryClient } from '@tanstack/react-query'
import { actorsColumns } from '../funcs'

const ViewActors = ({ idProcess }) => {
  const { data: processInfo } = useGetProcess({ qry: `/${idProcess}` })

  const queryClient = useQueryClient()

  const openEdition = useBoolean({
    confirmModalProps: {
      icon: 'warning',
      title: '¿Estás seguro de cancelar?',
    },
  })

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const { mutateAsync: deleteActor, isPending: deletingActor } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/actors`,
    method: 'delete',
    onSuccess: () => {
      toast.success('Actor eliminado correctamente')
      queryClient.invalidateQueries({
        queryKey: [`/processes/${idProcess}/actors/?inclActorType=true`],
        exact: true,
      })
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al eliminar el actor')
    },
  })

  const handleDeleteActor = async (idActor) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar actor',
      content: '¿Está seguro que desea eliminar este actor?',
      onConfirm: () => {
        deleteActor({
          qry: `/${idActor}`,
        })
      },
    })
  }

  const deletePrivilege = usePrivileges('procesos.actores.borrar')

  const columns = actorsColumns(deletePrivilege, handleDeleteActor)

  return (
    <div className='flex flex-col p-6 w-full items-center'>
      <BackdropLoading loading={deletingActor} />
      <BasicTitle
        title={`Actores del proceso: ${processInfo?.data?.[0]?.identifier ?? ''}`}
        backpath={-1}
      />
      <div className='backgroundGray1 w-full'>
        <DataGridCustom
          requestProps={{
            baseKey: 'urlProcess',
            url: `/processes/${idProcess}/actors/?inclActorType=true`,
            isPaginated: false,
          }}
          tableProps={{
            divClassName: 'col-span-12 h-[calc(100vh-250px)]',
            columns: columns,
          }}
          toolbarProps={{
            buttonProps: {
              onClick: () => openEdition.handleShow(),
              privilege: 'procesos.actores.crear',
            },
          }}
        />
      </div>
      {openEdition.show && (
        <DrawerEdition
          open={openEdition.show}
          onClose={() => openEdition.handleShowConfirm()}
          width={600}
          title='Agregar actor'
        >
          <AddActor
            idProcess={idProcess}
            onSuccess={() => {
              openEdition.handleShow()
              queryClient.invalidateQueries({
                queryKey: [`/processes/${idProcess}/actors/?inclActorType=true`],
                exact: true,
              })
            }}
            onCancel={() => openEdition.handleShowConfirm()}
          />
        </DrawerEdition>
      )}
    </div>
  )
}

export default ViewActors
