import { BackdropLoading, ErrorPage, Loading, useBoolean } from '@/lib'
import { Abstract, RenderActions, ModalFormRegistry, CommentReview } from '../components'
import { Box, Button } from '@mui/material'
import { buttonCenter } from './styles'
import { useFinishManagementFunction } from './hooks'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useIsMutating } from '@tanstack/react-query'

const ViewManagement = ({
  dataManagement,
  ids,
  activityToCreate,
  setActivityToCreate,
  actualActivity,
  setActualActivity,
  onSuccFinMan,
}) => {
  const isMutating = useIsMutating()

  const { activityInfo, refetchManagement, loadingActivities, processInfo, isError, isFetching } =
    dataManagement

  const modalPendingActs = useBoolean()

  const infoGeneralReviewAction = activityInfo?.[0]?.actionsToPerform?.find(
    (action) => action?.actionType === 'GENERAL_REVIEW'
  )

  const [idProcess, idActivity] = ids || []

  const [accordionsState, setAccordionsState] = useState({})

  const modalForm = useBoolean()

  const form = useForm()

  const { handleFinishManagement, isPending } = useFinishManagementFunction({
    activityInfo,
    idProcess,
    idActivity,
    modalPendingActs,
    onSuccFinMan,
  })

  const sortedActionsToPerform = activityInfo?.[0]?.actionsToPerform?.sort(
    (a, b) => a.position - b.position
  )

  return isFetching ? (
    <Loading />
  ) : isError ? (
    <ErrorPage />
  ) : (
    processInfo && (
      <>
        <BackdropLoading loading={isPending} />
        <Box
          overflow='auto'
          height='90%'
          minHeight='510px'
        >
          <Abstract
            dataManagement={dataManagement}
            activityToCreate={activityToCreate}
            setActivityToCreate={setActivityToCreate}
            idProcess={idProcess}
            actualActivity={actualActivity}
            setActualActivity={setActualActivity}
          />
          <CommentReview activityInfo={activityInfo} />

          {loadingActivities ? (
            <Loading />
          ) : (
            sortedActionsToPerform?.map((action, index) => (
              <RenderActions
                key={index}
                ids={ids}
                action={action}
                refetchManagement={refetchManagement}
                form={form}
                accordionsState={accordionsState}
                setAccordionsState={setAccordionsState}
                modalForm={modalForm}
                processInfo={processInfo}
                activityInfo={activityInfo}
              />
            ))
          )}
        </Box>
        {!infoGeneralReviewAction && actualActivity && (
          <Box sx={buttonCenter}>
            <Button
              variant='contained'
              disabled={isMutating > 0}
              onClick={() => {
                handleFinishManagement()
              }}
            >
              Finalizar gestión
            </Button>
          </Box>
        )}

        {modalForm?.show && (
          <ModalFormRegistry
            processInfo={processInfo}
            modalForm={modalForm}
          />
        )}
      </>
    )
  )
}

export default ViewManagement
