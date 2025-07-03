import { GenericSelect, GenericTextfield, usePrivileges } from '@/lib'
import { Button, Grid } from '@mui/material'
import { reviewOptionsSelect } from './funcs'

const ReviewMesaARI = ({
  comment,
  onChangeCommnet,
  reviewTable,
  review,
  setReview,
  isTotallyApprove,
}) => {
  const label = `Comentario ${
    review === 'APROBADO PARCIAL' || review === 'APROBADO TOTAL'
      ? 'de aprobación'
      : review === 'RECHAZADO'
      ? 'de rechazo'
      : ''
  }`

  const color =
    review === 'APROBADO PARCIAL' || review === 'APROBADO TOTAL' || review === 'PENDIENTE'
      ? 'success'
      : review === 'RECHAZADO'
      ? 'error'
      : ''

  const onChangeReview = (e) => {
    setReview(e.target.value)
  }
  const canApproveTotal = usePrivileges('cgr.uri.mesas_revision_estado_apt')
  const canApprovePartial = usePrivileges('cgr.uri.mesas_revision_estado_app')
  const reviewOptions = reviewOptionsSelect({ canApproveTotal, canApprovePartial })

  return (
    <>
      {(!isTotallyApprove || canApproveTotal) && (
        <>
          <Grid
            item
            xs={12}
          >
            <GenericSelect
              label='Revisión'
              value={review}
              color={color}
              focused
              options={reviewOptions}
              onChange={onChangeReview}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <GenericTextfield
              label={label}
              color={color}
              focused
              multiline={true}
              minRows={3}
              onChange={onChangeCommnet}
              value={comment}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent='flex-end'
            columnGap={2}
          >
            <Button
              variant='contained'
              onClick={() => reviewTable(review)}
            >
              GUARDAR
            </Button>
          </Grid>
        </>
      )}
    </>
  )
}

export default ReviewMesaARI
