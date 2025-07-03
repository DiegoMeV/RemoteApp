// TO-DO: IMPROVE COMPONENT
import { Box, Button } from '@mui/material'
import { PlaylistAdd } from '@mui/icons-material'
import { sxAccordionStyles, sxSidebarConstructorStyles } from '../styles'
import { useTaskStage } from '../hooks'
import { AccordionTask } from '.'
import {
  BackdropLoading,
  ErrorPage,
  Loading,
  buildQueryStringUserService,
  usePagination,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useState } from 'react'

const TasksContainer = ({ loadingGroup, errorGroupInfo, idApplication }) => {
  const [stateVariables, stateFuntions] = useTaskStage()
  const { taskStage, isLoading, isError, loadingCreate } = stateVariables
  const { handleAddTask, handleDeleteTask, refetchActivities } = stateFuntions

  // TODO: PASAR A UN HOOK
  // Pendiente por mejorar
  const [pageSize, setPageSize] = useState(50)
  const [cursor, setCursor] = useState()

  const searchRole = useSearch()

  const qry = buildQueryStringUserService(pageSize, cursor, searchRole.searchText)

  const {
    data: roles,
    isLoading: loadingRoles,
    isError: rolesError,
  } = useQueryDynamicApi({
    baseKey: 'urlUsers',
    isCompanyRequest: true,
    url: `/roles${qry}`,
  })
  const pagination = usePagination(roles, { setCursor, setPageSize }, loadingRoles)

  if (loadingGroup) {
    return <Loading />
  }

  if (isError || errorGroupInfo) {
    return <ErrorPage />
  }
  return (
    <Box sx={sxSidebarConstructorStyles.btnTasksContainerSidebar}>
      <BackdropLoading loading={loadingCreate || isLoading} />
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={handleAddTask}
        startIcon={<PlaylistAdd />}
        sx={sxAccordionStyles.btnNewTaskStyles}
      >
        Nueva Tarea
      </Button>

      <Box
        rowGap={1}
        sx={sxSidebarConstructorStyles.tasksContainer}
      >
        {taskStage
          .sort((a, b) => a.position - b.position)
          .map((task) => (
            <AccordionTask
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              idApplication={idApplication}
              refetchActivities={refetchActivities}
              roleTable={{
                roles,
                isLoading: loadingRoles,
                searchRole,
                isError: rolesError,
                setCursor,
                pagination,
              }}
            />
          ))}
      </Box>
    </Box>
  )
}

export default TasksContainer
