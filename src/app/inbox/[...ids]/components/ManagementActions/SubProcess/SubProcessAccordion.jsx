import { DocumentContainer } from '..'
import { Divider, Typography } from '@mui/material'
import ElementSubProcess from './ElementSubProcess'

const SubProcessAccordion = ({ action, elementData, ids, refetchManagement }) => {
  return (
    <DocumentContainer>
      {elementData?.length > 0 ? (
        elementData?.map((elementAction, index) => {
          return (
            <>
              <ElementSubProcess
                key={index}
                index={index}
                elementAction={elementAction}
                idTaskAction={action.idTaskAction}
                ids={ids}
                refetchManagement={refetchManagement}
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
export default SubProcessAccordion
