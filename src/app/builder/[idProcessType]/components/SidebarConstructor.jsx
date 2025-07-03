import { useEffect } from 'react'
import { useReactFlow } from 'reactflow'
import { useStoreActions, useStoreState } from 'easy-peasy'

import { Box } from '@mui/material'
import { CloseOutlined, NavigateBefore, NavigateNext } from '@mui/icons-material'

import { ClassicIconButton } from '@/lib'
import { SidebarContent, SlideContainer, TooltipBtnSidebar } from '.'
import { TooltipBtnSidebarStyles } from '../styles'
import { fitViewSize } from '../hooks'

const SideBarConstructor = ({ showCloseBtn, idGroup }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  const openSidebar = useStoreState((actions) => actions.reactFlowState.openSidebar)
  const setOpenSidebar = useStoreActions((actions) => actions.reactFlowState.setOpenSidebar)

  const { fitView } = useReactFlow()

  useEffect(() => {
    fitViewSize(fitView)
  }, [openSidebar, fitView])

  return (
    <Box
      width='100%'
      height='100%'
      position='relative'
    >
      {showCloseBtn && openSidebar ? (
        <Box
          position='absolute'
          right='10px'
          borderRadius='50%'
        >
          <ClassicIconButton
            title='Cerrar'
            placement='left'
            onClick={() => {
              if (openSidebar) {
                setOpenSidebar(false)
              }
            }}
          >
            <CloseOutlined sx={TooltipBtnSidebarStyles.closeIconBtn(dark)} />
          </ClassicIconButton>
        </Box>
      ) : openSidebar ? (
        <TooltipBtnSidebar
          title='Contraer'
          style={{ marginLeft: '-20px' }}
          IconComponent={NavigateNext}
          handleClick={() => {
            if (openSidebar) {
              setOpenSidebar(false)
            }
          }}
        />
      ) : (
        <TooltipBtnSidebar
          title='Expandir'
          style={{ right: '-10px' }}
          IconComponent={NavigateBefore}
          handleClick={() => {
            if (openSidebar === false) {
              setOpenSidebar(true)
            }
          }}
        />
      )}
      {openSidebar && (
        <SlideContainer openSidebar={openSidebar}>
          <SidebarContent idGroup={idGroup} />
        </SlideContainer>
      )}
    </Box>
  )
}

export default SideBarConstructor
