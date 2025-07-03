import { useGetFiles } from '@/lib'
import { Avatar, CircularProgress } from '@mui/material'

const AvatarColumn = ({ idAvatar, firstName }) => {
  const {
    data: dataImage,
    isFetching,
    isError,
  } = useGetFiles({ qry: `/${idAvatar}`, enabled: !!idAvatar })

  return (
    <>
      {isFetching ? (
        <CircularProgress />
      ) : isError ? (
        <Avatar>{firstName?.[0]}</Avatar>
      ) : (
        <Avatar src={idAvatar && idAvatar !== '' ? dataImage?.url : ''}>{firstName?.[0]}</Avatar>
      )}
    </>
  )
}

export default AvatarColumn
