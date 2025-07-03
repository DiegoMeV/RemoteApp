import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from 'react'
import { Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { infoInputsFunc } from './funcs'
import { GenericForm } from '@/libV4'
import { CloudUpload } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { BackdropLoading, useUploadDocument } from '@/lib'
import toast from 'react-hot-toast'

const MAX_SIZE_MB = 5

const ProcessInfo = ({ form, insertData }) => {
  const { id } = useParams()
  const [files, setFiles] = useState([])
  const { typeProcess } = useParams()
  const { mutateAsync: uploadDoc, isPending: loadingDoc } = useUploadDocument({
    newCompanyId: id,
    onSuccess: (e) => {
      insertData({ body: { documents: [e.data?.[0], ...files] } })
      toast.success('Documento cargado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const subtitles = {
    inquiry: 'Presente su consulta',
    report: 'Presente su denuncia',
    praise: 'Presente sus felicitaciones',
    request: 'Presente su petición de interés general o particular',
    complaint: 'Presente su queja',
    claim: 'Presente su reclamo',
    documentRequest: 'Presente su solicitud de documentos y/o información',
    suggestion: 'Presente sus sugerencias',
  }
  const subtitle = subtitles[typeProcess]
  // Actualizar archivos basados en form.watch('documents')
  useEffect(() => {
    setFiles(form.watch('documents') || [])
  }, [form.watch('documents')])

  const handleFileUpload = async (event) => {
    const fileItem = event[0] // Solo tomar el primer archivo
    const formData = new FormData()
    formData.append('file', fileItem)
    await uploadDoc(formData)
  }

  const removeFile = (index) => {
    // Eliminar archivo
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    // Actualizar el formulario
    insertData({ body: { documents: updatedFiles } })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/pdf': ['.pdf'],
      'video/mp4': ['.mp4'],
    },
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
  })

  const infoInputs = infoInputsFunc({ form })

  return (
    <div className='flex flex-col w-full px-8'>
      <BackdropLoading loading={loadingDoc} />
      <Typography variant='customSubtitle'>{subtitle ?? ''}</Typography>
      <div className='grid grid-cols-12 gap-4 w-full mt-4'>
        <GenericForm
          control={form.control}
          inputs={infoInputs}
        />
      </div>
      <Typography
        variant='customSubtitle'
        mt={4}
      >
        Archivos adjuntos
      </Typography>
      <div className='text-b5 text-gray-light text-justify leading-[17px] mb-2'>
        Seleccione uno o más archivos (PDF, Word, Excel, Imagen(jpg, jpeg, png), Video(mp4)), por
        favor no utilizar nombres largos o caracteres especiales. Envié una cantidad máxima de 5
        archivos de los cuales cada uno no puede pesar más de 5mb. Una vez confirmados los archivos,
        de clic al botón “confirmar carga”.
      </div>

      <div
        {...getRootProps()}
        className='border border-dashed border-gray-400 bg-blue-50 rounded-md p-6 text-center cursor-pointer h-40'
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography color='primary'>Suelta los archivos aquí...</Typography>
        ) : (
          <div className='flex flex-col h-full justify-center items-center'>
            <CloudUpload
              color='primary'
              fontSize='large'
            />
            <Typography color='primary'>
              Haz clic para subir un archivo o arrástralo aquí
            </Typography>
          </div>
        )}
      </div>

      {/* Lista de archivos */}
      <div className='mt-4 space-y-2'>
        {files.map((file, index) => (
          <div
            key={file.id || index}
            className='flex justify-between items-center bg-gray-100 rounded px-4 py-2'
          >
            <span className='text-b5 truncate'>{file.nombre}</span>
            <IconButton
              size='small'
              onClick={() => removeFile(index)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProcessInfo
