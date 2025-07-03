import { ClassicIconButton, CommonTextField } from '@/lib'
import { MoreVert, Delete, SettingsOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useState } from 'react'
import { handleClickMenu, handleCloseMenu } from '../hooks'
import { MenuTask } from '.'
import { sxAccordionStyles } from '../styles'

const AccordionDescriptionTask = ({
  task,
  stateDataTask,
  handleChange,
  handleDeleteTask,
  ActivityParamsStates,
}) => {
  const [anchorEl, setAnchorEl] = useState({
    settings: null,
  })
  const openMenu = {
    settings: Boolean(anchorEl.settings),
  }

  const menuOptionsSettings = [
    {
      label: 'Configuración',
      disabled: false,
      icon: <SettingsOutlined />,
      handleClick: (event) => {
        ActivityParamsStates.handleShow()
        handleCloseMenu(event, 'settings', setAnchorEl, anchorEl)
      },
    },
    {
      label: 'Borrar tarea',
      disabled: false,
      icon: <Delete />,
      handleClick: (event) => {
        handleDeleteTask(task.id, task.name)
        handleCloseMenu(event, 'settings', setAnchorEl, anchorEl)
      },
    },
  ]

  return (
    <Box sx={sxAccordionStyles.accordionDescriptionTaskContainer}>
      <CommonTextField
        label='Descripción de la tarea'
        value={stateDataTask.description}
        name='description'
        id={`${task.id}_input_description_task_editor`}
        multiline
        minRows={2}
        maxRows={4}
        handleChange={(event) => {
          handleChange(event.target.value, 'description')
        }}
        handleClick={(ev) => ev.stopPropagation()}
      />
      <ClassicIconButton
        onClick={(event) => handleClickMenu(event, 'settings', setAnchorEl, anchorEl)}
        title='Configuración'
        placement='bottom'
        color='default'
      >
        <MoreVert />
      </ClassicIconButton>
      {openMenu && (
        <MenuTask
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          openMenu={openMenu}
          showMenu={openMenu.addAction ? 'addAction' : 'settings'}
          menuOptions={menuOptionsSettings}
          task={task}
          horizontalPosition='right'
        />
      )}
    </Box>
  )
}

export default AccordionDescriptionTask
