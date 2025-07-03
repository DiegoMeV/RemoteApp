import { DynamicTableAlert, SearchTableWithRequest } from '@/app/applications/components'
import {
  FormGenericHeader,
  NavigationBtnSteps,
} from '@/app/inbox/requirements/[idGroup]/components'
import { SummaryCard } from '@/app/inbox/requirements/[idGroup]/components/Form/components'
import {
  FormGenericContainerStyles,
  FormGenericGridStyles,
  alertsTableContainer,
  alertsTableStyles,
} from '@/app/inbox/requirements/[idGroup]/styles'
import { Box } from '@mui/material'
import { columnsAlertsResume } from './funcs'
import { ContainerInfoAlertStyle } from '../../../styles'
import { TitleSummary } from './components'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { MagicString, useMutationDynamicBaseUrl } from '@/lib'

const SummaryStep = ({
  stepVars,
  alertsByProcess,
  loadingAlertsByProcess,
  processInfo,
  searchAlertByProcess,
  idProcess,
}) => {
  const { step: currentStep, setActiveStep: setStep, open } = stepVars
  const userData = useStoreState((state) => state.user.userData)
  const dependency = userData?.dependencies.find((dep) => dep?.id === processInfo?.idOfficeOrigin)
  const idActivity = processInfo?.pendingActivities?.[0]?.id
  const { mutateAsync: updateActivity, isPending: loadingActivityUpdate } =
    useMutationDynamicBaseUrl({
      url: `/processes/${idProcess}/activities/${idActivity}`,
      method: 'put',
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      onSuccess: async () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        open?.handleShow()
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
        return
      },
    })
  const summaryStepSelect = [
    { label: 'Dependencia', value: dependency?.name || 'No seleccionada' },
    { label: 'Tipo de proceso', value: processInfo?.ProcessType?.name || 'No seleccionada' },
    { label: 'Descripción', value: processInfo?.description ?? '' },
  ]

  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Detalle del resumen' />
      <Box sx={FormGenericContainerStyles}>
        <Box
          sx={FormGenericGridStyles}
          minWidth='100%'
          p={2}
        >
          <TitleSummary title={'Información principal'} />
          {summaryStepSelect.map((item, index) => (
            <SummaryCard
              item={item}
              key={index}
            />
          ))}
        </Box>
        <Box
          sx={FormGenericGridStyles}
          mt='10px'
          width='100%'
          p={2}
        >
          <TitleSummary title={'Alertas vinculadas'} />
          <Box sx={ContainerInfoAlertStyle}>
            <Box
              sx={alertsTableContainer}
              minHeight='400px'
            >
              <SearchTableWithRequest searchOptions={searchAlertByProcess} />
              <Box sx={alertsTableStyles}>
                <DynamicTableAlert
                  columns={columnsAlertsResume ?? []}
                  rows={alertsByProcess?.data ?? []}
                  loading={loadingAlertsByProcess || loadingActivityUpdate}
                  height='calc(50vh - 100px)'
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <NavigationBtnSteps
          currentStep={currentStep}
          setStep={setStep}
          updateActivity={updateActivity}
        />
      </Box>
    </Box>
  )
}

export default SummaryStep
