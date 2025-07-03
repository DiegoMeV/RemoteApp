import { CustomModal } from '@/lib'
import { Grid } from '@mui/material'
import { CardCompany } from '../components'
import { contentContainer } from '../styles'

const ViewSelectCompany = ({ userCompanies, handleSelectCompany }) => {
  return (
    <CustomModal
      open={true}
      title='Seleccione la compañía'
      shouldClose={false}
      size='lg'
      titleColor='#595959'
      maxHeight='calc(100vh - 135px)'
    >
      <Grid
        container
        sx={contentContainer}
      >
        <Grid
          container
          xs={12}
          display='flex'
          justifyContent='space-between'
          p={5}
          gap={2}
        >
          {userCompanies?.map((company, index) => (
            <CardCompany
              key={index}
              company={company}
              handleSelectCompany={handleSelectCompany}
            />
          ))}
        </Grid>
      </Grid>
    </CustomModal>
  )
}

export default ViewSelectCompany
