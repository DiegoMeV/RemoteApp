import {
  FormGenericContainer,
  FormGenericHeader,
} from '@/app/inbox/requirements/[idGroup]/components'
import {
  AutocompleteDependencies,
  AutocompleteTypeProcess,
  TextfieldController,
} from '@/app/inbox/requirements/[idGroup]/components/Form/components'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BackdropLoading, MagicString, useCreateRequirement } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const SelectProcessAlert = ({
  stepVars,
  processTypes,
  selectVars,
  processInfo,
  loadingProcessInfo,
  isEdition,
}) => {
  const { step: currentStep, setActiveStep: setStep } = stepVars
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { setStepSelect } = selectVars
  const userData = useStoreState((state) => state.user.userData)
  const dependency = userData?.dependencies.find((dep) => dep?.id === processInfo?.idOfficeOrigin)
  const defaultValueDependency =
    userData?.dependencies.length === 1 ? userData?.dependencies[0] : null
  const { control, handleSubmit, setValue, getValues } = useForm()

  useEffect(() => {
    setValue('processType', processInfo?.ProcessType)
    setValue('dependency', defaultValueDependency ?? dependency)
    setValue('description', processInfo?.description)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processInfo, userData, defaultValueDependency])

  const currentValues = getValues()
  const { mutateAsync: createProcess, isPending: loadingPendingProcess } = useCreateRequirement({
    qry: '/mode/unnotify',
    onSuccess: async (response) => {
      const idProcess = response?.data?.id
      if (idProcess) {
        toast.success(MagicString?.REGISTRY?.MESSAGE_CREATED)
        navigate(`?idProcess=${idProcess}&isEdition=true`)
        setTimeout(() => {
          setStep((prev) => prev + 1)
        }, 500)
        queryClient.invalidateQueries([`/inbox`])
        return
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.REGISTRY.REGISTRY_ERROR_MESSAGE)
    },
  })

  const reqCreate = (data) => {
    const body = {
      idOfficeOrigin: data?.dependency?.id,
      idProcessType: data?.processType?.id,
      description: data.description,
    }
    createProcess(body)
  }

  const onSubmit = (data) => {
    if (!data?.processType?.id || !data?.dependency?.id) {
      toast.error(MagicString.REGISTRY.REGISTRY_SELECT_PRIORITY_INFO)
      return
    }
    if (isEdition) {
      setStep(1)
    } else {
      reqCreate(data)
    }
    setStepSelect(data)
  }

  return (
    <Box sx={{ height: '100%' }}>
      <BackdropLoading loading={loadingPendingProcess || loadingProcessInfo} />
      <FormGenericHeader title='Selección de proceso' />
      <FormGenericContainer
        onSubmit={handleSubmit(onSubmit)}
        currentStep={currentStep}
        setStep={setStep}
      >
        <AutocompleteTypeProcess
          control={control}
          processTypes={processTypes}
          disabled={isEdition}
        />
        <AutocompleteDependencies
          control={control}
          setValue={setValue}
          currentValues={currentValues}
          disabled={isEdition}
        />
        <TextfieldController
          style={{ py: 3, px: 2 }}
          name='description'
          control={control}
          label={'Agregue una descripción'}
          disabled={isEdition}
          multiline={true}
          minRows={3}
          maxRows={3}
          currentValues={currentValues}
        />
      </FormGenericContainer>
    </Box>
  )
}

export default SelectProcessAlert
