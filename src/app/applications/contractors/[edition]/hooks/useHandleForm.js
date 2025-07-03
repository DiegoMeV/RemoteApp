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
 * @property {function} register - The reegister function from react-hook-form for controlling form states.
 * @property {function} handleSubmit - The handleSubmit function from react-hook-form for handling form submission.
 * @property {function} reset - The reset function from react-hook-form for resetting form states.
 */

export const useHandleForm = ({ infoEditing }) => {
  const defaultValues = infoEditing?.data[0]

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nombre_1: defaultValues?.nombre_1,
      nombre_2: defaultValues?.nombre_2,
      apellido_1: defaultValues?.apellido_1,
      apellido_2: defaultValues?.apellido_2,
      tipo_identificacion: defaultValues?.tipo_identificacion,
      nro_identificacion: defaultValues?.nro_identificacion,
    },
  })

  return { register, handleSubmit }
}
