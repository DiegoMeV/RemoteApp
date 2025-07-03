import toast from 'react-hot-toast'
import { blobToFileBuffer } from './documentDownloader'

export const onSubmitForm = ({
  form,
  activeStep,
  setColumnsFile,
  setRowsFile,
  setActiveStep,
  errors,
  massiveInsert,
  setLoading,
  closeModal,
  infoTypeDoc,
}) => {
  const onSubmit = async () => {
    const validation = await form.trigger()
    if (!validation) return toast.error('Corrija los errores antes de continuar')

    const data = form.getValues()
    setLoading(true)
    if (activeStep === 0) {
      await blobToFileBuffer(
        data.file,
        setColumnsFile,
        setRowsFile,
        setActiveStep,
        activeStep,
        setLoading
      )
      return
    }
    if (activeStep === 1 || activeStep === 2) {
      setLoading(false)
      if (infoTypeDoc?.FileColsSpecs === undefined) {
        toast.error('No hay columnas parametrizadas')
        return
      }
      setActiveStep(activeStep + 1)
      return
    }
    if (activeStep === 3) {
      if (errors.length === 0) {
        massiveInsert(data.finalRows)
        return
      } else {
        setLoading(false)
        toast.error('Corrija los errores antes de continuar')
        return
      }
    }
    if (activeStep === 4 && errors.length !== 0) {
      setLoading(false)
      closeModal()
    } else {
      setLoading(false)
      closeModal()
    }
  }
  return onSubmit
}
