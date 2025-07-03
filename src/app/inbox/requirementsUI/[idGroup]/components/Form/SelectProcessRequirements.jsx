import { FormGenericContainer, FormGenericHeader } from '.'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { AutocompleteTypeProcess, TextfieldController } from './components'
import { handleNextStep } from '../../funcs'
import { BackdropLoading, MagicString, useCreateRequirement } from '@/lib'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useStoreState } from 'easy-peasy'
import { AutocompleteDependencies } from '@/app/inbox/requirements/[idGroup]/components/Form/components'

const SelectProcessRequirements = ({
  stepVars,
  processTypes,
  selectVars,
  idProcessParent,
  setProcessCreated,
  idParentActivity,
}) => {
  const { step: currentStep, setActiveStep: setStep } = stepVars
  const { stepSelect, setStepSelect } = selectVars
  const queryClient = useQueryClient()
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: stepSelect,
  })

  const currentValues = getValues()

  const userData = useStoreState((state) => state.user.userData || [])

  const defaultValueDependency =
    userData?.dependencies.length === 1 ? userData?.dependencies[0] : null

  const onSuccessCreateProcess = (response) => {
    const idProcess = response?.data?.id
    setProcessCreated(response?.data)
    if (idProcess) {
      toast.success(MagicString?.REGISTRY?.MESSAGE_CREATED)
      setStepSelect(currentValues)
      handleNextStep(setStep)
      queryClient.invalidateQueries([`/inbox`])
      return
    }
  }

  const { mutateAsync: createProcess, isPending: loadingPendingProcess } = useCreateRequirement({
    qry: '/mode/unnotify',
    onSuccess: onSuccessCreateProcess,
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.REGISTRY.REGISTRY_ERROR_MESSAGE)
    },
  })
  const reqCreate = (data) => {
    const body = {
      idOfficeOrigin: data?.dependency?.id,
      idProcessType: data?.processType?.id,
      description: data?.description ?? '',
      idParentProcess: idProcessParent,
      idParentActivity: idParentActivity,
    }
    createProcess(body)
  }

  const onSubmit = (data) => {
    if (!data?.processType?.id || !data?.dependency?.id) {
      toast.error(MagicString.REGISTRY.REGISTRY_SELECT_PRIORITY_INFO)
      return
    }
    reqCreate(data)
  }

  useEffect(() => {
    setValue('dependency', stepSelect.dependency ?? defaultValueDependency)
  }, [stepSelect, defaultValueDependency, setValue])

  return (
    <Box sx={{ height: '100%' }}>
      <BackdropLoading loading={loadingPendingProcess} />
      <FormGenericHeader title='Selección de proceso' />
      <FormGenericContainer
        onSubmit={handleSubmit(onSubmit)}
        currentStep={currentStep}
        setStep={setStep}
      >
        {/* TODO: Volver estos autocomplete typeProcess y dependencies en genericos */}
        <AutocompleteTypeProcess
          processTypes={processTypes}
          control={control}
          setValue={setValue}
          currentValues={currentValues}
        />
        <AutocompleteDependencies
          control={control}
          setValue={setValue}
          currentValues={currentValues}
        />
        <TextfieldController
          style={{ py: 3, px: 2 }}
          name='description'
          control={control}
          label={'Agregue una descripción'}
          multiline={true}
          minRows={3}
          maxRows={3}
          currentValues={currentValues}
        />
      </FormGenericContainer>
    </Box>
  )
}

export default SelectProcessRequirements
