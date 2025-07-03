import { Chip } from '@mui/material'

const GenericChip = ({ params }) => {
  return (
    <Chip
      variant='outlined'
      color={params?.row?.activo === 'S' ? 'primary' : 'secondary'}
      label={params?.row?.activo === 'S' ? 'Activo' : 'Inactivo'}
    />
  )
}

export default GenericChip
