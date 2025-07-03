import { Chip } from '@mui/material'

const GenericChipGlobal = ({ params }) => {
  const isActive = params?.isActive
  const chipColor = isActive ? 'primary' : 'secondary'
  return (
    <Chip
      variant='outlined'
      color={chipColor}
      label={isActive ? 'Activo' : 'Inactivo'}
    />
  )
}

export default GenericChipGlobal
