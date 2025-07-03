import { ImageCardData } from './components'
import { useRootStore } from './../../store'
import './styles/styles.css'

const LogoCardInfo = ({ children }) => {
  const { dark } = useRootStore()
  const darkBackground = {
    WebkitBoxShadow: '0px 2px 28px -1px rgba(250,250,250,0.82)',
    MozBoxShadow: '0px 2px 28px -1px rgba(250,250,250,0.82)',
    boxShadow: '0px 2px 28px -1px rgba(250,250,250,0.82)',
    background: 'linear-gradient(135deg, rgba(173, 216, 230, 0.2), rgba(70, 130, 180, 0.2))',
  }

  const lightBackground = {
    WebkitBoxShadow: '0px 5px 21px -5px rgba(0,0,0,0.68)',
    MozBoxShadow: '0px 5px 21px -5px rgba(0,0,0,0.68)',
    boxShadow: '0px 5px 21px -5px rgba(0,0,0,0.68)',
    background: 'linear-gradient(135deg, rgba(173, 216, 230, 0.2), rgba(70, 130, 180, 0.2))',
  }

  return (
    <div className='w-full flex justify-center'>
      <div
        className='card'
        style={dark ? darkBackground : lightBackground}
      >
        <div className='card_section_text'>{children}</div>
        <div className='card_section_img'>
          <ImageCardData dark={dark} />
        </div>
      </div>
    </div>
  )
}

export default LogoCardInfo
