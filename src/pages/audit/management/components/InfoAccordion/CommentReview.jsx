import { CustomAccordion } from '@/lib'
import { Grid, Typography } from '@mui/material'
import { dataForCommentReview } from './funcs'

const CommentReview = ({ activityInfo }) => {
  const { approvedComent, rejectedComent, askForDocsComent, someCommentExist, color, label } =
    dataForCommentReview(activityInfo)

  return (
    <>
      {someCommentExist && (
        <CustomAccordion
          title='Comentarios de la revisión anterior'
          defaultExpanded={true}
        >
          <Grid
            item
            xs={12}
          >
            <Grid
              container
              sx={{
                backgroundColor: 'backgroundGrey1',
              }}
              p={2}
            >
              <Grid
                item
                xs={3}
              >
                <Typography
                  fontWeight={'bold'}
                  color={color}
                >
                  {`Comentario ${label} :`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={9}
              >
                <Typography color={color}>
                  {approvedComent ?? rejectedComent ?? askForDocsComent ?? ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CustomAccordion>
      )}
    </>
  )
}

export default CommentReview
