import { BackdropLoading, SquareIconButton, useCommentDocument } from '@/lib'
import { Save } from '@mui/icons-material'
import { Box, Grid, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useProcessFunctions, useProcessModifyItem } from '../hooks'
import toast from 'react-hot-toast'
import { documentUpdate } from '../funcs'
import { useState } from 'react'

const FormReview = ({
  elementAction,
  state,
  idTaskAction,
  ids,
  refetchManagement,
  handleCloseModal,
  idActivityAction,
  refetchElementActions,
}) => {
  const idDocument =
    elementAction?.documentToBeHandledData?.id ??
    elementAction.activityActionItemData?.documentData?.id
  const [idProcess, idActivity] = ids || []
  const [responseReview, setResponseReview] = useState()

  const form = useForm({
    defaultValues: {
      comentario: elementAction?.activityActionItemData?.commentData?.comentario ?? '',
    },
  })

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    refetchElementActions
  )

  const onSuccessUpdateProcess = (response) => {
    const qry = response?.data?.id ? `${response?.data?.id}/items` : ''
    const body = documentUpdate(elementAction, responseReview)
    modifyItemInformation({ qry, body })
  }

  const { updateProcess, isPendingUpdateProcess } = useProcessFunctions(
    idProcess,
    idActivity,
    refetchManagement,
    handleCloseModal,
    onSuccessUpdateProcess
  )

  const { mutateAsync: reviewDocument, isPending: loadingReviewDoc } = useCommentDocument({
    idDocument: idDocument,
    onSuccess: (response) => {
      const responseObjet = response?.data ?? {}
      setResponseReview(responseObjet)
      if (!idActivityAction) {
        updateProcess({ idTaskAction })
      } else {
        const body = documentUpdate(elementAction, responseObjet)
        modifyItemInformation({ body })
      }
      toast.success('Documento revisado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al revisar documento')
    },
  })

  const onSubmit = async (data) => {
    reviewDocument({
      comentario: data?.comentario ?? '',
      estado: state,
      idProceso: idProcess,
      idActivity: idActivity,
    })
  }

  return (
    <>
      <BackdropLoading
        loading={loadingReviewDoc || isPendingUpdateProcess || loadingItemCreation}
      />
      <Grid
        container
        component='form'
        gap={2}
        p={(2, 0, 0, 2)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Grid
          item
          xs={12}
        >
          <Controller
            name='comentario'
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                size='small'
                label={`Comentario ${state}`}
                helperText={`Código de seguridad : ${
                  elementAction?.activityActionItemData?.commentData?.codigoSeguridad ?? ''
                }`}
                multiline
                minRows={3}
                maxRows={3}
                sx={{ width: '100%' }}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
        <Box
          display='flex'
          width='100%'
          justifyContent='flex-end'
        >
          <Box width={'20%'}>
            <SquareIconButton
              tooltip={'Guardar'}
              text={'Guardar'}
              IconComponent={<Save />}
              size={'medium'}
              type={'submit'}
            />
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default FormReview
