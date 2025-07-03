import { CustomModal } from '.'

const ModalViewerUrlSigedoc = ({ url, ...otherProps }) => {
  return (
    <CustomModal
      size='lg'
      title={'Codigo SIGEDOC'}
      height='calc(100vh - 135px)'
      {...otherProps}
    >
      <iframe
        src={url}
        style={{ width: '100%', height: '100%' }}
      ></iframe>
    </CustomModal>
  )
}

export default ModalViewerUrlSigedoc
