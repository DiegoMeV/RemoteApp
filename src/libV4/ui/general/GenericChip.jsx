import { Chip } from '@mui/material'

const GenericChip = ({ color, label }) => {
  return (
    <div className='flex justify-center'>
      <Chip
        variant='outlined'
        color={color ?? 'primary'}
        label={label ?? ''}
      />
    </div>
  )
}

export default GenericChip
