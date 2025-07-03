import { useStoreActions, useStoreState } from 'easy-peasy'
import { useOptionsConstructor } from '../hooks'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import VerticalIcon from '@mui/icons-material/SwapVerticalCircleOutlined'
import HorizontalIcon from '@mui/icons-material/SwapHorizontalCircleOutlined'
import { Menu } from '@mui/icons-material'

const AdvancedOptionsConstructor = () => {
  const orientation = useStoreState((actions) => actions.stateOrientation.orientation)
  const setOrientation = useStoreActions((actions) => actions.stateOrientation.setOrientation)

  const { open, onOpen, onClose } = useOptionsConstructor()

  return (
    <SpeedDial
      ariaLabel='more advanced options button'
      icon={<Menu />}
      onOpen={onOpen}
      onClose={onClose}
      open={open}
      direction='down'
    >
      {/* TODO: <SpeedDialAction
        icon={<BackupIcon color='primary' />}
        tooltipTitle={'publicar'}
        onClick={openClose}
      /> */}
      <SpeedDialAction
        icon={
          orientation === 'vertical' ? (
            <VerticalIcon color='primary' />
          ) : (
            <HorizontalIcon color='primary' />
          )
        }
        tooltipTitle={'orientacion'}
        onClick={setOrientation}
      />
    </SpeedDial>
  )
}

export default AdvancedOptionsConstructor
