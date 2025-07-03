import {
  BackdropLoading,
  downloadBuffer,
  useBoolean,
  useEditProcess,
  useGetBufferDocument,
} from '@/lib'
import { DocumentContainer } from '..'
import ElementReview from './ElementReview'
import { Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStoreActions } from 'easy-peasy'
import ButtonsReview from './ButtonsReview'
import { ModalGeneralReview } from '../GeneralReview/components'
import { useQueryClient } from '@tanstack/react-query'
import { objectToSend } from './funcs'
import { titleModal } from './constants'

const DocumentReview = ({
  ids,
  action,
  refetchManagement,
  elementData,
  idActivityAction,
  refetchElementActions,
  activityInfo,
}) => {
  const [idProcess, idActivity] = ids
  const queryClient = useQueryClient()

  const [selectedDocuments, setSelecteDocuments] = useState([])
  const [isAllSelected, setIsAllSelected] = useState(false)

  const commentModal = useBoolean()
  const [stateToSend, setStateToSend] = useState()
  const [comment, setComment] = useState('')
  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const allDocumentsIds = elementData?.map((elementAction) => {
    return elementAction?.documentToBeHandledData?.id
  })
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelecteDocuments([])
    } else {
      setSelecteDocuments(allDocumentsIds)
    }
    setIsAllSelected(!isAllSelected)
  }

  const { mutateAsync: getBuffer } = useGetBufferDocument({
    onSuccess: () => {
      toast.success('Descarga exitosa')
    },
    onError: (error) => {
      toast.error('Error ', error)
    },
  })

  const handleDownloadZip = async () => {
    if (!selectedDocuments.length) {
      toast.error('Seleccione al menos un documento primero')
      return
    }
    try {
      const response = await getBuffer({
        body: {
          tipo: 'zip',
          idDocumento: selectedDocuments,
          id_proceso: idProcess,
        },
        qry: `descargar`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      downloadBuffer(response)
    } catch (error) {
      toast.error(error)
    }
  }

  const handleDownloadPdf = async () => {
    if (!selectedDocuments.length) {
      toast.error('Seleccione al menos un documento primero')
      return
    }
    await setPreviewer({
      open: true,
      idDocument: selectedDocuments,
      idProcess: idProcess,
      loadingPreviewer: true,
    })
  }

  const buttonsProps = {
    selectedDocuments,
    allDocumentsIds,
    handleSelectAll,
    handleDownloadPdf,
    handleDownloadZip,
    idGoToTask: action?.idGoToTask,
    commentModal,
    setStateToSend,
    activityInfo,
  }

  const { mutateAsync: editProcess, isPending: editingProcess } = useEditProcess({
    qry: `${idProcess}/activities/${idActivity}`,
    onSuccess: async () => {
      toast.success('Revisión realizada con éxito')
      commentModal.handleShow()
      queryClient.invalidateQueries([`/inbox`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al realizar la revisión')
    },
  })

  const handleReview = () => {
    if (comment === '') {
      toast.error('El comentario es requerido')
      return
    }

    const body = objectToSend(comment, stateToSend)
    editProcess({
      body: {
        activityData: body,
      },
    })
  }

  return (
    <>
      {elementData.length > 0 ? (
        <>
          <BackdropLoading loading={editingProcess} />
          <ButtonsReview {...buttonsProps} />
          <DocumentContainer>
            {elementData?.map((elementAction, index) => {
              return (
                <ElementReview
                  key={index}
                  elementAction={elementAction}
                  idTaskAction={elementAction?.idTaskAction}
                  ids={ids}
                  refetchManagement={refetchManagement}
                  selectedDocuments={selectedDocuments}
                  setSelecteDocuments={setSelecteDocuments}
                  idActivityAction={idActivityAction}
                  refetchElementActions={refetchElementActions}
                  idGoToTask={action?.idGoToTask}
                  idAction={action?.id}
                />
              )
            })}
          </DocumentContainer>
          <ModalGeneralReview
            title={titleModal?.[stateToSend]}
            commentModal={commentModal}
            reviewModal='REJECTED'
            handleReview={handleReview}
            setCommnet={setComment}
            comment={comment}
            handleChangeComment={onChangeComment}
          />
        </>
      ) : (
        <Typography variant='body1'>
          Revisar parametrización, esta acción no contiene elementos.
        </Typography>
      )}
    </>
  )
}

export default DocumentReview
