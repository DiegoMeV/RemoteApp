// TO-DO: Change this component
import { Box } from '@mui/material'
import { sxAccordionStyles } from '../../../styles'
import { ClassicIconButton, SelectInput } from '@/lib'
import { ContentSwitch } from '../subcomponentsActions'
import { itemSelectCommnunications } from '../constants'
import { useActionCreateSigedoc } from '../../../hooks'

const ElementCreateSigedoc = ({ element, action, actionItemsInfo }) => {
  const [stateVars, stateFns] = useActionCreateSigedoc({ element, action, actionItemsInfo })

  const { loadingElement, iconActions, control } = stateVars
  const { handleSaveElement, handleSubmit } = stateFns

  return (
    <Box sx={sxAccordionStyles.accordionElementGenerationContainer}>
      <Box
        component='form'
        onSubmit={handleSubmit(handleSaveElement)}
        sx={sxAccordionStyles.accordionElementGeneration}
      >
        <SelectInput
          item={{ ...itemSelectCommnunications, disabled: loadingElement }}
          control={control}
        />
        <Box sx={sxAccordionStyles.accordionElementGenerationBtns}>
          <ContentSwitch control={control} />
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
      </Box>
    </Box>
  )
}

export default ElementCreateSigedoc
