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
          color: active ? 'primary' : 'inherit',
          sx: { fontSize: '50px' },
        })
      )}
    </div>
  )
}

export default CustomStepIcon
