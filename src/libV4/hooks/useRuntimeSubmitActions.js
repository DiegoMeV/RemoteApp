import { useSubmitRuntime } from '@/libV4'
import toast from 'react-hot-toast'

const useRuntimeSubmitActions = ({ keyName, getData = () => {} }) => {
  const { mutateAsync: submitRuntime, isPending: loadingSubmit } = useSubmitRuntime({
    qry: `/keyname/${keyName}`,
    onSuccess: () => {
      toast.success('Guardado exitosamente')
      getData()
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al guardar')
    },
  })

  const { mutateAsync: deleteRecord, isPending: deletingRecord } = useSubmitRuntime({
    qry: `/keyname/${keyName}`,
    method: 'delete',
    onSuccess: () => {
      toast.success('Registro borrado exitosamente')
      getData({ isDeleted: true })
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al borrar')
    },
  })

  return {
    submitRuntime,
    loadingSubmit,
    deleteRecord,
    deletingRecord,
  }
}

export default useRuntimeSubmitActions
