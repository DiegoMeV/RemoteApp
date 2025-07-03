import { LibraryAddOutlined } from '@mui/icons-material'
import { Box, Button, FormControlLabel, Switch } from '@mui/material'
import { sxAccordionStyles } from '../styles'
import { MagicString } from '@/lib'

const ContainerPrimaryActionButtons = ({
  value,
  handleAddElement,
  handleChange,
  disabled = false,
  nonActionsItems = false,
}) => {
  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='space-between'
    >
      {!nonActionsItems && (
        <Button
          variant='contained'
          size='small'
          disabled={disabled}
          startIcon={<LibraryAddOutlined />}
          onClick={handleAddElement}
          sx={sxAccordionStyles.btnNewStyles}
        >
          {MagicString.GENERAL.NEW_ELEMENT_TEXT}
        </Button>
      )}
      <Box>
        <FormControlLabel
          sx={{ m: 0, pl: nonActionsItems ? 0 : 2, pr: 2 }}
          control={
            <Switch
              size='small'
              checked={value?.isRequired}
              onChange={(event) => handleChange(event.target.checked, 'isRequired')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={MagicString.GENERAL.REQUIRED_LABEL}
        />
        <FormControlLabel
          sx={{ width: '70px' }}
          control={
            <Switch
              size='small'
              checked={value?.isEnabled}
              onChange={(ev) => handleChange(ev.target.checked, 'isEnabled')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={
            value?.isEnabled ? MagicString.GENERAL.ACTIVE_LABEL : MagicString.GENERAL.INACTIVE_LABEL
          }
        />
      </Box>
    </Box>
  )
}

export default ContainerPrimaryActionButtons
