import ElementGeneration from './ElementGeneration'
import { DocumentContainer } from '..'
import { Divider, Typography } from '@mui/material'

const DocumentGeneration = ({
  idAction,
  action,
  ids,
  refetchManagement,
  elementData,
  refetchElementActions,
  idActivityAction,
}) => {
  return (
    <DocumentContainer>
      {elementData?.length > 0 ? (
        elementData?.map((elementAction, index) => {
          return (
            <>
              <ElementGeneration
                idAction={idAction}
                key={index}
                ids={ids}
                elementAction={elementAction}
                idTaskAction={action?.id}
                idActivityAction={idActivityAction}
                refetchManagement={refetchManagement}
                refetchElementActions={refetchElementActions}
              />
              <Divider />
            </>
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

export default DocumentGeneration
