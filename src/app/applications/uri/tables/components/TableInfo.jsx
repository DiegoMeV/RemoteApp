import { BackdropLoading, ErrorPage, Loading, useMutationDynamicBaseUrl } from '@/lib'
import { Card } from '@mui/material'
import { getInfoTable } from '../funcs'
import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { actionReviewTable } from '../constants'
import toast from 'react-hot-toast'
import { TabOptions, TabsRender } from './ModalReview'

const TableInfo = ({ tableRequest, informativeModal, refetchTables }) => {
  const idTable = tableRequest?.data?.data?.[0].id

  const userData = useStoreState((state) => state.user.userData)

  const idUser = userData.id

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const {
    data: tableInfo,
    isLoading: loadingTableInfo,
    isError: errorTableInfo,
    isFetching: fetchingtableInfo,
    refetch: refetchTableInfo,
  } = tableRequest
  const isTotallyApprove = tableInfo?.data?.[0]?.estado === 'APROBADO TOTAL'

  const infoComment = tableInfo?.data?.[0]?.dataRevisiones?.find(
    (item) => item?.dataUserAudita?.id === idUser
  )
  const infoHistoricalComments = tableInfo?.data?.[0]?.dataRevisiones
  const [comment, setComment] = useState(infoComment?.comentario)
  const [review, setReview] = useState(infoComment?.revision)

  useEffect(() => {
    if (infoComment) {
      setComment(infoComment?.comentario)
      setReview(infoComment?.revision)
    }
  }, [infoComment, tableInfo])

  const [tabValue, setTabValue] = useState(0)

  const handleChangeTab = (_, newValue) => {
    setTabValue(newValue)
  }

  const onChangeCommnet = (e) => {
    setComment(e.target.value)
  }

  const { mutateAsync: reviewTableRequest, isPending: loadingReview } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/revisionesMesa/${idTable}`,
    onSuccess: async () => {
      await refetchTableInfo()
      informativeModal.handleShow()
      refetchTables()
      toast.success('Revisión realizada con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al revisar mesa')
    },
  })

  const reviewTable = () => {
    const commentToValidation = comment?.trim()

    if (!commentToValidation || commentToValidation === '' || review === '' || !review) {
      toast.error('Debe seleccionar una revisión e ingresar un comentario')
      return
    }

    const infoConfirmModal = actionReviewTable[review]
      ? actionReviewTable[review]
      : review === 'APROBADO PARCIAL' || review === 'APROBADO TOTAL'
      ? actionReviewTable['APROBACIONES']
      : review === 'PENDIENTE'
      ? actionReviewTable['PENDIENTE']
      : {}

    setConfirmAlertProps({
      open: true,
      ...infoConfirmModal,
      onConfirm: () => {
        reviewTableRequest({
          body: {
            revision: review,
            comentario: comment,
          },
        })
      },
    })
  }

  const data = getInfoTable(tableInfo)

  return (
    <>
      {loadingTableInfo || fetchingtableInfo ? (
        <Loading />
      ) : errorTableInfo ? (
        <ErrorPage />
      ) : (
        <Card
          sx={{
            maxHeight: 'calc(100vh - 300px)',
          }}
        >
          <BackdropLoading loading={loadingReview} />
          <TabOptions
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
          />
          <TabsRender
            tabValue={tabValue}
            data={data}
            comment={comment}
            onChangeCommnet={onChangeCommnet}
            review={review}
            setReview={setReview}
            reviewTable={reviewTable}
            infoComment={infoComment}
            infoHistoricalComments={infoHistoricalComments}
            isTotallyApprove={isTotallyApprove}
          />
        </Card>
      )}
    </>
  )
}

export default TableInfo
