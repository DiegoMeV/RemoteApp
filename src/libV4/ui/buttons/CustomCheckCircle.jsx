import { CheckCircle } from '@mui/icons-material'
import ClassicIconButton from './ClassicIconButton'

const CustomCheckCircle = ({ handleClick, isMatch }) => {
  return (
    <ClassicIconButton
      title='Asignar'
      color='success'
      onClick={handleClick}
      disabled={isMatch}
    >
      <CheckCircle />
    </ClassicIconButton>
  )
}

export default CustomCheckCircle
