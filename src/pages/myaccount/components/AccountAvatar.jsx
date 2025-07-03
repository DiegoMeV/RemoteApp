import { Box, Card, CardContent, Typography } from '@mui/material'
import { sxContent } from '../styles/stylesSx'
import AccountDropzone from './AccountDropzone'
import { useImage } from '@/lib'

const AccountAvatar = ({ setFile, setValue, setImgAvatar, userData, setStatesUserData }) => {
  const { data: dataImage, isLoading: isLoadingImg } = useImage(userData?.preferences?.avatar)
  return (
    <Card
      raised
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <CardContent sx={sxContent}>
        <Box>
          <Typography
            variant='h4'
            my='5%'
            color='secondary'
          >
            Imagen de perfil
          </Typography>
          <AccountDropzone
            imgAvatar={dataImage?.url}
            setFile={setFile}
            setValue={setValue}
            setImgAvatar={setImgAvatar}
            userData={userData}
            isLoadingImg={isLoadingImg}
            setStatesUserData={setStatesUserData}
          />
          <Typography
            my='5%'
            color={'secondary'}
          >
            Formatos *.jpeg, *.jpg, *.png
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AccountAvatar
