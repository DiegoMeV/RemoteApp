import { FileUploadOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

const AdditionalDocumentButton = ({ handleFileUpload, index, handleNoName, fileName }) => {
  return (
    <>
      <input
        type='file'
        accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id={`file-upload-${index}`}
        disabled={!fileName}
      />
      <label htmlFor={`file-upload-${index}`}>
        <Tooltip
          arrow
          title='Cargar documento'
        >
          <IconButton
            color='primary'
            component='span'
            onClick={handleNoName}
          >
            <FileUploadOutlined />
          </IconButton>
        </Tooltip>
      </label>
    </>
  )
}

export default AdditionalDocumentButton
