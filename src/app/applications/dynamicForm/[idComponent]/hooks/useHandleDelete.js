import { useExecuteAction } from '@/app/applications/hooks/useExecuteAction'
import { encodeKeys, encodeString, iterationNumber } from '@/libV4'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import { getObjectToDelete, getPksKeys } from '../funcs'

export const useHandleDelete = ({ refetch = () => {}, pksProps, dbTable }) => {
  const numIterations = iterationNumber()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const scheme = dbTable?.split('.')[0]
  const tableName = dbTable?.split('.')[1]
  const pks = getPksKeys(pksProps)

  const { executeAction, isPendingExecute: isDeleting } = useExecuteAction({
    shema: scheme,
    tableName: tableName,
    numIterations,
    onSuccessFunc: (e) => {
      refetch()
      toast.success(e?.msg ?? 'Eliminación exitosa')
    },
  })
  const deleteData = async (data) => {
    await executeAction({
      body: {
        action: encodeString(numIterations, 'delete'),
        where: encodeKeys(data, numIterations),
      },
    })
  }
  const confirmDelete = async ({ data }) => {
    const dataToDelete = getObjectToDelete({ pks, data })
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Eliminar registro',
      content: `¿Está seguro de eliminar este registro?`,
      onConfirm: () => deleteData(dataToDelete),
    })
  }

  return { confirmDelete, isDeleting }
}
