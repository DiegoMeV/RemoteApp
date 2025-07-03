import { Grid } from '@mui/material'
import {
  BasicDataRequirements,
  ModalSummaryRequirements,
  SelectProcessRequirements,
  SummaryRequirements,
} from '.'
import { useState } from 'react'

const FormRequirements = ({ processTypes, step, setActiveStep, infoGroup }) => {
  const [stepSelect, setStepSelect] = useState({})
  const [stepBasic, setStepBasic] = useState({})

  const [processIdentifier, setProcessIdentifier] = useState({})
  const [open, setOpen] = useState(false)

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
          infoGroup={infoGroup}
        />
      )}
      {step === 1 && (
        <BasicDataRequirements
          stepVars={{ step, setActiveStep }}
          basicVars={{ stepBasic, setStepBasic }}
        />
      )}
      {step === 2 && (
        <SummaryRequirements
          stepVars={{ step, setActiveStep, setOpen }}
          basicVars={{ stepBasic, stepSelect, setProcessIdentifier }}
        />
      )}
      {open && (
        <ModalSummaryRequirements
          open={open}
          processIdentifier={processIdentifier}
          isSigedocSummary={false}
          isParentOrigin={stepSelect?.relatedRequirements ?? false}
          infoStep={stepSelect}
        />
      )}
    </Grid>
  )
}

export default FormRequirements
