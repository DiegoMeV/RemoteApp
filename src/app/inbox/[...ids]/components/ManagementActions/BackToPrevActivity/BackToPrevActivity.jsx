import { BackdropLoading, GenericForm, useQueryDynamicApi } from '@/libV4'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { inputsBackToPrevAc } from './funcs'
import { useProcessModifyItem } from '../hooks'
import { useStoreActions } from 'easy-peasy'
import { useEffect } from 'react'
import { ErrorPage, Loading } from '@/lib'

const BackToPrevActivity = ({ ids, idAction, idActivityAction, accordionsState }) => {
  const {
    data: elementsData,
    isLoading: loadingElementData,
    isError: errorLoadingElements,
    refetch: refetchElements,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    url: `/processes/activity-actions/${idActivityAction}/items`,
    enabled: accordionsState,
  })

  const elementAction = elementsData?.data?.[0]

  const [idProcess] = ids || []

  const { control, handleSubmit, setValue } = useForm()

  useEffect(() => {
    if (elementAction) {
      setValue('activity', elementAction?.TaskRel)
      setValue('observation', elementAction?.observation)
    }
  }, [elementAction, setValue])

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const validationInputs = !!elementAction?.idTaskRel

  const inputs = inputsBackToPrevAc(idProcess, idAction, validationInputs)

  const onSuccessModifyItem = () => {
    refetchElements()
  }

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    null,
    onSuccessModifyItem,
    null
    // onErrorAditional
  )

  const onSubmit = (data) => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '¿Estás seguro?',
      content: '¿Estás seguro de querer volver a la actividad anterior?',
      onConfirm: () => {
        modifyItemInformation({
          idActivityAction,
          body: {
            idTaskRel: data.activity.id,
            observation: data.observation,
          },
        })
      },
    })
  }

  return loadingElementData ? (
    <Loading />
  ) : errorLoadingElements ? (
    <ErrorPage />
  ) : (
    <>
      <BackdropLoading loading={loadingItemCreation} />
      <div className='general_form_container'>
        <GenericForm
          inputs={inputs}
          control={control}
        />
        <div className='col-span-12 flex justify-end'>
          <Button
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            disabled={validationInputs}
          >
            Notificar
          </Button>
        </div>
      </div>
    </>
  )
}

export default BackToPrevActivity
