import { MagicString } from '@/lib'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { extractIdDigitalFiles } from '../funcs'

const useHandleActions = ({
  createProcess = () => {},
  editProcess = () => {},
  setActiveStep = () => {},
  getOffice = () => {},
  bodyGenerateSIGEDOC = () => {},
  generateSigedoc = () => {},
  updateActivity = () => {},
  activeStep,
  navigate,
  newIdOffice,
  idProcess,
  form,
  arrDigitalFiles = [],
}) => {
  const userData = useStoreState((state) => state.user.userData)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const objetSIGEDOC = {
    idAuthor: userData?.documentId ?? '',
    destinyUser: form.watch('usuarioDestino'),
    folder: form.watch('carpeta'),
    destinyOffice: form.watch('additionalData.officeDestination'),
    serie: form.watch('serie'),
    documentTypeRequest: form.watch('tipoDocumento'),
    typology: form.watch('tipoDocumentales'),
  }
  const conditionalsObSubmit = {
    0: (data) => {
      const { additionalData } = data
      const adaptAdditonalData = Object.keys(additionalData).reduce((acc, item) => {
        acc[item] = additionalData?.[item]?.id ?? additionalData?.[item]
        return acc
      }, {})

      const body = {
        idOfficeOrigin: data?.office?.id,
        idProcessType: data?.typeProcess?.id,
        processData: {
          additionalData: { ...adaptAdditonalData },
        },
      }
      if (idProcess) {
        editProcess({ body: { processData: body.processData } })
        return
      }

      createProcess({ body })
    },
    1: () => {
      setActiveStep(2)
    },
    2: async (data) => {
      if (arrDigitalFiles?.length === 0) {
        toast.error(MagicString.MANAGEMENT.SIGEDOC_DIGITAL_FILES_NO_ELEMENTS)
        return
      }

      const { additionalData } = data

      if (idProcess) {
        const adaptAdditonalData = Object.keys(additionalData ?? {}).reduce((acc, item) => {
          acc[item] = additionalData?.[item]?.id ?? additionalData?.[item]
          return acc
        }, {})
        editProcess({
          body: {
            processData: {
              additionalData: { ...adaptAdditonalData },
            },
          },
        })
      }

      const { destinyOffice, destinyUser, ...restSIGEDOC } = objetSIGEDOC

      const infoOffice = await getOffice({ qry: `/${newIdOffice}` })

      const sendSIGEDOC = {
        ...restSIGEDOC,
        subject: 'Envío de documento',
        destinyOffice: {
          ...destinyOffice,
          codigo: destinyOffice?.TRDcode,
        },
        destinyUser: {
          ...destinyUser?.identificacion,
          id: destinyUser?.identificacion,
        },
      }

      const bodyAdded = bodyGenerateSIGEDOC({ ...sendSIGEDOC }, null, infoOffice.data, 'IE')

      const bodyImprov = {
        documentoComunicacion: {
          ...bodyAdded.documentoComunicacion,
          documentos: {
            archivosDigitales: extractIdDigitalFiles(arrDigitalFiles),
          },
        },
      }

      const body = bodyImprov?.documentoComunicacion

      await generateSigedoc(body)
    },
    3: () => {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Finalizar ',
        content: '¿Está seguro que desea terminar la radicación?',
        onConfirm: () => {
          updateActivity({
            body: {
              status: 'COMPLETED',
            },
          })
        },
      })
    },
  }

  const handleBack = () => {
    if (activeStep === 0) {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: 'Activar',
        content: '¿Está seguro de volver a la bandeja?',
        onConfirm: () => {
          navigate('/inbox')
        },
      })
      return
    }
    setActiveStep((prev) => prev - 1)
  }

  const onSubmit = (data) => {
    conditionalsObSubmit?.[activeStep](data)
  }

  return { handleBack, onSubmit }
}

export default useHandleActions
