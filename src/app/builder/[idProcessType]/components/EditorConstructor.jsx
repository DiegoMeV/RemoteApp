import { useStoreState } from 'easy-peasy'
import { ReactFlowProvider } from 'reactflow'

import { Grid } from '@mui/material'

import { FlowStructure, SideBarConstructor } from '.'
import { ContentConstructorStyles } from '../styles'

const EditorConstructor = ({ showCloseBtn, idGroup }) => {

  const openSidebar = useStoreState((actions) => actions.reactFlowState.openSidebar)

  return (
    <Grid
      container
      component='article'
      className={ContentConstructorStyles.mainSectionFlow}
    >
      <Grid
        item
        xs={openSidebar ? 0 : 12}
        sm={openSidebar ? 0 : 12}
        md={openSidebar ? 6 : 12}
        component='article'
      >
        {showCloseBtn && openSidebar ? null : (
          <FlowStructure />
        )}
      </Grid>
      <Grid
        item
        xs={openSidebar ? 12 : 0}
        sm={openSidebar ? 12 : 0}
        md={openSidebar ? 6 : 0}
        component='aside'
      >
        <SideBarConstructor
          showCloseBtn={showCloseBtn}
          idGroup={idGroup}
        />
      </Grid>
    </Grid>
  )
}
const FlowWrapperEditor = (props) => {
  return (
    <ReactFlowProvider>
      <EditorConstructor {...props} />
    </ReactFlowProvider>
  )
}

export default FlowWrapperEditor
