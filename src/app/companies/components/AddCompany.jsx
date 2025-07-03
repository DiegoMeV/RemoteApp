import { Add, Business, CloudUpload, Edit } from '@mui/icons-material'
import { Button, IconButton, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { inputsForCreateCompany } from '../constants'
import {
  BackdropLoading,
  BasicCard,
  GenericForm,
  LoadingError,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/libV4'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

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

const AddCompany = ({ selectedCompany }) => {
  const { control, handleSubmit, reset, watch, getValues } = useForm()
  const [previewUrl, setPreviewUrl] = useState('')
  const [fileImage, setFileImage] = useState(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [idNewCompany, setIdNewCompany] = useState(null)

  const {
    data: company,
    isFetching: loadingCompany,
    isError: errorCompany,
  } = useQueryDynamicApi({
    isCompanyRequest: false,
    enabled: selectedCompany !== 'new',
    baseKey: 'urlUsers',
    url: `/companies/${selectedCompany}`,
  })

  useEffect(() => {
    reset()
    if (company) {
      const companyData = company?.data?.[0]
      delete companyData?.id
      setPreviewUrl(companyData?.urlLogo)
      reset(companyData)
    }
  }, [company, reset])

  const { mutateAsync: modifyCompany, isPending: modifyingCompany } = useMutationDynamicBaseUrl({
    isCompanyRequest: false,
    baseKey: 'urlUsers',
    url: '/companies',
    onSuccess: async (response) => {
      toast.success('Compañía modificada correctamente')
      if (selectedCompany === 'new' && !idNewCompany) {
        await setIdNewCompany(response?.data?.id)
        if (!fileImage) {
          navigate(`/companies/edition/${response?.data?.id}`)
          queryClient.invalidateQueries(['/companies'])
          setIdNewCompany(null)
          return
        }
        const File = new FormData()
        File.append('file', fileImage)
        uploadCompanyImage({
          body: File,
          replaceUrl: `/${response?.data?.id}/documentos/uploadDocsToCDN`,
        })
        return
      }
      queryClient.invalidateQueries(['/companies'])
      setIdNewCompany(null)
      if (idNewCompany) {
        navigate(`/companies/edition/${idNewCompany}`)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al modificar la compañía')
    },
  })

  const onSubmit = (data) => {
    if (selectedCompany !== 'new') {
      if (!fileImage) {
        modifyCompany({
          body: { company: data },
          qry: `/${selectedCompany}`,
          methodBody: 'put',
        })
        return
      }
      const File = new FormData()
      File.append('file', fileImage)
      uploadCompanyImage({ body: File })
      return
    }
    modifyCompany({ body: { company: data } })
  }

  const { mutateAsync: uploadCompanyImage, isPending: loadingCompanyImage } =
    useMutationDynamicBaseUrl({
      isCompanyRequest: false,
      baseKey: 'urlDocuments',
      url: `/${
        selectedCompany === 'new' ? idNewCompany : selectedCompany
      }/documentos/uploadDocsToCDN`,
      includeFile: true,
      onSuccess: (response) => {
        toast.success('Imagen subida correctamente')
        const data = getValues()
        modifyCompany({
          body: { company: { ...data, urlLogo: response?.url } },
          qry: `/${selectedCompany === 'new' ? idNewCompany : selectedCompany}`,
          methodBody: 'put',
        })
      },
      onError: (e) => {
        toast.error(e?.message || 'Error al subir la imagen')
      },
    })

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    setFileImage(event.target.files[0])
    setPreviewUrl(URL.createObjectURL(file))
  }

  return (
    <LoadingError
      loading={loadingCompany}
      error={errorCompany}
    >
      <BackdropLoading loading={modifyingCompany || loadingCompanyImage} />
      <form
        className='general_form_container'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='col-span-12 flex justify-center'>
          <BasicCard
            title='Datos de la compañía'
            name={watch(`companyName`)}
            Icon={
              <>
                {!!previewUrl && previewUrl?.trim?.() !== '' ? (
                  <img
                    src={previewUrl}
                    alt='Logo-Empresa'
                    style={{
                      maxWidth: '65px',
                      height: 'auto',
                    }}
                  />
                ) : (
                  <Business
                    sx={{ fontSize: 65 }}
                    color='primary'
                  />
                )}
              </>
            }
            details={
              <div>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton>
                  <Add />
                </IconButton>
              </div>
            }
          />
        </div>
        <div className='col-span-12 flex justify-center'>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Subir imagen
            <VisuallyHiddenInput
              type='file'
              onChange={handleFileUpload}
            />
          </Button>
        </div>
        <GenericForm
          inputs={inputsForCreateCompany}
          control={control}
        />
        <div className='col-span-12 flex justify-end mt-5 gap-2'>
          <Button
            variant='contained'
            color='error'
            onClick={() => navigate('/companies')}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            type='submit'
          >
            Guardar
          </Button>
        </div>
      </form>
    </LoadingError>
  )
}

export default AddCompany
