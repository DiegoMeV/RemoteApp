import ElementGeneration from './ElementGeneration'
import { DocumentContainer } from '../'
import { Divider, Typography } from '@mui/material'

const DocumentGeneration = ({
  idAction,
  action,
  ids,
  refetchManagement,
  elementData,
  refetchElementActions,
  idActivityAction,
  dataManagement,
}) => {
  return (
    <DocumentContainer>
      {elementData?.length > 0 ? (
        elementData?.map((elementAction, index) => {
          return (
            <>
              <ElementGeneration
                key={index}
                ids={ids}
                idAction={idAction}
                elementAction={elementAction}
                idTaskAction={action?.id}
                idActivityAction={idActivityAction}
                refetchManagement={refetchManagement}
                refetchElementActions={refetchElementActions}
                dataManagement={dataManagement}
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
