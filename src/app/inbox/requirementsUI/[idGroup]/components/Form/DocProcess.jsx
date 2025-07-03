import { BackdropLoading, ClassicIconButton, baseUrls, useMutationDynamicApi } from '@/lib'
import { Add, Check } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { DocumentContainer } from '.'
import toast from 'react-hot-toast'

const DocProcess = ({
  index,
  document,
  refetchSourceProcess,
  refecthDocumentsByActivity,
  documentsByActivity,
  idCompany,
  ids,
}) => {
  const idDocument = document?.id
  const [idProcess, idActivityCreated] = ids

  const qry = `${baseUrls.urlDocuments}/${idCompany}/documentos/clonar/${idDocument}`
  const { mutateAsync: cloneDocument, isPending } = useMutationDynamicApi({
    qry: qry,
    method: 'post',
    onSuccess: () => {
      toast.success('Clonado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al clonar')
    },
  })
  const handleCloneDocument = async () => {
    await cloneDocument({
      idProceso: idProcess,
      idActivity: idActivityCreated,
    })
    await refetchSourceProcess()
    await refecthDocumentsByActivity()
  }
  const isCloned = documentsByActivity?.find((doc) => doc?.idDocumentoOrigen === idDocument)

  return (
    <DocumentContainer>
      <Grid container>
        <BackdropLoading loading={isPending} />
        <Grid
          xs={12}
          sm={1}
        >
          {index + 1}
        </Grid>
        <Grid
          xs={12}
          sm={7}
        >
          {document?.nombreMostrar ?? ''}
        </Grid>
        <Grid
          xs={12}
          sm={3}
        >
          {document?.estado ?? ''}
        </Grid>
        <Grid
          xs={12}
          sm={1}
        >
          <ClassicIconButton
            title='Agregar'
            color={'primary'}
            onClick={handleCloneDocument}
            disabled={isCloned}
          >
            {isCloned ? <Check /> : <Add />}
          </ClassicIconButton>
        </Grid>
      </Grid>
    </DocumentContainer>
  )
}

export default DocProcess
