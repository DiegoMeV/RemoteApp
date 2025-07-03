import { Box } from '@mui/material'
import { StageSidebarContainer, TasksContainer } from '.'
import { sxSidebarConstructorStyles } from '../styles'
import { useProcessTypeByGroup } from '@/lib'
import { useStoreState } from 'easy-peasy'

const SidebarContent = ({ idGroup }) => {
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)

  // TO-DO: Quitar este req de este componente usarlo solamente en Subprocess ACTIONTYPE
  const {
    data: infoGroup,
    isLoading: loadingGroup,
    isError: errorGroupInfo,
  } = useProcessTypeByGroup({
    qry: `${idGroup}`,
    enabled: !!idGroup,
  })

  const idApplication = infoGroup?.data?.[0]?.idApplication

  return (
    <Box sx={sxSidebarConstructorStyles.containerSidebar}>
      {stageSelected?.id && (
        <>
          <StageSidebarContainer />
          <TasksContainer
            loadingGroup={loadingGroup}
            errorGroupInfo={errorGroupInfo}
            idApplication={idApplication}
          />
        </>
      )}
      {/* TO-DO: PONER UN MENSAJE MAS PERSONALIZADO Y ESTILIZADO */}
      {!stageSelected?.id && <h3>Escoge una etapa...</h3>}
    </Box>
  )
}

export default SidebarContent
