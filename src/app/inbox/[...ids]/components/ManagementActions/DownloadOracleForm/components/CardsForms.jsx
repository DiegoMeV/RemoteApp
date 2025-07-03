import { isEmpty } from '@/lib'
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { CustomTextfield } from '../..'

const CardsForms = ({
  element,
  setItemLabel,
  setUrlOracleForm,
  modalSigner,
  idDocument,
  downloadOracleForm,
  setPreviewer,
}) => {
  const rejectionCommentDataExist = !isEmpty(element?.rejectionCommentData)

  return (
    <>
      {rejectionCommentDataExist && (
        <CustomTextfield
          md={12}
          lg={12}
          label='Causa de devolución'
          type='multiline'
          error={true}
          value={element?.rejectionCommentData?.comentario ?? ''}
        />
      )}
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
      >
        <Card>
          <CardContent>
            <Grid
              container
              flexDirection={'column'}
              spacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <Typography
                  fontWeight='bold'
                  color={element.name ? '' : 'error'}
                  textAlign='center'
                >
                  {element.name ?? 'No se encontró nombre de forma'}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                container
                flexDirection={'row'}
                justifyContent='space-around'
              >
                <img
                  src='/assets/svg/oracle.svg'
                  alt='Oracle form icon'
                  style={{ cursor: 'pointer' }}
                  width='50'
                  onClick={() => {
                    setItemLabel(element.name)
                    if (element?.actionItemSpecs?.oracleFormCall?.genDoc) {
                      setUrlOracleForm(element.oracleFormsURL)
                      modalSigner.handleShow()
                      return
                    }
                    downloadOracleForm({ qry: element.oracleFormsURL })
                  }}
                />
                <Divider
                  orientation='vertical'
                  variant='middle'
                  flexItem
                />
                <img
                  src='/assets/svg/PDF.svg'
                  alt='Second icon'
                  style={{
                    cursor: idDocument ? 'pointer' : 'default',
                    opacity: idDocument ? 1 : 0.5,
                  }}
                  title={
                    idDocument ? `Descargar ${element.name}` : `No se ha generado el documento`
                  }
                  width='60'
                  onClick={async () => {
                    await setPreviewer({
                      open: true,
                      idDocument: idDocument,
                      loadingPreviewer: true,
                    })
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default CardsForms
