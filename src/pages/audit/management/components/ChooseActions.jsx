import { Typography } from '@mui/material'

import { CustomAccordion, ErrorPage, Loading } from '@/lib'
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
  processInfo,
  activityInfo,
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
    processInfo,
    activityInfo,
    setIdActivityActionLocal,
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

  const loading = loadingElements || fechingElementActions || isPendingUpdateProcess

  const onChangeAccordionWithUpdateProcess = (_, state) => {
    onChangeAccordion()
    if (
      !idActivityAction &&
      !idActivityActionLocal &&
      (elementData?.[0]?.idTaskAction || action?.id) &&
      state
    ) {
      updateProcess({
        body: { idTaskAction: elementData?.[0]?.idTaskAction ?? action?.id },
      })
    }
  }

  return (
    <>
      {ActionComponent ? (
        <CustomAccordion
          title={action?.name ?? 'Acción sin nombre'}
          icon={<Icon color='primary' />}
          badge={action?.ActionItems?.length ?? ''}
          expandedValue={accordionsState}
          onClickAccordion={onChangeAccordionWithUpdateProcess}
        >
          {loading ? (
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
              onChangeAccordion={onChangeAccordionWithUpdateProcess}
            />
          )}
        </>
      )}
    </>
  )
}

export default ChooseActions
