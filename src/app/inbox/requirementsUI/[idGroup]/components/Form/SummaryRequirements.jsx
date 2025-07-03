import { Box } from '@mui/material'
import { FormGenericHeader, NavigationBtnSteps } from '.'
import { FormGenericContainerStyles, FormGenericGridStyles } from '../../styles'
import { SummaryCard } from './components'
import {
  BackdropLoading,
  CustomSearchDatagrid,
  MagicString,
  toArray,
  useCreateRequirement,
  useQueryDynamicApi,
  useUpdateActivity,
  // TODO: Temporal change of this generation SIGEDOC
  // useCreateSigedoc,
  // useQueryDynamicApi,
} from '@/lib'
import toast from 'react-hot-toast'
import {
  // TODO: Temporal change of this generation SIGEDOC
  // bodyGenerateSIGEDOC,
  columnsEntitiesSummary,
  requirementsBody,
  summaryCardSelect,
} from '../../funcs'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useQueryClient } from '@tanstack/react-query'
import { TitleSummary } from '@/app/inbox/alertSubmission/[idGroup]/components/Form/Steps/components'
import { ContainerInfoAlertStyle } from '@/app/inbox/alertSubmission/[idGroup]/styles'
import { DynamicTableAlert } from '@/app/applications/components'

const SummaryRequirements = ({
  stepVars,
  basicVars,
  idProcessParent,
  idParentActivity,
  processCreated,
}) => {
  const { step: currentStep, setActiveStep: setStep, setOpen } = stepVars
  const { stepEntities, stepSelect, setProcessIdentifier } = basicVars
  const queryClient = useQueryClient()
  const companyData = useStoreState((state) => state.company.companyData)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const idProcess = processCreated?.id

  const { data: infoProcessCreated, isLoading: loadingProcess } = useQueryDynamicApi({
    url: `/processes/${idProcess}?inclPendingActs=true`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
  })
  const idActivityCreated = infoProcessCreated?.data[0]?.pendingActivities[0]?.id ?? null

  const summarySelect = summaryCardSelect(stepSelect)

  const summaryEntitiesRows = toArray(stepEntities)?.map((resEntity) => {
    return {
      id: resEntity?.id ?? '',
      entity: resEntity?.entity?.name ?? '',
      emails: resEntity?.emails ?? '',
    }
  })

  // TODO: Temporal change of this generation SIGEDOC
  // const onSuccessEvent = (response) => {
  //   setProcessIdentifier(response)
  //   toast.success(MagicString.REGISTRY.MESSAGE_CREATED)
  //   setOpen(true)
  //   queryClient.invalidateQueries([`/${userData?.companies?.[0]?.companyId}/inbox/summary`])
  // }

  // TODO: Temporal change of this generation SIGEDOC
  // const onErrorEvent = (err) => toast.error(err?.response?.data?.error ?? 'Ha ocurrido un error')

  const { updateActivity, loadingActivityUpdate } = useUpdateActivity({
    idProcess: idProcess,
    idActivity: idActivityCreated,
    queryClient,
    companyData,
  })

  const onSuccessEdit = (response) => {
    setProcessIdentifier(response)
    toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
    setOpen(true)
    updateActivity({
      body: {
        status: 'COMPLETED',
      },
    })
  }
  const onErrorEdit = (err) => toast.error(err?.response?.data?.error ?? 'Ha ocurrido un error')

  const { mutateAsync: editProcess, isPending: loadingEdition } = useCreateRequirement({
    qry: `/${processCreated?.id}`,
    method: 'put',
    onSuccess: onSuccessEdit,
    onError: onErrorEdit,
  })

  // TODO: Temporal change of this generation SIGEDOC
  // const onSuccessSigedoc = (response) => {
  //   if (response?.data?.errores) {
  //     toast.error(response?.data?.errores?.mensajeError ?? '')
  //     onErrorEventSigedoc()
  //     return
  //   }
  //   const SIGEDOC = response?.data?.documentoComunicacion ?? {}
  //   const body = requirementsBody(stepSelect, stepEntities, SIGEDOC)
  //   toast.success(response?.data?.documentoComunicacion?.mensaje ?? '')
  //   currentStep !== 3 ? createRequirements(body) : editProcess(body)
  // }

  // TODO: Temporal change of this generation SIGEDOC
  // const onErrorEventSigedoc = () => {
  //   toast.error('No se pudo generar el codigo de seguimiento SIGEDOC')
  //   const body = requirementsBody(stepSelect, stepEntities, null)
  //   editProcess(body)
  // }

  // TODO: Temporal change of this generation SIGEDOC
  // const { mutateAsync: createRequirements, isPending: loadingCreation } = useCreateRequirement({
  //   onSuccess: onSuccessEvent,
  //   onError: onErrorEvent,
  // })

  // TODO: Temporal change of this generation SIGEDOC
  // const { mutateAsync: generateSigedoc, isPending: loadingSigedoc } = useCreateSigedoc({
  //   onSuccess: onSuccessSigedoc,
  //   onError: onErrorEventSigedoc,
  // })

  // TODO: Temporal change of this generation SIGEDOC
  // const { data: moreInfoDependency } = useQueryDynamicApi({
  //   url: `/hierarchy/${stepSelect?.dependency?.id}`,
  //   baseKey: 'urlUsers',
  //   isCompanyRequest: true,
  //   enabled: !!stepSelect?.dependency?.id,
  // })

  const onSubmit = (ev) => {
    ev.preventDefault()
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Radicar',
      content: MagicString.REGISTRY.REGISTRY_CONFIRM_MESSAGE,
      onConfirm: () => {
        //TODO verificar si asunto: 'Envio de documento' debe ser quemado
        //TODO: Temporal block of generation SIGEDOC
        // const body = bodyGenerateSIGEDOC(
        //   { asunto: 'Envio de documento' },
        //   userData,
        //   moreInfoDependency
        // )
        // TODO: params to add - (stepSelect, stepEntities, userData)
        // generateSigedoc(body)
        const body = requirementsBody(stepSelect, stepEntities, '')
        editProcess(body)
        // currentStep !== 3 ? createRequirements(body) : editProcess(body)
      },
    })
  }

  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Detalle del resumen' />
      {/* TODO: Temporal change of this generation SIGEDOC */}
      {/* <BackdropLoading loading={loadingCreation || loadingSigedoc || loadingEdition} /> */}
      <BackdropLoading loading={loadingEdition || loadingActivityUpdate || loadingProcess} />
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
        <Box
          sx={FormGenericGridStyles}
          mt='10px'
          width='100%'
          p={2}
        >
          <TitleSummary title={'Entidades seleccionadas'} />
          <Box sx={ContainerInfoAlertStyle}>
            <DynamicTableAlert
              columns={columnsEntitiesSummary ?? []}
              rows={summaryEntitiesRows ?? []}
              loading={false}
              toolbar={CustomSearchDatagrid}
            />
          </Box>
        </Box>
        <NavigationBtnSteps
          currentStep={currentStep}
          setStep={setStep}
          idProcessParent={idProcessParent}
          idParentActivity={idParentActivity}
        />
      </Box>
    </Box>
  )
}

export default SummaryRequirements
