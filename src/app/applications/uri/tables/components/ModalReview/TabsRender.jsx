import { CardInfoMesa, ReviewMesaARI } from '.'
import { Grid } from '@mui/material'
import HistoricalCommnets from '../HistoricalCommnets'
import { CustomTabPanel } from '@/libV4'

const TabsRender = ({
  tabValue,
  data,
  comment,
  onChangeCommnet,
  review,
  setReview,
  reviewTable,
  infoComment,
  infoHistoricalComments,
  isTotallyApprove,
}) => {
  return (
    <>
      <CustomTabPanel
        value={tabValue}
        index={0}
        sx={{
          backgroundColor: 'backgroundGrey1',
          borderRadius: '0 0 10px 10px',
          maxHeight: 'calc(100vh - 350px)',
          overflowY: 'auto',
        }}
      >
        <Grid
          container
          rowGap={2}
        >
          <CardInfoMesa info={data} />
          <ReviewMesaARI
            comment={comment}
            onChangeCommnet={onChangeCommnet}
            reviewTable={reviewTable}
            infoComment={infoComment}
            review={review}
            setReview={setReview}
            isTotallyApprove={isTotallyApprove}
          />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel
        value={tabValue}
        index={1}
        sx={{
          backgroundColor: 'backgroundGrey1',
          borderRadius: '0 0 10px 10px',
          maxHeight: 'calc(100vh - 300px)',
          overflowY: 'auto',
        }}
      >
        <HistoricalCommnets infoHistoricalComments={infoHistoricalComments} />
      </CustomTabPanel>
    </>
  )
}

export default TabsRender
