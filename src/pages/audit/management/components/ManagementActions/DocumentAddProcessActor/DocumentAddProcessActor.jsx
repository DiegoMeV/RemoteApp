import { Typography } from '@mui/material'
import { DocumentContainer } from '..'
import ElementAssignment from './ElementAddAddProcessActor'

const DocumentAddProcessActor = ({
  elementData,
  idActivityAction,
  ids,
  refetchManagement,
  refetchElementActions,
}) => {
  return (
    <DocumentContainer>
      {elementData.length > 0 ? (
        elementData?.map((elementAction, index) => {
          return (
            <ElementAssignment
              key={index}
              elementAction={elementAction}
              idTaskAction={elementAction.idTaskAction}
              ids={ids}
              refetchManagement={refetchManagement}
              idActivityAction={idActivityAction}
              refetchElementActions={refetchElementActions}
            />
          )
        })
      ) : (
        <Typography variant='body1'>
          Revisar parametrización, esta acción no contiene elementos.
        </Typography>
      )}
    </DocumentContainer>
  )
}

export default DocumentAddProcessActor
