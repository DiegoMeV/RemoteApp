import { DocumentUploadButton } from '../DocumentUploadButton'
import { DocumentContainer } from '../../..'
import { Box, Divider } from '@mui/material'
import ItemAdditionalDocument from './ItemAdditionalDocument'

const AdditionalDocuments = ({
  errorDocumentsById,
  documents,
  ids,
  refecthDocumentsByActivity,
  handleNewRow,
  handleDelete,
}) => {
  return (
    <>
      {errorDocumentsById ? (
        <Box textAlign='center'>
          {'Ha ocurrido un error, no se pudo traer sus documentos adicionales'}
        </Box>
      ) : (
        <>
          <DocumentUploadButton handleNewRow={handleNewRow} />
          <DocumentContainer>
            {documents?.map((document, index) => {
              return (
                <Box key={document.id}>
                  <ItemAdditionalDocument
                    document={document}
                    ids={ids}
                    index={index}
                    refecthDocumentsByActivity={refecthDocumentsByActivity}
                    handleDelete={() => handleDelete(document?.id)}
                  />
                  <Divider />
                </Box>
              )
            })}
          </DocumentContainer>
        </>
      )}
    </>
  )
}

export default AdditionalDocuments
