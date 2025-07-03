import { ContentPasteGo, Download } from '@mui/icons-material'
import { ClassicIconButton } from '@/lib'
import { Chip } from '@mui/material'

const TemplateItemButtons = ({
  template,
  modalBooleanDoc,
  handleClickOptionDocument,
  isDocxDocument,
}) => {
  return (
    <div className='buttonContainer'>
      <Chip
        label={template ? '+' + template?.cantidadVersiones : ''}
        color='success'
        sx={{ fontSize: '18px' }}
      />
      <ClassicIconButton
        title='Descargar'
        onClick={(e) => {
          handleClickOptionDocument(e, true)
        }}
      >
        <Download />
      </ClassicIconButton>
      <div style={{ width: '40px', textAlign: 'center' }}>
        {!isDocxDocument && (
          <ClassicIconButton
            title='Visualizar'
            onClick={(e) => {
              handleClickOptionDocument(e, false)
              modalBooleanDoc.handleShow()
            }}
          >
            <ContentPasteGo />
          </ClassicIconButton>
        )}
      </div>
    </div>
  )
}

export default TemplateItemButtons
