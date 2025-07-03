import { Grid } from '@mui/material'
import CallApiElement from './CallApiElement'
import { BackdropLoading, downloadBuffer, useGetBufferUrl } from '@/lib'
import toast from 'react-hot-toast'

const CallApi = ({ elementData }) => {
  const { mutateAsync: downloadTemplate, isPending: loadingDownload } = useGetBufferUrl({
    onSuccess: (response) => {
      downloadBuffer(response)
    },
    onError: (e) => {
      toast.error(e?.data?.error ?? 'Error al obtener el documento')
    },
  })
  return (
    <Grid
      container
      spacing={2}
    >
      <BackdropLoading loading={loadingDownload} />
      {elementData?.map((elementProps) => {
        return (
          <CallApiElement
            key={elementProps.id}
            {...elementProps}
            downloadByURL={downloadTemplate}
          />
        )
      })}
    </Grid>
  )
}

export default CallApi
