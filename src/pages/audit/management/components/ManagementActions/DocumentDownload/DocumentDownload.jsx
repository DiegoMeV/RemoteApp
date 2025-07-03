import { DocumentContainer } from '..'
import TableDocuments from './TableDocuments'

const DocumentDownload = ({ action, elementData, ids, name, refetchManagement }) => {
  return (
    <DocumentContainer>
      <TableDocuments
        action={action}
        elementData={elementData}
        ids={ids}
        name={name}
        refetchManagement={refetchManagement}
      />
    </DocumentContainer>
  )
}

export default DocumentDownload
