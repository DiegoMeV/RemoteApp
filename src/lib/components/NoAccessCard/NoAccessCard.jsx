import { Container, Box, Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import styles from './styles/noAccessCard.module.css'
import AccessCardData from './components/AccessCardData'
import ImageAccessCard from './components/ImageAccessCard'

const NoAccessCard = () => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const darkBackground = {
    WebkitBoxShadow: '0px 2px 28px -1px rgba(250,250,250,0.82)',
    MozBoxShadow: '0px 2px 28px -1px rgba(250,250,250,0.82)',
    boxShadow: '0px 2px 28px -1px rgba(250,250,250,0.82)',
  }
  const lightBackground = {
    webkitBoxShadow: '0px 5px 21px -5px rgba(0,0,0,0.68)',
    mozBoxShadow: '0px 5px 21px -5px rgba(0,0,0,0.68)',
    boxShadow: '0px 5px 21px -5px rgba(0,0,0,0.68)',
  }
  const [shadow, setShadow] = useState(lightBackground)

  useEffect(() => {
    if (dark === 'dark') {
      setShadow(darkBackground)
    } else {
      setShadow(lightBackground)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark])
  return (
    <Container className={styles.containerAccessPage}>
      <Box
        width='80%'
        maxWidth='750px'
        pt='50px'
        mx='auto'
      >
        <Stack
          flexDirection={{ xs: 'column', md: 'row' }}
          className={styles.accessCard}
          sx={{
            ...shadow,
          }}
        >
          <AccessCardData />
          <ImageAccessCard />
        </Stack>
      </Box>
    </Container>
  )
}
export default NoAccessCard
