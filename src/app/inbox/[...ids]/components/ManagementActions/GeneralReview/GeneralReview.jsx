import {
  BackdropLoading,
  ErrorPage,
  useBoolean,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/lib'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ModalGeneralReview, OptionsGeneralReview, TableProcessDocuments } from './components'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const GeneralReview = ({ ids, accordionsState, modalForm }) => {
  const [idProcess, idActivity] = ids
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const recepción_revisión_alerta = idActivity === '655e8983-57c8-4b59-87cd-caa81943b42a'

  const commentModal = useBoolean()
  const [comment, setCommnet] = useState('')
  const [reviewModal, setReviewModal] = useState()

  const handleReviewModal = (reviewOption) => {
    commentModal.handleShow()
    setReviewModal(reviewOption)
  }

  const handleChangeComment = (e) => {
    setCommnet(e.target.value)
  }

  const {
    data: processDocuments,
    isLoading: loadingProcessDocuments,
    error: errorProcessDocuments,
    isFetching: fetchingProcessDocuments,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `/documentos/${idProcess}/proceso`,
    enabled: accordionsState ?? true,
  })

  const { mutateAsync: generalReviewDocs, isPending: loadingReviewDocs } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: true,
      baseKey: 'urlProcess',
      url: `/processes/${idProcess}/activities/${idActivity}/general-review`,
      onSuccess: async () => {
        toast.success('Revisión realizada con éxito')
        commentModal.handleShow()
        queryClient.invalidateQueries([`/inbox`])
        navigate('/inbox')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al realizar la revisión')
      },
    })

  const handleReview = async () => {
    if (comment === '') {
      toast.error('El comentario es requerido')
      return
    }
    generalReviewDocs({
      body: {
        comment,
        decision: reviewModal,
      },
    })
  }

  return (
    <>
      {errorProcessDocuments ? (
        <ErrorPage />
      ) : (
        <>
          <BackdropLoading loading={loadingReviewDocs} />
          <OptionsGeneralReview
            handleReviewModal={handleReviewModal}
            modalForm={modalForm}
            recepción_revisión_alerta={recepción_revisión_alerta}
          />
          <TableProcessDocuments
            processDocuments={processDocuments?.data ?? []}
            loadingProcessDocuments={loadingProcessDocuments || fetchingProcessDocuments}
          />
          <ModalGeneralReview
            commentModal={commentModal}
            reviewModal={reviewModal}
            handleReview={handleReview}
            setCommnet={setCommnet}
            comment={comment}
            handleChangeComment={handleChangeComment}
          />
        </>
      )}
    </>
  )
}

export default GeneralReview
