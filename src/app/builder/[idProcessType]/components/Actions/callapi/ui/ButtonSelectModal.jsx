import { DescriptionOutlined, SettingsOutlined } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

const ButtonSelectModal = ({ handleOpenClose, setEspecificInfoModal }) => {
  const handleTypeModal = (name) => {
    setEspecificInfoModal(name)
    handleOpenClose()
  }
  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='flex-end'
      gap='10px'
      mb={1}
      mt={2}
    >
      <Button
        size='small'
        endIcon={<DescriptionOutlined />}
        onClick={() => {
          handleTypeModal('body')
        }}
        variant='contained'
      >
        BODY
      </Button>
      <Button
        size='small'
        endIcon={<SettingsOutlined />}
        onClick={() => {
          handleTypeModal('headers')
        }}
        variant='contained'
      >
        HEADER
      </Button>
    </Box>
  )
}

export default ButtonSelectModal
