import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
/**
 * Custom hook to handle form state and effects.
 *
 * @param {Object} infoEditing - The information for editing.
 * @property {Array} infoEditing.data - The data array from the editing information.
 * @property {string} infoEditing.data[0].nombre - The name from the editing item.
 * @property {string} infoEditing.data[0].activo - The active status from the editing item.
 * @property {string} infoEditing.data[0].descripcion - The description from the editing item .
 *
 * @returns {Object} The control, handleSubmit function from react-hook-form, and reset function.
 * @property {function} control - The control function from react-hook-form for controlling form states.
 * @property {function} handleSubmit - The handleSubmit function from react-hook-form for handling form submission.
 * @property {function} reset - The reset function from react-hook-form for resetting form states.
 */

export const useHandleForm = (infoEditing) => {
  const { control, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (infoEditing?.data) {
      reset({
        nombre: infoEditing.data[0]?.nombre,
        activo: infoEditing.data[0]?.activo === 'S' ? true : false,
        descripcion: infoEditing.data[0]?.descripcion,
      })
    }
  }, [infoEditing, reset])

  return { control, handleSubmit }
}
