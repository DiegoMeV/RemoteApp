import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

import { useReactFlow } from 'reactflow'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { MagicString, useUpdateStages } from '@/lib'
import { stageToUpdated } from './funcsFlow'

const useStageData = () => {
  const setStages = useStoreActions((actions) => actions.infoFlowState.setStages)

  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)
  const stages = useStoreState((actions) => actions.infoFlowState.infoFlow.stages)

  const isFiscalBuilder = variationParams?.byActionTypes === 'fiscal'

  const form = useForm()

  const { setNodes } = useReactFlow()

  const [currentStage, setCurrentStage] = useState(null)

  const { mutateAsync: updateStage, isPending: isLoading } = useUpdateStages({
    onSuccess: () => {
      const isFiscalBuilder = variationParams?.byActionTypes === 'fiscal'

      const infoFlowChanged = {
        stages: stages?.map((stage) =>
          stageToUpdated({ stage, getValues: form?.getValues, isFiscalBuilder })
        ),
      }
      setStages(infoFlowChanged)
      setNodes(infoFlowChanged?.stages)

      toast.success(MagicString.CONSTRUCTOR.STAGE_UPDATED)
    },
    onError: (err) =>
      toast.error(err?.response?.data?.error ?? MagicString.CONSTRUCTOR.STAGE_UPDATED_ERROR),
  })

  const filteredDetailsStage = () => {
    if (!stageSelected?.id) return

    const findStagesVar = stages?.find((stage) => {
      return stage?.id === stageSelected?.id
    })

    setCurrentStage(findStagesVar)
    setDefaultValues(findStagesVar)
  }

  // TO-DO: Pending to implement
  // const conditionState = ({ data }) => {
  //   return (
  //     data?.data?.label !== currentStage?.data?.label ||
  //     data?.data?.description !== currentStage?.data?.description ||
  //     data?.data?.isEnabled !== currentStage?.data?.isEnabled ||
  //     (variationParams?.byActionTypes === 'fiscal' &&
  //       data?.data?.idOfficeExec?.id !== currentStage?.data?.idOfficeExec?.id)
  //   )
  // }

  const setDefaultValues = (obj, prefix = '') => {
    Object.entries(obj ?? {}).forEach(([key, value]) => {
      if (isFiscalBuilder && key === 'idOfficeExec') {
        form?.setValue(`${prefix}${key}`, value ?? null)
        return
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        setDefaultValues(value, `${prefix}${key}.`)
      } else {
        form?.setValue(`${prefix}${key}`, value)
      }
    })
  }

  const onSubmit = (data) => {
    if (currentStage?.id !== stageSelected?.id) return

    // TO-DO: Pending to implement
    // const isUpdated = conditionState({ data })
    // if (!isUpdated) {
    //   toast.error(MagicString.CONSTRUCTOR.ERROR_MESSAGE_NO_CHANGES)
    //   return
    // }

    const body = {
      name: data?.data?.label ?? '',
      description: data?.data?.description ?? '',
      isEnabled: data?.data?.isEnabled ?? true,
      ...(isFiscalBuilder && {
        idOfficeExec: data?.data?.idOfficeExec?.id ?? data?.data?.idOfficeExec ?? null,
      }),
    }

    updateStage(body)
  }

  useEffect(() => {
    filteredDetailsStage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageSelected, stages])

  return { isLoading, onSubmit, form }
}
export default useStageData
