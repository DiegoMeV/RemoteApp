import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import {
  BackdropLoading,
  BasicTitle,
  ErrorPage,
  Loading,
  StepperRequirements,
  useBoolean,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/lib'
import { AddOrEditComplainantOrAccused, FormFamilyServices } from '../components'
import {
  inputsStepFiveFamilyServices,
  inputsStepFiveOnly,
  inputsStepOneTwoFamilyServices,
  stepsFamilyServices,
} from '../constants'
import { useProcessInfoFamilyServices, useProcessRequests } from '../hooks'
import toast from 'react-hot-toast'

const ViewFamilyServices = ({
  idGroup,
  idProcessParent,
  idProcessParam,
  idProcessType,
  edition,
  isSubProcess,
}) => {
  const navigate = useNavigate()
  const userData = useStoreState((state) => state.user.userData)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const [idProcess, setIdProcess] = useState(idProcessParam)
  const [activeStep, setActiveStep] = useState(0)
  const [typeTable, setTypeTable] = useState()
  const [rowParams, setRowParams] = useState()
  const [validationComplainant, setValidationComplainant] = useState(false)

  const form = useForm()
  const formModal = useForm()
  const modalOptionsFS = useBoolean()

  const {
    data: parentData,
    isLoading: loadingParentData,
    isError: errorParentData,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `processes/${idProcessParent}`,
    isCompanyRequest: true,
    enabled: !!idProcessParent && idProcessParent !== 'null',
  })

  const {
    processInfo,
    refetchProcessInfo,
    processTypes,
    processGroupsData,
    loadingInfo,
    errorInfo,
  } = useProcessInfoFamilyServices({
    idGroup,
    idProcess,
  })

  const { createProcess, unnotifyProcess, editProcess, loadingRequests } = useProcessRequests({
    idProcess,
    setIdProcess,
    setActiveStep,
    getValues: form.getValues,
    idActivity: processInfo?.data?.[0]?.pendingActivities?.[0]?.id,
    idProcessParent: idProcessParent,
    edition,
    isSubProcess,
    refetchProcessInfo,
    idGroup,
    idProcessType,
  })

  useEffect(() => {
    if (idProcessParent && parentData && !edition) {
      const typeProcess = processTypes?.data?.find((type) => type?.id === idProcessType)

      form.setValue('typeProcess', typeProcess)
      if (Array.isArray(parentData?.data?.[0]?.processData?.additionalData)) {
        parentData?.data?.[0]?.processData?.additionalData?.forEach?.((element) => {
          if (inputsStepOneTwoFamilyServices.includes(element?.id)) {
            form.setValue(`processData.additionalData.${element?.id}`, element?.value ?? '')
          }
        })
        return
      }
      Object.entries(parentData?.data?.[0]?.processData?.additionalData).forEach(([key, value]) => {
        if (inputsStepOneTwoFamilyServices.includes(key)) {
          form.setValue(`processData.additionalData.${key}`, value)
        }
      })
    }
  }, [edition, form, idProcessParent, idProcessType, parentData, processTypes])

  useEffect(() => {
    if (processInfo) {
      form.setValue('typeProcess', processInfo?.data?.[0]?.ProcessType)
      const office = userData?.dependencies?.find(
        (dep) => dep?.id === processInfo?.data?.[0]?.idOfficeOrigin
      )
      form.setValue('office', office)

      if (Array.isArray(processInfo?.data?.[0]?.processData?.additionalData)) {
        processInfo?.data?.[0]?.processData?.additionalData?.forEach?.((element) => {
          if (inputsStepFiveFamilyServices.includes(element.id)) {
            form.setValue(`processData.additionalData.${element?.id}`, element?.value ?? '')
          }
        })
        return
      }
      form.setValue(
        'processData.additionalData',
        processInfo?.data?.[0]?.processData?.additionalData ?? {}
      )
    }
  }, [form, idGroup, idProcessParam, processInfo, processTypes, userData])

  const handleNextStep = (step = 1) => {
    setActiveStep(activeStep + step)
  }

  const { mutateAsync: getProcessInfo, isPending: loadingProcessInfo } = useMutationDynamicBaseUrl({
    url: `/processes`,
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    method: 'get',
  })

  const onSubmit = async (data) => {
    if (Object.keys(data).length !== 0) {
      switch (activeStep) {
        case 1:
          if (idProcess) {
            handleNextStep()
            return
          }
          setConfirmAlertProps({
            open: true,
            icon: 'info',
            title: 'Activar',
            content: 'En este paso se crea el Nro. del expediente, ¿Desea continuar?',
            onConfirm: async () => {
              const { office, typeProcess, processData } = data
              const body = {
                idOfficeOrigin: office?.id,
                idProcessType: typeProcess?.id,
                idParentProcess: isSubProcess ? idProcessParent : null,
                processData: {
                  ...processData,
                  additionalData: { ...processData?.additionalData },
                },
              }
              await createProcess({ body: body })
              form.reset()
            },
          })
          return
        case 4: {
          const additionalData = processInfo?.data?.[0]?.processData?.additionalData

          const objectToValidations = Array.isArray(additionalData)
            ? additionalData?.reduce((acc, item) => {
                if (item?.id && inputsStepFiveOnly.includes(item?.id)) {
                  acc[item?.id] = item?.value
                }
                return acc
              }, {}) || {}
            : inputsStepFiveOnly.reduce((acc, item) => {
                acc[item] = additionalData?.[item] ?? ''
                return acc
              }, {})

          const existValues = Object.values(objectToValidations).some((value) => value !== '')

          if (existValues) {
            handleNextStep()
            return
          }

          if (
            data?.processData?.additionalData.requestType === 'consultancy' ||
            data?.processData?.additionalData.requestType === 'workshop'
          ) {
            const responseProcessInfo = await getProcessInfo({
              qry: `/${idProcess}?inclPendingActs=true`,
            })

            const idActivity = responseProcessInfo?.data?.[0]?.pendingActivities?.[0]?.id

            await unnotifyProcess({
              body: { status: 'COMPLETED' },
              qry: `/${idActivity}/mode/unnotify`,
            })

            editProcess({
              body: {
                status: 'COMPLETED',
                processData: {
                  ...data.processData,
                  additionalData: data?.processData?.additionalData,
                },
              },
            })
            return
          }
          editProcess({
            body: {
              processData: {
                ...data.processData,
                additionalData: data?.processData?.additionalData,
              },
            },
          })
          return
        }
      }
    }
    switch (activeStep) {
      case 2:
        if (validationComplainant) {
          handleNextStep()
          return
        }
        toast.error('Debe agregar al menos un denunciante')
        return
      case 3:
        handleNextStep()
        return
    }

    if (activeStep === stepsFamilyServices.length - 1) {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Finalizar',
        content: 'Al finalizar el proceso será enviado a la bandeja',
        onConfirm: () => {
          navigate(`/inbox`)
        },
      })
    } else {
      setActiveStep(activeStep + 1)
    }
  }
  const handleBackActivity = () => {
    if (activeStep === 0) {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Cancelar',
        content: '¿Está seguro que desea cancelar?',
        onConfirm: () => {
          navigate('/inbox')
        },
      })
    } else if (activeStep === 5 && isSubProcess && edition) {
      setActiveStep(activeStep - 2)
    } else {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <>
      {loadingInfo || loadingParentData ? (
        <Loading />
      ) : errorInfo || errorParentData ? (
        <ErrorPage />
      ) : (
        <Grid
          container
          p={2}
          spacing={2}
        >
          <BackdropLoading loading={loadingRequests || loadingProcessInfo} />
          <Grid
            item
            xs={12}
          >
            <BasicTitle
              title={`Radicando proceso de ${processGroupsData?.data?.[0]?.name ?? ''}`}
              backpath='/inbox'
            />
          </Grid>
          <StepperRequirements
            steps={stepsFamilyServices}
            step={activeStep}
          />
          <FormFamilyServices
            processTypes={processTypes}
            steps={stepsFamilyServices}
            step={activeStep}
            form={form}
            formModal={formModal}
            openModal={(type) => {
              modalOptionsFS?.handleShow()
              setTypeTable(type)
            }}
            handleNextActivity={form.handleSubmit(onSubmit)}
            handleBackActivity={handleBackActivity}
            idProcess={idProcess}
            setRowParams={setRowParams}
            idProcessType={idProcessType}
            setValidationComplainant={setValidationComplainant}
            processInfo={processInfo?.data?.[0] ?? {}}
          />
          {modalOptionsFS.show && (
            <AddOrEditComplainantOrAccused
              modalOptionsFS={modalOptionsFS}
              typeTable={typeTable}
              formModal={formModal}
              idProcess={idProcess}
              rowParams={rowParams}
            />
          )}
        </Grid>
      )}
    </>
  )
}

export default ViewFamilyServices
