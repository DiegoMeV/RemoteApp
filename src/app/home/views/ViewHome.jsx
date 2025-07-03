import { Box } from '@mui/material'
import {
  CarouselSection,
  FiltersSection,
  FirstSection,
  FooterSection,
  HomeNavbar,
} from '../components'
import CardsSection from './CardsSection'
import { ErrorPage, Loading } from '@/lib'

const ViewHome = ({ companies, loadingCompanies, errorGettingCompanies }) => {
  return (
    <>
      <HomeNavbar />
      <FirstSection />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            maxHeight: {
              xs: 'calc(100vh - 190px)',
              sm: 'calc(100vh - 250px)',
              md: 'calc(100vh - 330px)',
              lg: 'calc(100vh - 260px)',
            },
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <CarouselSection />
          <FiltersSection />
          {loadingCompanies ? (
            <Loading />
          ) : errorGettingCompanies ? (
            <ErrorPage />
          ) : (
            <CardsSection companies={companies?.data} />
          )}
          <FooterSection />
        </Box>
      </div>
    </>
  )
}

export default ViewHome
