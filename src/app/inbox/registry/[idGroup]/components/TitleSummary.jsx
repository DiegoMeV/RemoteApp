import { Divider, Typography } from '@mui/material'

const TitleSummary = ({ title }) => {
  return (
    <>
      <Typography
        variant='h6'
        sx={{ pb: 1.5 }}
      >
        {title}
      </Typography>
      <Divider />
    </>
  )
}

export default TitleSummary
