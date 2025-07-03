import { IconButton } from '@mui/material'

const GenericIconButton = ({ ...props }) => {
  return <IconButton {...props}>{props?.children ?? ''}</IconButton>
}

export default GenericIconButton
