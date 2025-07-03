import { ViewRequestedDataPage } from './views'
import { v4 as uuidv4 } from 'uuid'
import {
  bodyGenerateSIGEDOCReceiveCOMM,
  editionProccessBody,
  useAnonymActivities,
  useGetDocument,
  useMutationDynamicBaseUrl,
} from '@/lib'
import toast from 'react-hot-toast'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
const RequestedDataPage = () => {
  const [comment, setComment] = useState('')
  const [deliveryType, setDeliveryType] = useState('PARTIAL')
  const [fileStoreType, setFileStoreType] = useState('')
  const [infoSentDetails, setInfoSentDetails] = useState('')

  const [basicInfo, setBasicInfo] = useState({
    subject: '',
  })
  const [infoThirdDestination, setInfoThirdDestination] = useState({
    name: '',
    lastName: '',
    identification: '',
    correo: '',
    typeIdentification: '',
  })
  const { control } = useForm()

  const handleChange = (event) => {
    setDeliveryType(event.target.value)
  }

  const { searchParams } = useSearchParams()
  const idCompany = searchParams.get('idCompany')
  const idProcess = searchParams.get('idProcess')
  const idEntidad = searchParams.get('idEntidad')
  const idDocument = searchParams.get('idDocument')

  const idActivity = useMemo(() => uuidv4(), [])

  const onSuccessSigedoc = (response) => {
    if (response?.data?.errores) {
      toast.error(response?.data?.errores?.mensajeError ?? '')
      return
    }

    toast.success(response?.data?.documentoComunicacion?.mensaje ?? 'Creación de SIGEDOC exitosa')
    const SIGEDOC = response?.data?.documentoComunicacion ?? {}
    const infoSIGEDOC = editionProccessBody(SIGEDOC)
    anonymActivitiesPost(infoSIGEDOC)
  }

  const onErrorEvent = (err) => toast.error(err?.response?.data?.error ?? 'Ha ocurrido un error')

  const { mutateAsync: generateSigedoc, isPending: loadingSigedoc } = useMutationDynamicBaseUrl({
    baseKey: 'urlCgrInt',
    companyId: idCompany,
    isCompanyRequest: true,
    url: '/SIGEDOC/comunicacion/externa-recibida',
    onSuccess: onSuccessSigedoc,
    onError: onErrorEvent,
  })

  const { mutateAsync: sendAnonymActivities, isPending: loadingSend } = useAnonymActivities({
    onSuccess: () => {
      toast.success('Formulario enviado con éxito.')
    },
    onError: (e) => {
      const error = e.response?.data?.error
      toast.error(error ? error : 'Error al enviar el formulario.')
    },
    idCompany: idCompany,
    idProcess: idProcess,
  })
  const { data: infoDocument } = useGetDocument({ qry: `/${idDocument}`, enabled: !!idDocument })

  const handleSubmit = async () => {
    const { documentoComunicacion } = bodyGenerateSIGEDOCReceiveCOMM(
      basicInfo,
      infoThirdDestination
    )

    try {
      await generateSigedoc({ body: documentoComunicacion })
    } catch (error) {
      toast.error(
        error?.message ?? 'Falló la generacion de codigo SIGEDOC. Por favor, intenta de nuevo.'
      )
    }
  }

  const { mutateAsync: terceroRegistro, isPending: loadingTerceroRegistro } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlCgrInt',
      method: 'get',
      isCompanyRequest: true,
      companyId: idCompany,
      url: `/SIGEDOC/consultar-tercero`,
      onSuccess: (response) => {
        if (response?.success) {
          const terceroExtract = response?.data?.terceraPersona
          setInfoThirdDestination({
            ...infoThirdDestination,
            name: terceroExtract?.nombre ?? '',
            lastName: terceroExtract?.apellidos ?? '',
            correo: terceroExtract?.correo ?? '',
          })
        }
      },
    })

  const handleBlurTercero = (ev) => {
    if (ev.target.value === '') return

    if (ev.target.name !== 'identification' && ev.target.name !== 'typeIdentification') return

    const { typeIdentification, identification } = infoThirdDestination

    if (typeIdentification === '' || identification === '') return
    const qry = `/tipo-documento/${typeIdentification}/numero-documento/${identification}`

    terceroRegistro({ qry })
  }

  const anonymActivitiesPost = async (infoSIGEDOC) => {
    let data = {
      idActivity: idActivity,
      comment: comment,
      deliveryType: deliveryType,
      idEntidad: idEntidad,
      fileStoreType: fileStoreType,
      infoSentDetails: infoSentDetails,
      sigedocData: infoSIGEDOC,
    }

    if (deliveryType === 'EXTENTION') {
      data = {
        ...data,
        fileStoreType: '',
        infoSentDetails: '',
      }
    }

    try {
      await sendAnonymActivities(data)
    } catch (error) {
      toast.error(error?.message ?? 'Falló el envío de la actividad. Por favor, intenta de nuevo.')
    }
  }

  const props = {
    handleChange,
    comment,
    setComment,
    deliveryType,
    fileStoreType,
    setFileStoreType,
    infoSentDetails,
    setInfoSentDetails,
    handleSubmit,
    basicInfo,
    setBasicInfo,
    infoThirdDestination,
    setInfoThirdDestination,
    loadingSend: loadingSend || loadingSigedoc || loadingTerceroRegistro,
    control,
    infoDocument,
    handleBlurTercero,
  }
  return <ViewRequestedDataPage {...props} />
}

export default RequestedDataPage
