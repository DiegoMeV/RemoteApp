import { AccordionDescriptionTask, AccordionGeneralReview, ButtonAddAction } from '.'
import { AccordionDetails, Box } from '@mui/material'
import { sxAccordionStyles } from '../styles'
import { GenericAutocomplete } from '@/lib'

const AccordionDetailsTask = ({
  task,
  stateDataTask,
  handleChange,
  handleDeleteTask,
  handleToggle,
  ActivityParamsStates,
  anchorEl,
  setAnchorEl,
  openMenu,
  typesMenu,
  idApplication,
  optionsRoles,
  actions,
  setActions,
  refetchActions,
}) => {
  const handleChangeRole = (event) => {
    handleChange(event.target.value, 'roleName')
    optionsRoles.handleSearchRole(event.target.value)
  }

  const roleValue =
    stateDataTask?.idRole && stateDataTask?.roleName
      ? {
          id: stateDataTask.idRole,
          name: stateDataTask.roleName,
        }
      : null

  const renderedActions = actions
    ?.sort((a, b) => a.position - b.position)
    .map((action, index) => (
      <Box
        key={`${action.id}-${index}`}
        sx={{ width: '100%' }}
      >
        <AccordionGeneralReview
          data={action}
          actionType={action?.actionType}
          actionInfo={{ actions, setActions, refetchActions }}
          idApplication={idApplication}
        />
      </Box>
    ))

  return (
    <AccordionDetails>
      <GenericAutocomplete
        autocompleteProps={{
          //TODO: Quitar openModal, sin afectar GenericAutocomplete
          openModal: handleToggle,
          value: roleValue,
          options: optionsRoles?.roles || [],
          //TODO: Quitar loadingOptions, sin afectar GenericAutocomplete
          loadingOptions: optionsRoles?.isLoading || false,
          onChange: (_, newValue) => {
            optionsRoles.selectRol(newValue)
          },
          sx: {
            '& .MuiInputBase-root': {
              backgroundColor: 'transparent',
            },
            pb: 1,
          },
        }}
        textFieldProps={{
          label: 'Rol de la tarea',
          onChange: handleChangeRole,
        }}
      />
      <Box sx={sxAccordionStyles.accordionContainerDetails}>
        <AccordionDescriptionTask
          ActivityParamsStates={ActivityParamsStates}
          task={task}
          stateDataTask={stateDataTask}
          handleChange={handleChange}
          handleDeleteTask={handleDeleteTask}
          handleOpenRoleTable={handleToggle}
        />
      </Box>
      <ButtonAddAction
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        openMenu={openMenu}
        menuOptionsActions={typesMenu}
        task={task}
      />
      <Box
        display='flex'
        flexDirection='column'
        rowGap={1}
      >
        {renderedActions}
      </Box>
    </AccordionDetails>
  )
}

export default AccordionDetailsTask
