import { useQueryClient } from '@tanstack/react-query'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const useButtonsForNavigation = ({
  setActiveStep,
  setErrorInfo,
  infoProcess,
  basicDataProcess,
  activeStep,
  isAnyRequiredFieldEmpty,
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const navigate = useNavigate()
  const handleCancel = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cancelar',
      content: '¿Esta seguro que desea cancelar la radicación?',
      onConfirm: () => {
        navigate('/inbox')
      },
    })
  }
  const handleBack = () => {
    if (!basicDataProcess && activeStep === 2) {
      setActiveStep(0)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  const handleValidationNext = () => {
    if (infoProcess.dependenciesSelected && infoProcess.processSelected && activeStep === 0) {
      if (infoProcess.processSelected?.typeSpecs?.additionalData?.length > 0) {
        setActiveStep(1)
      } else {
        setActiveStep(2)
      }
    } else if (!isAnyRequiredFieldEmpty && activeStep === 1) {
      setActiveStep(2)
    } else if (activeStep === 2) {
      queryClient.invalidateQueries([`/${companyData?.companyId}/inbox/summary`])
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Radicar',
        content: '¿Esta seguro que desea radicar este proceso?',
        onConfirm: () => {
          setActiveStep(3)
        },
      })
    } else {
      setErrorInfo(true)
    }
  }
  return [handleCancel, handleBack, handleValidationNext]
}

export default useButtonsForNavigation
