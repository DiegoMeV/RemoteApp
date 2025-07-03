import { CheckCircle } from '@mui/icons-material'
import { cloneElement } from 'react'

const CustomStepIcon = (props) => {
  const { active, completed, className, icons } = props

  return (
    <div className={className}>
      {completed ? (
        <CheckCircle
          color='primary'
          sx={{ fontSize: '50px' }}
        />
      ) : (
        cloneElement(icons[String(props.icon)], {
          color: active ? 'primary' : 'secondary',
          sx: { fontSize: '54px' },
        })
      )}
    </div>
  )
}

export default CustomStepIcon
