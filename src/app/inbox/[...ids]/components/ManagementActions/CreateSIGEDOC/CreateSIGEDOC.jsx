import {
  AttachedDocumentsSIGEDOC,
  BackdropLoading,
  FolderManagementSIGEDOC,
  FormSIGEDOC,
  GenericTextfield,
  MagicString,
  SearchRelatedSIGEDOC,
  bodyGenerateSIGEDOC,
  editionProccessBody,
  formatToLocaleDate,
  toArray,
  useMutationDynamicBaseUrl,
  useMutationOnlyBodyParams,
} from '@/lib'
import { DocumentContainer, ElementContainer } from '..'
import { useFieldArray, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import { useProcessFunctions, useProcessModifyItem } from '../hooks'
import toast from 'react-hot-toast'
import { useStoreState } from 'easy-peasy'

const CreateSIGEDOC = ({
  action,
  ids,
  refetchManagement,
  elementData,
  refetchElementActions,
  processInfo,
}) => {
  const originOfficeData = processInfo?.[0]?.originOfficeData
  const userData = useStoreState((state) => state.user.userData)
  const [idProcess, idActivity] = ids || []
  const defaultValues = elementData?.[0]?.actionItemSpecs
  const idActivityAction = action?.activityActionData?.id

  const form = useForm({ defaultValues })

  const dataSIGEDOC = elementData?.[0]?.activityActionItemData?.sigedocResponse?.infoSIGEDOC

  const [responseSigedoc, setResponseSigedoc] = useState()

  const { mutateAsync: dynamicRequest, isPending: pendingRequest } = useMutationOnlyBodyParams({})

  //TODO: Hacer que estos le lleguen los datos -- WAIT FOR IMPLEMENT
  // PENDIENTE
  const [arrDigitalFiles, setArrDigitalFiles] = useState([])
  const [arrAddFiles, setArrAddFiles] = useState([])

  const getUserSIGEDOC = ({ idDependency = '', idUser = '' }) => {
    if (!idUser) return
    dynamicRequest({
      isCompanyRequest: true,
      baseKey: 'urlCgrInt',
      enabled: !!idDependency,
      url: `/SIGEDOC/dependencia/${idDependency}/usuarios`,
      methodBody: 'get',
      onSuccess: (response) => {
        const data = response?.data
        const currentUser = idUser ? data?.find((user) => user?.idUser === idUser) : data?.[0]
        form.setValue('userDestiny', currentUser)
      },
    })
  }

  useEffect(() => {
    // TODO: Adaptar las busquedas para que los valores sean los correctos, serie, carpeta, tipologia, etc
    if (elementData?.[0]?.activityActionItemData?.sigedocData) {
      const sigedocData = elementData?.[0]?.activityActionItemData?.sigedocData

      dynamicRequest({
        isCompanyRequest: true,
        baseKey: 'urlUsers',
        enabled: !!sigedocData?.idDestionationOffice,
        url: `/hierarchy/${sigedocData?.idDestionationOffice}`,
        methodBody: 'get',
        onSuccess: (response) => {
          const data = response?.data
          form.setValue('destinyOffice', data)
          if (sigedocData?.idDestionationUser) return
          getUserSIGEDOC({
            idDependency: data?.TRDcode ?? '',
            idUser: sigedocData?.idDestionationUser ?? '',
          })
        },
      })

      dynamicRequest({
        isCompanyRequest: true,
        baseKey: 'urlCgrInt',
        enabled: !!originOfficeData?.TRDcode,
        url: `/SIGEDOC/dependencia/${originOfficeData?.TRDcode}/series-documentales`,
        methodBody: 'get',
        onSuccess: (response) => {
          const data = response?.data

          const currentSerie = sigedocData?.idSerie
            ? data?.find((serie) => serie?.id === sigedocData.idSerie)
            : data?.[0]
          form.setValue('serie', currentSerie)
        },
      })

      // TODO: Add missing fields

      form.setValue('subject', sigedocData?.subject)

      form.setValue('tercero', sigedocData?.tercero)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementData])

  const onSuccessSigedoc = (response) => {
    if (response?.data?.errores) {
      toast.error(response?.data?.errores?.mensajeError ?? '')
      return
    }
    setResponseSigedoc(response)
    toast.success(response?.data?.documentoComunicacion?.mensaje ?? 'Creación de SIGEDOC exitosa')
    const SIGEDOC = response?.data?.documentoComunicacion ?? {}
    const infoSIGEDOC = editionProccessBody(SIGEDOC)
    if (!idActivityAction) {
      updateProcess({
        idTaskAction: action?.id,
      })
    } else {
      const formData = form.getValues()

      const idSerie = formData?.serie?.id
      const idSubSerie = formData?.subserie?.id
      const idDestionationUser = formData?.userDestiny?.identificacion
      const idDestionationOffice = formData?.destinyOffice?.id
      const idFolder = formData?.folder?.idCarpeta
      const idTypology = formData?.typology?.id
      const idDocumentType = formData?.documentTypeRequest?.id

      const author = userData?.id

      const body = {
        idTaskActionItem: elementData?.[0]?.id,
        sigedocData: {
          author,
          idSerie,
          idSubSerie,
          idDestionationUser,
          idDestionationOffice,
          subject: formData?.subject,
          tercero: formData?.tercero,
          idFolder,
          idTypology,
          idDocumentType,
        },
        sigedocResponse: { infoSIGEDOC },
      }
      modifyItemInformation({ body })
    }
  }

  const onErrorEvent = (err) => toast.error(err?.response?.data?.error ?? 'Ha ocurrido un error')

  const qryRequestGenerateSigedoc = {
    IE: 'interna-enviada',
    EE: 'externa-enviada',
    ER: 'externa-recibida',
  }
  const typeSIGEOC = form.getValues('communications')

  const qry = qryRequestGenerateSigedoc[typeSIGEOC]

  const { mutateAsync: generateSigedoc, isPending: loadingSigedoc } = useMutationDynamicBaseUrl({
    baseKey: 'urlCgrInt',
    isCompanyRequest: true,
    url: `/SIGEDOC/comunicacion/${qry}`,
    onSuccess: onSuccessSigedoc,
    onError: onErrorEvent,
  })

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    refetchElementActions
  )

  const onSuccessUpdateProcess = (response) => {
    const qry = response?.data?.id ? `${response?.data?.id}/items` : ''

    const SIGEDOC = responseSigedoc?.data?.documentoComunicacion ?? {}
    const infoSIGEDOC = editionProccessBody(SIGEDOC)

    const formData = form.getValues()

    const idSerie = formData?.serie?.id
    const idDestionationUser = formData?.userDestiny?.identificacion
    const idDestionationOffice = formData?.destinyOffice?.id
    const idFolder = formData?.folder?.idCarpeta
    const idTypology = formData?.typology?.id
    const idDocumentType = formData?.documentTypeRequest?.id

    const author = userData?.id

    const body = {
      idTaskActionItem: elementData?.[0]?.id,
      sigedocData: {
        author,
        idSerie,
        idDestionationUser,
        idDestionationOffice,
        subject: formData?.subject,
        tercero: formData?.tercero,
        idFolder,
        idTypology,
        idDocumentType,
      },
      sigedocResponse: { infoSIGEDOC },
    }

    modifyItemInformation({ qry, body })
  }

  const { updateProcess, isPendingUpdateProcess } = useProcessFunctions(
    idProcess,
    idActivity,
    refetchManagement,
    null,
    onSuccessUpdateProcess
  )

  const extractId = (arr) => {
    return arr?.map((file) => {
      if (file?.archivoProceso) return { ...file }
      const fileProcess = { ...file }
      delete fileProcess.id
      return { ...fileProcess }
    })
  }

  const infoSigedocRelated = ({ arrSearch }) => {
    const sigedocRelated = arrSearch?.filter(
      (sigedoc) => sigedoc?.idCadena !== '' && sigedoc?.idCadena !== 'none'
    )

    const newSigedocRelatedArr = sigedocRelated.filter(
      (value, index, self) => index === self.findIndex((t) => t?.idCadena === value?.idCadena)
    )

    const listaEsRespuestaDe = newSigedocRelatedArr?.map((sigedoc) => sigedoc?.idCadena)

    form?.setValue('arrSearch', newSigedocRelatedArr)

    return listaEsRespuestaDe
  }

  const onSubmit = async (data) => {
    const isResponseSigedoc = data?.isResponseSigedoc

    if (arrDigitalFiles.length === 0) {
      toast.error(MagicString.MANAGEMENT.SIGEDOC_DIGITAL_FILES_NO_ELEMENTS)
      return
    }

    if (isResponseSigedoc && data?.arrSearch.length === 0) {
      toast.error(MagicString.MANAGEMENT.SIGEDOC_SEARCH_NO_ELEMENTS)
      return
    }

    const originOffice = data?.originOffice
    const serie = data?.serie
    const destinyOffice = data?.destinyOffice
    const destinyUser = data?.userDestiny
    const idAuthor = userData?.documentId
    const subject = data?.subject
    const folder = data?.folder
    const typology = data?.typology
    const documentTypeRequest = data?.documentTypeRequest

    const descripcion = data?.descripcion
    const tercero = data?.tercero

    const dataForSigedoc = {
      originOffice,
      serie,
      destinyOffice,
      destinyUser,
      idAuthor,
      subject,
      folder,
      typology,
      documentTypeRequest,
      tercero,
    }

    const bodyContainer = bodyGenerateSIGEDOC(dataForSigedoc, null, originOfficeData, typeSIGEOC)
    const bodyImprov = {
      documentoComunicacion: {
        ...bodyContainer.documentoComunicacion,
        documentos: {
          anexos: extractId(arrAddFiles),
          archivosDigitales: extractId(arrDigitalFiles),
          descripcion: descripcion ?? '',
        },
      },
    }

    const sigedocRelated = infoSigedocRelated({
      arrSearch: toArray(data?.arrSearch),
    })

    const listaEsRespuestaDe = isResponseSigedoc ? toArray(sigedocRelated) : []

    const bodyAdded = isResponseSigedoc
      ? { documentoComunicacion: { ...bodyImprov.documentoComunicacion, listaEsRespuestaDe } }
      : bodyImprov

    const body = bodyAdded?.documentoComunicacion

    await generateSigedoc({ body })
  }

  const isEditable = !!dataSIGEDOC?.SIGEDOCcodigoDeSeguimiento
  const base64Image = `data:image/jpeg;base64,${dataSIGEDOC?.archivo}`

  const fieldArray = useFieldArray({
    control: form?.control,
    name: 'arrSearch',
  })

  return (
    <DocumentContainer
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <BackdropLoading
        loading={loadingSigedoc || loadingItemCreation || isPendingUpdateProcess || pendingRequest}
      />
      <ElementContainer isRequired={action?.isRequired}>
        <Grid
          item
          xs={12}
          md={6}
        >
          <GenericTextfield
            label='SIGEDOC'
            value={dataSIGEDOC?.SIGEDOCcodigoDeSeguimiento ?? ''}
            disabled={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <GenericTextfield
            label='Fecha SIGEDOC'
            value={formatToLocaleDate(dataSIGEDOC?.SIGEDOCfechaRadicacion)}
            disabled={true}
          />
        </Grid>
        {dataSIGEDOC?.archivo && (
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent='center'
          >
            <img
              src={base64Image}
              style={{
                maxWidth: '35%',
                height: 'auto',
              }}
              alt='Descripción de la imagen'
            />
          </Grid>
        )}

        <FormSIGEDOC
          form={form}
          originOfficeData={originOfficeData}
          sigedocData={elementData?.[0]?.activityActionItemData?.sigedocData}
          disabled={isEditable}
        />
        {(typeSIGEOC === 'IE' || typeSIGEOC === 'EE') && (
          <FolderManagementSIGEDOC
            form={form}
            originOfficeData={originOfficeData}
            sigedocData={elementData?.[0]?.activityActionItemData?.sigedocData}
            disabled={isEditable}
          />
        )}
        {typeSIGEOC && (
          <AttachedDocumentsSIGEDOC
            form={form}
            title='Archivo Digital'
            disabled={isEditable}
            isProcessFiles={true}
            isDigitalFile={true}
            docsInformation={{ arrDoc: arrDigitalFiles, setArrDoc: setArrDigitalFiles }}
            idProcess={idProcess}
          />
        )}
        {typeSIGEOC && (
          <AttachedDocumentsSIGEDOC
            form={form}
            disabled={isEditable}
            isDescriptionInput={true}
            isProcessFiles={true}
            docsInformation={{ arrDoc: arrAddFiles, setArrDoc: setArrAddFiles }}
            idProcess={idProcess}
          />
        )}
        <SearchRelatedSIGEDOC
          form={form}
          idProcess={idProcess}
          fieldArray={fieldArray}
          disabled={isEditable}
        />
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant='contained'
            type='submit'
            disabled={isEditable}
          >
            Guardar
          </Button>
        </Grid>
      </ElementContainer>
    </DocumentContainer>
  )
}

export default CreateSIGEDOC
