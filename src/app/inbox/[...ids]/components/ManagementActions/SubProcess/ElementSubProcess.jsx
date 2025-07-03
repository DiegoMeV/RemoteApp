import { Button, Grid } from '@mui/material'
import { ElementContainer, CustomTextfield } from '..'
import { useNavigate } from 'react-router-dom'

const ElementSubProcess = ({ elementAction, ids }) => {
  const [idProcess, idActivity] = ids || []
  const navigate = useNavigate()
  const handleRegistry = () => {
    const filingForm = elementAction?.filingForm
    const filingFormRedirect = elementAction?.ProcessTypeRel?.Group?.filingForm
    const idGroup = elementAction?.ProcessTypeRel?.idGroup
    const idProcessType = elementAction?.ProcessTypeRel?.id

    if (!filingForm) {
      navigate(`/inbox/registry/${idGroup}`)
      return
    }
    if (filingForm === 'familyServices' && idProcessType) {
      navigate(
        `/inbox/${filingForm}?idGroup=${idGroup}&idProcessType=${idProcessType}&idProcessParent=${idProcess}&isSubProcess=true`
      )
      return
    }
    const registryForms = [
      'RegistryIncomingCorrespondence',
      'RegistryOutgoingCorrespondence',
      'RegistryInternalCorrespondence',
    ]
    if (registryForms.includes(filingForm) && idGroup) {
      navigate(
        `/inbox/${filingFormRedirect}?idGroup=${idGroup}&idProcessParent=${idProcess}&idProcessType=${idProcessType}`
      )
      return
    }
    navigate(
      `/inbox/${filingFormRedirect}/${idGroup}?idProcessParent=${idProcess}&idParentActivity=${idActivity}`
    )
  }
  return (
    <ElementContainer isRequired={elementAction.isRequired}>
      <CustomTextfield
        md={10}
        lg={10}
        label='Tipo de proceso'
        value={elementAction ? elementAction?.ProcessTypeRel?.name : ''}
      />
      <Grid
        item
        container
        md={2}
        lg={2}
        justifyContent='flex-end'
      >
        <Button
          variant='contained'
          onClick={handleRegistry}
        >
          Radicar
        </Button>
      </Grid>
    </ElementContainer>
  )
}

export default ElementSubProcess
