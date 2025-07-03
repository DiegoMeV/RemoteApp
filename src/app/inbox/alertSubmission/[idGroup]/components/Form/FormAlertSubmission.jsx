import { useBoolean, useQueryDynamicApi, useSearch } from '@/lib'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { FormAlertSubmissionStyles } from '../../styles'
import { SelectProcessAlert, SetAlertSubmission, SummaryStep } from './Steps'
import { ModalSummaryRequirements } from '@/app/inbox/requirements/[idGroup]/components'

const FormAlertSubmission = ({
  processTypes,
  step,
  setActiveStep,
  idGroup,
  idProcess,
  processInfo,
  loadingProcessInfo,
  isEdition,
}) => {
  const [stepSelect, setStepSelect] = useState({})
  const idInitialAlert = crypto.randomUUID()
  const [stepAlert, setStepAlert] = useState([
    { id: idInitialAlert, identifier: '', modelo: '', initialDate: '' },
  ])
  const open = useBoolean()
  const searchAlertByProcess = useSearch()

  useEffect(() => {
    searchAlertByProcess.clearSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const {
    data: alertsByProcess,
    isLoading: loadingAlertsByProcess,
    isFetching: fetchingAlertsByProcess,
    refetch: refetchAlertsByProcess,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `alertasProceso?idProceso=${idProcess}&aumentarInfo=true&qryAlerta=${searchAlertByProcess?.searchText}`,
    enabled: !!idProcess,
  })

  return (
    <Grid
      item
      component='section'
      xs={12}
      md={9}
      sx={FormAlertSubmissionStyles}
    >
      {step === 0 && (
        <SelectProcessAlert
          stepVars={{ step, setActiveStep }}
          processTypes={{ data: processTypes }}
          selectVars={{ stepSelect, setStepSelect }}
          idGroup={idGroup}
          processInfo={processInfo?.data?.[0]}
          loadingProcessInfo={loadingProcessInfo}
          isEdition={isEdition}
          idProcess={idProcess}
        />
      )}
      {step === 1 && (
        <SetAlertSubmission
          stepVars={{ step, setActiveStep }}
          selectVars={{ stepSelect, stepAlert, setStepAlert }}
          idProcess={idProcess}
          alertsByProcess={alertsByProcess}
          loadingAlertsByProcess={loadingAlertsByProcess}
          fetchingAlertsByProcess={fetchingAlertsByProcess}
          refetchAlertsByProcess={refetchAlertsByProcess}
          searchAlertByProcess={searchAlertByProcess}
        />
      )}
      {step === 2 && (
        <SummaryStep
          stepVars={{ step, setActiveStep, open }}
          selectVars={{ stepSelect, stepAlert }}
          alertsByProcess={alertsByProcess}
          loadingAlertsByProcess={loadingAlertsByProcess}
          processInfo={processInfo?.data?.[0]}
          searchAlertByProcess={searchAlertByProcess}
          idProcess={idProcess}
        />
      )}
      {open.show && (
        <ModalSummaryRequirements
          open={open.show}
          processIdentifier={{ data: processInfo?.data?.[0] }}
        />
      )}
    </Grid>
  )
}

export default FormAlertSubmission
