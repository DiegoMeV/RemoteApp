import CloseIcon from '@mui/icons-material/Close'
import { statusMessageColors, statusMessageIcons, statusMessageTitles } from '../constants'
import '../styles/styles.css'

const StatusMessage = ({ status, message, onClose }) => {
  const IconComponent = statusMessageIcons[status]
  const bgColor = statusMessageColors[status]

  return (
    <div
      className='statusMessageContainer'
      style={{ backgroundColor: bgColor, color: '#828282' }}
    >
      <div className='flex justify-between w-full'>
        <div className='flex items-center space-x-2'>
          <div>{IconComponent && <IconComponent className='w-6 h-6' />}</div>
          <div className='text-left'>
            <strong>{statusMessageTitles[status]}</strong>
            <br />
            <span>{message}</span>
          </div>
        </div>
        {status !== 'EJECUTANDO' && (
          <button
            onClick={onClose}
            className='closeButton'
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </button>
        )}
      </div>
    </div>
  )
}

export default StatusMessage
