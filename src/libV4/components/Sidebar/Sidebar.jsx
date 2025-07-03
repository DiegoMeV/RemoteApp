import { useState } from 'react'
import { ClassicIconButton } from '../../ui'
import { NavigateBeforeOutlined, NavigateNextOutlined } from '@mui/icons-material'
import './styles/styles.css'
import { sidebarButton } from './styles'

const Sidebar = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const containerClassName = isOpen ? 'min-w-[288px]' : 'w-4'
  const buttonClassName = isOpen ? 'left-[270px]' : ''

  return (
    <section
      className={`container-sidebar backgroundwhite1 h-[calc(100vh-65px)] ${containerClassName} ${className}`}
    >
      <div className={`absolute z-10 ${buttonClassName} top-8`}>
        <ClassicIconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={sidebarButton}
        >
          {isOpen ? <NavigateBeforeOutlined /> : <NavigateNextOutlined />}
        </ClassicIconButton>
      </div>
      <div className={`h-full ${isOpen ? '' : 'hidden'}`}>{children}</div>
    </section>
  )
}

export default Sidebar
