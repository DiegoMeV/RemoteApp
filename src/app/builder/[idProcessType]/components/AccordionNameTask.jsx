import { Save } from '@mui/icons-material'
import { Box, FormControlLabel, Switch, TextField } from '@mui/material'
import { ClassicIconButton, CommonTextField } from '@/lib'
import { sxAccordionStyles } from '../styles'
import { conditionStateTask } from '../hooks'
import toast from 'react-hot-toast'

const AccordionNameTask = ({ task, stateDataTask, handleChange, handleSaveTask }) => {
  const handleSubmit = (ev) => {
    ev.stopPropagation()
    if (!conditionStateTask(task, stateDataTask)) {
      toast.error('No hay cambios por agregar')
      return
    }
    const { roleName, ...dataBody } = stateDataTask
    handleSaveTask(task, dataBody, roleName)
  }

  return (
    <Box sx={sxAccordionStyles.accordionNameTaskContainer}>
      <TextField
        label='Posición'
        value={stateDataTask.position}
        name='position'
        size='small'
        id={`${task.id}_input_position_task_editor`}
        onChange={(event) =>
          handleChange(event.target.value ? parseInt(event.target.value) : '', 'position')
        }
        onClick={(ev) => ev.stopPropagation()}
        type='number'
        sx={{ width: '100px' }}
      />
      <CommonTextField
        label='Nombre de la tarea'
        value={stateDataTask.name}
        name='name'
        id={`${task.id}_input_name_task_editor`}
        handleChange={(event) => handleChange(event.target.value, 'name')}
        handleClick={(ev) => ev.stopPropagation()}
      />
      <ClassicIconButton
        onClick={handleSubmit}
        title='Guardar tarea'
        placement='bottom'
        color='default'
      >
        <Save />
      </ClassicIconButton>
      <FormControlLabel
        sx={{ width: '70px' }}
        onClick={(ev) => ev.stopPropagation()}
        control={
          <Switch
            size='small'
            checked={stateDataTask.isEnabled}
            onChange={(ev) => handleChange(ev.target.checked, 'isEnabled')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={stateDataTask.isEnabled ? 'Activo' : 'Inactivo'}
      />
    </Box>
  )
}

export default AccordionNameTask
