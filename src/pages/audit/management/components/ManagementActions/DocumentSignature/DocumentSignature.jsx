import { Typography } from '@mui/material'
import { DocumentContainer } from '..'
import ElementSignature from './ElementSignature'

const DocumentSignature = ({
  action,
  ids,
  refetchManagement,
  elementData,
  idActivityAction,
  refetchElementActions,
}) => {
  return (
    <DocumentContainer>
      {elementData?.length > 0 ? (
        elementData?.map((elementAction, index) => {
          return (
            <ElementSignature
              key={index}
              idAction={action.id}
              elementAction={elementAction}
              idTaskAction={elementAction?.idTaskAction ?? ''}
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

export default DocumentSignature
