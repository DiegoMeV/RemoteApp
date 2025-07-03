import { BackdropLoading, BasicTitle, ErrorPage, Loading, useBoolean } from '@/lib'
import {
  ContentManagement,
  Abstract,
  RenderActions,
  ModalFormRegistry,
  InfoReceived,
  CommentReview,
  ModalPendingActivities,
} from '../components'
import { Box, Button } from '@mui/material'
import { buttonCenter, containerManagement } from './styles'
import { useFinishManagementFunction } from './hooks'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import { useIsMutating } from '@tanstack/react-query'

const ViewManagement = ({ dataManagement, ids }) => {
  const isMutating = useIsMutating()

  const { activityInfo, refetchManagement, processInfo, isError, isFetching } = dataManagement
  const { userData } = useStoreState((state) => state.user || {})
  const navigate = useNavigate()
  const modalPendingActs = useBoolean()
  const [pendingActivities, setPendingActivities] = useState([])
  const infoGeneralReviewAction = activityInfo?.[0]?.actionsToPerform?.find(
    (action) => action?.actionType === 'GENERAL_REVIEW'
  )

  const [idProcess, idActivity] = ids || []

  const [accordionsState, setAccordionsState] = useState({})

  const modalForm = useBoolean()

  const form = useForm()

  const { handleFinishManagement, isPending, loadingPendingActs } = useFinishManagementFunction({
    activityInfo,
    idProcess,
    idActivity,
    setPendingActivities,
    modalPendingActs,
  })

  const sortedActionsToPerform = activityInfo?.[0]?.actionsToPerform?.sort(
    (a, b) => a.position - b.position
  )

  const handleCloseModalPendingActivities = async () => {
    modalPendingActs?.handleShow()
    if (userData?.id === pendingActivities?.[0]?.assignedToUserData?.id) {
      setAccordionsState({})
      await refetchManagement()
      await navigate(`/inbox/${idProcess}/${pendingActivities?.[0]?.id}`)
    } else {
      navigate(`/inbox`)
    }
  }

  return (
    <ContentManagement>
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        activityInfo &&
        processInfo && (
          <>
            <BackdropLoading loading={loadingPendingActs} />
            <Box sx={containerManagement}>
              <BasicTitle
                title='Gestión'
                backpath='/inbox'
              />
              <BackdropLoading loading={isPending} />
              <Box
                overflow='auto'
                minHeight='400px'
                height='calc(100vh - 200px)'
              >
                <Abstract dataManagement={dataManagement} />
                {!!activityInfo?.[0]?.activityData?.idEntidad && (
                  <InfoReceived activityData={activityInfo?.[0]?.activityData} />
                )}
                <CommentReview activityInfo={activityInfo} />

                {sortedActionsToPerform?.map((action, index) => (
                  <RenderActions
                    key={index}
                    ids={ids}
                    action={action}
                    refetchManagement={refetchManagement}
                    form={form}
                    accordionsState={accordionsState}
                    setAccordionsState={setAccordionsState}
                    modalForm={modalForm}
                    dataManagement={dataManagement}
                  />
                ))}
              </Box>
              {!infoGeneralReviewAction && (
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
            </Box>
          </>
        )
      )}
      {modalForm?.show && (
        <ModalFormRegistry
          processInfo={processInfo}
          modalForm={modalForm}
        />
      )}
      {modalPendingActs.show && (
        <ModalPendingActivities
          modalPendingActs={modalPendingActs}
          handleCloseModalPendingActivities={handleCloseModalPendingActivities}
          pendingActivities={pendingActivities}
        />
      )}
    </ContentManagement>
  )
}

export default ViewManagement
