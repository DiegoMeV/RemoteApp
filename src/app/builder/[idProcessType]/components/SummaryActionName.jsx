import { CommonTextField } from '@/lib'
import { Box, TextField } from '@mui/material'

const SummaryActionName = ({ icon, handleChange, value, data }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      width='85%'
      columnGap={2}
    >
      {icon}
      <TextField
        label='Posición'
        value={value?.position}
        name='position'
        size='small'
        id={`${data?.id}_input_position_action`}
        onChange={(event) =>
          handleChange(event.target.value ? parseInt(event.target.value) : '', 'position')
        }
        onClick={(ev) => ev.stopPropagation()}
        type='number'
        sx={{ width: '100px' }}
      />
      <CommonTextField
        label='Nombre de la acción'
        value={value?.name}
        name='name'
        id={`${data?.id}_input_name_action`}
        handleChange={(event) => {
          handleChange(event.target.value, 'name')
        }}
        handleClick={(ev) => ev.stopPropagation()}
      />
    </Box>
  )
}

export default SummaryActionName
