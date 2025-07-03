import { BackdropLoading, useEditVariableModel } from '@/lib'
import { Switch } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'

const SwitchRequired = ({ params }) => {
  const [checked, setChecked] = useState(params?.row?.requerido ?? false)
  const { mutateAsync: editVarInModel, isPending: loadingUpdate } = useEditVariableModel({
    onSuccess: () => {
      toast.success('Se ha actualizado la variable correctamente')
      setChecked(!checked)
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al actualizar la variable')
    },
  })

  const handleChange = (event) => {
    if (params.row.activo === null || params.row.activo !== 'S') {
      toast.error('No se puede cambiar el estado de una variable inactiva')
      return
    }
    editVarInModel({
      id: params?.row?.variable_modelo_id,
      data: { requerido: event?.target?.checked },
    })
  }
  return (
    <>
      {loadingUpdate && <BackdropLoading loading={loadingUpdate} />}
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'requiredVar' }}
      />
    </>
  )
}

export default SwitchRequired
