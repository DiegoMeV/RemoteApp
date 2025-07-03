// DEPRECATED
import { Box } from '@mui/material'
import { sxAccordionStyles } from '../styles'
import { ClassicIconButton } from '@/lib'
import { ElementSwitchButtons } from '.'

const ElementButtons = ({ loadingElement, value, handleChange, iconActions }) => {
  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationBtns}>
      <ElementSwitchButtons
        loadingElement={loadingElement}
        value={value}
        handleChange={handleChange}
      />
      <Box>
        {iconActions.map((action, index) => (
          <ClassicIconButton
            onClick={action.onClick}
            key={index}
            hoverColor={action.hoverColor}
            title={action.title}
            placement='bottom'
            color='default'
            type={action.type}
          >
            {action.icon}
          </ClassicIconButton>
        ))}
      </Box>
    </Box>
  )
}

export default ElementButtons
