import { safeExecute } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const useFormLifecycle = ({ form, dataBlock, preFormEvent }) => {
  const [dataBlockEdit, setDataBlockEdit] = useState([])
  const isDirtyForm = useStoreActions((state) => state.isDirtyForm.setIsDirtyForm)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (form.formState.isDirty) {
        const message =
          'Tienes cambios sin guardar en el formulario. ¿Estás seguro de querer salir?'
        e.preventDefault()
        e.returnValue = message
        return message
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [form.formState.isDirty])

  useEffect(() => {
    if (form.formState.isDirty) {
      isDirtyForm(true)
    } else {
      isDirtyForm(false)
    }
  }, [form.formState.isDirty, isDirtyForm])

  useEffect(() => {
    ;(async () => {
      if (dataBlock) setDataBlockEdit(dataBlock)
      try {
        if (preFormEvent) {
          const result = await safeExecute(preFormEvent)

          if (result === null) {
            toast.error('Error al ejecutar el evento preForm')
          }
        }
      } catch (error) {
        toast.error(`Error al ejecutar el evento preForm - ${error}`)
      }
    })()
  }, [dataBlock, preFormEvent, setDataBlockEdit])

  return { dataBlockEdit, setDataBlockEdit }
}

export default useFormLifecycle
