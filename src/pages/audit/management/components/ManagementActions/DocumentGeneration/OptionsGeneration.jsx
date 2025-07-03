import { ClassicIconButton } from '@/lib'
import {
  ContentPasteGo,
  EditNoteOutlined,
  PostAddOutlined,
  ReportGmailerrorredOutlined,
} from '@mui/icons-material'
import { Box } from '@mui/material'
import toast from 'react-hot-toast'
import { getIdsDocument } from '../funcs'
import { useStoreActions } from 'easy-peasy'

const OptionsGeneration = ({ elementAction, handleShow, handleCancelDocument }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { idDocument } = getIdsDocument(elementAction)

  const isDocumentGenerated = elementAction?.activityActionItemData?.documentVersionData
    ? true
    : false

  return (
    <div className='general_form_item lg:col-span-2'>
      <Box
        display='flex'
        justifyContent='flex-end'
      >
        {elementAction?.docVersionData ? (
          <ClassicIconButton
            title='Editar'
            onClick={handleShow}
          >
            <EditNoteOutlined />
          </ClassicIconButton>
        ) : (
          <ClassicIconButton
            title='Generar'
            onClick={() => {
              if (elementAction?.templateData?.id) {
                handleShow()
              } else {
                toast.error(
                  'No se puede generar el documento, no se ha seleccionado un tipo de documento en la etapa anterior'
                )
              }
            }}
          >
            <PostAddOutlined />
          </ClassicIconButton>
        )}
        <ClassicIconButton
          title={isDocumentGenerated ? 'Visualizar' : ''}
          disabled={!isDocumentGenerated}
          onClick={async () => {
            setPreviewer({
              open: true,
              idDocument: idDocument,
              loadingPreviewer: true,
            })
          }}
        >
          <ContentPasteGo />
        </ClassicIconButton>
        <ClassicIconButton
          title={isDocumentGenerated ? 'Anular' : ''}
          disabled={!isDocumentGenerated}
          onClick={handleCancelDocument}
        >
          <ReportGmailerrorredOutlined color={isDocumentGenerated ? 'error' : ''} />
        </ClassicIconButton>
      </Box>
    </div>
  )
}

export default OptionsGeneration
