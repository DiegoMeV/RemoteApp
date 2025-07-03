import useResumeDescription from '@/lib/api/process/useResumeDescription'
import { Check, CloseOutlined } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'

const DescriptionButton = ({ idProcess, activityInfo, processInfo }) => {
  const [resumeText, setResumeText] = useState(
    activityInfo[0]?.description?.trim() !== '' && activityInfo[0]?.description
      ? activityInfo[0]?.description?.trim()
      : processInfo?.description?.trim() !== '' && processInfo?.description
      ? processInfo?.description
      : ''
  )
  const [stateComment, setStateComment] = useState(false)
  const { mutateAsync: editDescription } = useResumeDescription({
    idProcess: idProcess,
    idActivity: activityInfo?.[0]?.id,
    onSuccess: (response) => {
      setResumeText(response.data.description)
      toast.success('Cambios guardados')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const handleWrite = () => {
    setStateComment(true)
  }
  const handleCancel = () => {
    setStateComment(false)
    setResumeText(activityInfo[0]?.description ?? '')
  }
  const handleChange = (e) => {
    setResumeText(e.target.value)
  }

  const handleSubmitDescription = () => {
    const body = {
      description: resumeText,
    }
    editDescription(body)
  }

  return (
    <>
      <TextField
        value={resumeText}
        size='small'
        label='Descripción'
        fullWidth
        multiline
        onFocus={handleWrite}
        onChange={handleChange}
        minRows={3}
        maxRows={3}
        sx={{ marginTop: '5px', marginBottom: '20px' }}
      />

      {stateComment && (
        <Box
          position='absolute'
          zIndex='1'
          bottom='25px'
          right='5px'
        >
          <IconButton
            size='small'
            onClick={handleSubmitDescription}
          >
            <Check />
          </IconButton>
          <IconButton
            size='small'
            onClick={handleCancel}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
      )}
    </>
  )
}

export default DescriptionButton
