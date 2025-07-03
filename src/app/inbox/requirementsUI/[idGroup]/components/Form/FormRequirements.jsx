import { Grid } from '@mui/material'
import {
  // TEMPORAL CHANGE
  // DocumentsSupport,
  RelatedEntitiesForm,
  SelectProcessRequirements,
  SummaryRequirements,
} from '.'
import { useState } from 'react'
import { ModalSummaryRequirements } from '@/app/inbox/requirements/[idGroup]/components'

const FormRequirements = ({
  processTypes,
  step,
  setActiveStep,
  idProcessParent,
  idParentActivity,
}) => {
  const [stepSelect, setStepSelect] = useState({})
  const initialEntity = crypto.randomUUID()
  const [stepEntities, setStepEntities] = useState([{ id: initialEntity, entity: '', emails: '' }])
  const [processIdentifier, setProcessIdentifier] = useState({})
  const [open, setOpen] = useState(false)
  const [processCreated, setProcessCreated] = useState({})

  return (
    <Grid
      item
      component='section'
      xs={12}
      md={9}
      sx={{
        pt: 1,
        pl: 1.5,
        pr: { xs: 1.5, md: 5 },
      }}
    >
      {step === 0 && (
        <SelectProcessRequirements
          stepVars={{ step, setActiveStep }}
          processTypes={processTypes}
          selectVars={{ stepSelect, setStepSelect }}
          idProcessParent={idProcessParent}
          setProcessCreated={setProcessCreated}
          idParentActivity={idParentActivity}
        />
      )}
      {step === 1 && (
        <RelatedEntitiesForm
          stepVars={{ step, setActiveStep }}
          basicVars={{ stepEntities, setStepEntities }}
        />
      )}
      {/* TEMPORAL CHANGE BLOCK THIS STEP */}
      {/* {step === 2 && idProcessParent && idParentActivity && (
        <DocumentsSupport
          stepVars={{ step, setActiveStep, setOpen }}
          idProcessParent={idProcessParent}
          idParentActivity={idParentActivity}
          processCreated={processCreated}
        />
      )} */}
      {/* {step === 2 && (!idProcessParent || !idParentActivity) && ( */}
      {step === 2 && (
        <SummaryRequirements
          stepVars={{ step, setActiveStep, setOpen }}
          basicVars={{ stepEntities, stepSelect, setProcessIdentifier }}
          idProcessParent={idProcessParent}
          idParentActivity={idParentActivity}
          processCreated={processCreated}
        />
      )}
      {/* {step === 3 && idProcessParent && idParentActivity && (
        <SummaryRequirements
          stepVars={{ step, setActiveStep, setOpen }}
          basicVars={{ stepEntities, stepSelect, setProcessIdentifier }}
          idProcessParent={idProcessParent}
          idParentActivity={idParentActivity}
          processCreated={processCreated}
        />
      )} */}
      {open && (
        <ModalSummaryRequirements
          open={open}
          processIdentifier={processIdentifier}
          // TEMPORAL CHANGE BLOCK GENERATION SIGEDOC
          // isSigedocSummary={true}
          isSigedocSummary={false}
        />
      )}
    </Grid>
  )
}

export default FormRequirements
