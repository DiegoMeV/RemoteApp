import { Business } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { cardTitle, containerCardCompany } from '../styles'

const CardCompany = ({ company, handleSelectCompany }) => {
  return (
    <Grid
      item
      xs={12}
      sm={5.5}
      sx={containerCardCompany}
      onClick={() => {
        handleSelectCompany(company)
      }}
    >
      {company?.Company.urlIcon || company?.Company.urlLogo ? (
        <img
          src={company?.Company.urlIcon || company?.Company.urlLogo}
          alt='company logo'
          width={60}
        />
      ) : (
        <Business
          sx={{ fontSize: 65 }}
          color='primary'
        />
      )}

      <Typography sx={cardTitle}>{company?.Company?.companyName ?? ''}</Typography>
    </Grid>
  )
}

export default CardCompany
