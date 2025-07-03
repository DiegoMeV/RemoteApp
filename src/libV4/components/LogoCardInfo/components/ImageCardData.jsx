import { svgs } from '../../../assets'

const ImageCardData = (props) => {
  return (
    <img
      src={!props?.dark ? svgs.verticalSynchroxLogo : svgs.verticalSynchroxLogoBlack}
      alt='Synchrox Logo'
      width={'190px'}
    />
  )
}

export default ImageCardData
