import { CustomAccordion, ErrorPage, Loading } from '@/lib'
import { Typography } from '@mui/material'
import { icons } from './constants'
import { actionComponents, doubleActions } from './funcs'
import { useState } from 'react'
import { useProcessFunctions } from './ManagementActions/hooks'

const ChooseActions = ({
  action,
  ids,
  refetchManagement,
  form,
  elementData,
  loadingElements,
  errorElements,
  refetchElementActions,
  fechingElementActions,
  accordionsState,
  onChangeAccordion,
  modalForm,
  dataManagement,
  specificAction,
}) => {
  const [idProcess, idActivity] = ids
  const ActionComponent = actionComponents[action?.actionType]

  const DoubleActionComponent =
    doubleActions[action?.actionType] || (() => <Typography>Acción no encontrada</Typography>)

  const Icon = icons[action?.actionType] || (() => <Typography>Icono no encontrado</Typography>)

  const idActivityAction = action?.activityActionData?.id

  const [idActivityActionLocal, setIdActivityActionLocal] = useState(idActivityAction)

  const propsToElements = {
    idAction: action?.id,
    action,
    name: action?.name,
    ids,
    refetchManagement,
    elementData,
    refetchElementActions,
    fechingElementActions,
    form,
    idActivityAction: idActivityAction ?? idActivityActionLocal,
    accordionsState,
    modalForm,
    processInfo: dataManagement?.processInfo,
    activityInfo: dataManagement?.activityInfo,
    setIdActivityActionLocal,
    dataManagement,
  }

  const onSuccessUpdateProcess = async (response) => {
    setIdActivityActionLocal(response?.data?.id)
  }

  const { updateProcess, isPendingUpdateProcess } = useProcessFunctions(
    idProcess,
    idActivity,
    null,
    null,
    onSuccessUpdateProcess
  )

  const onChangeAcordionWithRequest = () => {
    onChangeAccordion()

    if (
      !idActivityAction &&
      !idActivityActionLocal &&
      (elementData?.[0]?.idTaskAction || action?.id)
    ) {
      updateProcess({
        idTaskAction: elementData?.[0]?.idTaskAction ?? action?.id,
      })
      return
    }
  }

  const loading = loadingElements || fechingElementActions || isPendingUpdateProcess

  return (
    <>
      {ActionComponent ? (
        <CustomAccordion
          title={action?.name ?? 'Acción sin nombre'}
          icon={<Icon color='primary' />}
          badge={action?.ActionItems?.length ?? ''}
          expandedValue={accordionsState}
          onClickAccordion={onChangeAcordionWithRequest}
        >
          {specificAction ? (
            <ActionComponent {...propsToElements} />
          ) : loading ? (
            <Loading />
          ) : errorElements ? (
            <ErrorPage />
          ) : (
            <>
              <ActionComponent {...propsToElements} />
            </>
          )}
        </CustomAccordion>
      ) : (
        <>
          {errorElements ? (
            <ErrorPage />
          ) : (
            <DoubleActionComponent
              {...propsToElements}
              accordionsState={accordionsState}
              onChangeAccordion={onChangeAcordionWithRequest}
            />
          )}
        </>
      )}
    </>
  )
}

export default ChooseActions
