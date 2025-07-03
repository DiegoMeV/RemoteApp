import { CircularProgress, Switch } from '@mui/material'
import { useState } from 'react'
import { useApiCreateUpdateVariables } from './funcs'

const SwitchActiveVariables = ({ idBlock, idEdition, ...params }) => {
  const [checked, setChecked] = useState(params?.row?.activo === 'S' ? true : false)
  const { postActiveVariable, putActiveVariable, loading } = useApiCreateUpdateVariables({
    setChecked,
    checked,
  })
  const handleChange = (event) => {
    if (params?.row?.activo === null && params?.row?.variable_modelo_id === null) {
      postActiveVariable({
        bloque_id: idBlock,
        variable_id: params?.row?.variable_id,
        modelo_id: idEdition,
        activo: event.target.checked ? 'S' : 'N',
      })
    } else {
      putActiveVariable({
        id: params.row.variable_modelo_id,
        data: { activo: event.target.checked ? 'S' : 'N' },
      })
    }
  }
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Switch
          color='primary'
          inputProps={{ 'aria-label': 'primary checkbox' }}
          checked={checked}
          onChange={handleChange}
        />
      )}
    </>
  )
}

export default SwitchActiveVariables
