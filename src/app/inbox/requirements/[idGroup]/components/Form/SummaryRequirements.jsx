import { Box } from '@mui/material'
import { FormGenericHeader, NavigationBtnSteps } from '.'
import { FormGenericContainerStyles, FormGenericGridStyles } from '../../styles'
import { SummaryCard } from './components'
import { BackdropLoading, MagicString, useCreateRequirement } from '@/lib'
import toast from 'react-hot-toast'
import {
  requirementsBody,
  summaryCardBasic,
  summaryCardProcessTypeOrigin,
  summaryCardSelect,
} from '../../funcs'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useQueryClient } from '@tanstack/react-query'

const SummaryRequirements = ({ stepVars, basicVars }) => {
  const { step: currentStep, setActiveStep: setStep, setOpen } = stepVars
  const { stepBasic, stepSelect, setProcessIdentifier } = basicVars

  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const summarySelect = summaryCardSelect(stepSelect)

  const summaryBasicData = summaryCardBasic(stepBasic)

  const summaryTpeOrigin = summaryCardProcessTypeOrigin(stepSelect)

  const onSuccessEvent = (response) => {
    setProcessIdentifier(response)
    toast.success(MagicString.REGISTRY.MESSAGE_CREATED)
    setOpen(true)
    queryClient.invalidateQueries([`/${companyData?.companyId}/inbox/summary`])
  }

  const onErrorEvent = (err) => toast.error(err?.response?.data?.error ?? 'Ha ocurrido un error')

  const { mutateAsync: createRequirements, isPending: loadingCreation } = useCreateRequirement({
    onSuccess: onSuccessEvent,
    onError: onErrorEvent,
  })

  const onSubmit = (ev) => {
    ev.preventDefault()
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Radicar',
      content: MagicString.REGISTRY.REGISTRY_CONFIRM_MESSAGE,
      onConfirm: () => {
        const body = requirementsBody(stepSelect, stepBasic)
        createRequirements(body)
      },
    })
  }

  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Detalle del resumen' />
      <BackdropLoading loading={loadingCreation} />
      <Box
        component='form'
        onSubmit={onSubmit}
        sx={FormGenericContainerStyles}
      >
        <Box
          sx={FormGenericGridStyles}
          minWidth='100%'
        >
          {summarySelect.map((item, index) => (
            <SummaryCard
              item={item}
              key={index}
            />
          ))}
        </Box>
        {stepSelect?.relatedRequirements && (
          <Box
            sx={FormGenericGridStyles}
            minWidth='100%'
          >
            {summaryTpeOrigin.map((item, index) => (
              <SummaryCard
                item={item}
                key={index}
              />
            ))}
          </Box>
        )}
        <Box
          sx={FormGenericGridStyles}
          minWidth='100%'
        >
          {summaryBasicData.map((item, index) => (
            <SummaryCard
              item={item}
              key={index}
            />
          ))}
        </Box>
        <NavigationBtnSteps
          currentStep={currentStep}
          setStep={setStep}
        />
      </Box>
    </Box>
  )
}

export default SummaryRequirements
