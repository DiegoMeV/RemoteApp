import { CloudUpload } from '@mui/icons-material'
import { Button, styled } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DocExample from './DocExample'
import { useMutationDynamicBaseUrl } from '@/lib'
import { BackdropLoading } from '@/libV4'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const SignUpload = ({ idUser, infoUser }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const [signImg, setSignImg] = useState('')
  const [newSignImg, setNewSignImg] = useState('')

  useEffect(() => {
    if (infoUser?.signImg) {
      const findSign = infoUser?.signImg?.find?.(
        (sign) => sign.companyId === companyData?.companyId
      )
      setSignImg(findSign?.signId ?? '')
    }
  }, [companyData?.companyId, infoUser?.signImg])

  const name = `${infoUser?.firstName ?? ''} ${infoUser?.lastName ?? ''}`

  const { mutateAsync: updateSignImg, isPending: updatingSignImg } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    url: `/admin/users/${idUser}/sign`,
    method: 'put',
    onSuccess: () => {
      setSignImg(newSignImg)
      toast.success('Firma actualizada con éxito')
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || 'Ocurrió un error al actualizar la firma')
    },
  })

  const { mutateAsync: uploadImage, isPending: uploadingiSignImg } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: '/documentos/uploadImage',
    onSuccess: async (response) => {
      const signId = response?.data?.[0]?.id
      await setNewSignImg(signId)
      updateSignImg({ body: { signId } })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || 'Ocurrió un error al actualizar la firma')
    },
  })

  const handleUploadImage = (event) => {
    const fileImage = event.target.files[0]

    const File = new FormData()
    File.append('file', fileImage)

    if (!fileImage) {
      toast.error('No se ha seleccionado una imagen')
      return
    }

    uploadImage({ body: File })
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <BackdropLoading loading={uploadingiSignImg || updatingSignImg} />
      <DocExample
        name={name}
        signImg={signImg}
      />
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        Cargar firma
        <VisuallyHiddenInput
          type='file'
          onChange={handleUploadImage}
        />
      </Button>
    </div>
  )
}

export default SignUpload
