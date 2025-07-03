import { Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { ImageWelcomeCard, WelcomeCardData } from '.'
import { shadowCard } from './constants'
import { welcomeCard } from './styles/stylesCard'

const WelcomeCard = ({ text, showTutorialButton, hasCompanyImg = false, propsStyles }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const urlImg = companyData?.Company?.urlIcon || companyData?.Company?.urlLogo
  const imgProps = hasCompanyImg && urlImg ? { width: 'auto', height: '120px' } : {}

  return (
    <div className='max-w-[750px] mx-auto pt-10'>
      <Stack
        flexDirection='column'
        alignItems='center'
        sx={{
          boxShadow: shadowCard,
          ...welcomeCard,
          ...propsStyles,
        }}
      >
        <Stack
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems='center'
          width='100%'
          sx={{ gap: 2 }}
        >
          <WelcomeCardData
            text={text}
            showTutorialButton={showTutorialButton}
          />
          <ImageWelcomeCard
            imgProps={imgProps}
            hasCompanyImg={hasCompanyImg}
          />
        </Stack>
        {hasCompanyImg && urlImg && (
          <div className='flex justify-center items-center w-full py-7'>
            <img
              src={companyData?.Company?.urlIcon || companyData?.Company?.urlLogo}
              alt='Company Logo'
              style={{ maxHeight: '120px', maxWidth: '100%' }}
            />
          </div>
        )}
      </Stack>
    </div>
  )
}

export default WelcomeCard
