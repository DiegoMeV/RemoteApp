import {
  BackdropLoading,
  BasicDataInbox,
  BasicTitle,
  CustomModal,
  FolderManagementSIGEDOC,
  FormSIGEDOC,
  GenericTable,
  bodyGenerateSIGEDOC,
  editionProccessBody,
  resizeColumns,
  useBoolean,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
} from '@/lib'
import { useState } from 'react'
import AddOrEditResult from './AddOrEditResult'
import { Button, Grid } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { columnsRA } from './funcs'
import { useForm } from 'react-hook-form'
import { useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const ResultsAct = ({ ids, idAlert, originOfficeData }) => {
  const userData = useStoreState((state) => state.user.userData)
  const [idProcess, idActivity] = ids || []
  const {
    data: resultsAct,
    isLoading: loadingResultsAct,
    isFetching: fetchingResultsAct,
    refetch: refetchResultAct,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/resultadoActuacion?idProcess=${idProcess}&idActivity=${idActivity}`,
  })

  const modalResultAct = useBoolean()
  const transferModal = useBoolean()
  const summaryModal = useBoolean()
  const [summaryData, setSummaryData] = useState()
  const transferForm = useForm()
  const [rowParams, setRowParams] = useState()

  const apiRef = useGridApiRef()

  const handleShow = () => {
    modalResultAct.handleShow()
    resizeColumns(apiRef, loadingResultsAct)
  }

  const handleShowTransfer = () => {
    transferModal.handleShow()
    transferForm.reset()
    transferForm.setValue('communications', 'IE')
  }

  const columns = columnsRA(setRowParams, handleShow)

  const { mutateAsync: transferAlert, isPending: transferingAlert } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/apps-specific/alerts/${idProcess}/${idActivity}/${
      rowParams?.id?.toLowerCase() ?? ''
    }/transfer-alert`,
    onSuccess: (response) => {
      transferModal.handleShow()
      modalResultAct.handleShow()
      summaryModal.handleShow()
      setSummaryData(response?.data ?? {})
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Ha ocurrido un error')
    },
  })

  const onSuccessSigedoc = (response) => {
    const formValues = transferForm.getValues()
    const idOfficeTo = formValues?.destinyOffice?.id

    const resultDescription = rowParams?.descripcion

    if (response?.data?.errores) {
      toast.error(response?.data?.errores?.mensajeError ?? '')
      return
    }
    toast.success(response?.data?.documentoComunicacion?.mensaje ?? 'Creación de SIGEDOC exitosa')
    const SIGEDOC = response?.data?.documentoComunicacion ?? {}
    const sigedocData = editionProccessBody(SIGEDOC)
    transferAlert({ body: { idOfficeTo, resultDescription, sigedocData } })
  }

  const onErrorEvent = (err) => {
    if (err) {
      toast.error(err?.response?.data?.error ?? '')
      return
    }
    toast.error('Ha ocurrido un error')
  }

  const { mutateAsync: generateSigedoc, isPending: loadingSigedoc } = useMutationDynamicBaseUrl({
    baseKey: 'urlCgrInt',
    isCompanyRequest: true,
    url: `/SIGEDOC/comunicacion/interna-enviada`,
    onSuccess: onSuccessSigedoc,
    onError: onErrorEvent,
  })

  const onSubmit = async () => {
    const data = transferForm?.getValues()
    const originOffice = data?.originOffice
    const serie = data?.serie
    const subSerie = data?.subserie
    const destinyOffice = data?.destinyOffice
    const destinyUser = data?.userDestiny
    const idAuthor = userData?.documentId
    const subject = data?.subject
    const folder = data?.folder
    const typology = data?.typology
    const documentTypeRequest = data?.documentTypeRequest

    const dataForSigedoc = {
      originOffice,
      serie,
      subSerie,
      destinyOffice,
      destinyUser,
      idAuthor,
      subject,
      folder,
      typology,
      documentTypeRequest,
    }

    const bodyContainer = bodyGenerateSIGEDOC(dataForSigedoc, null, originOfficeData, 'IE')
    const body = bodyContainer?.documentoComunicacion

    await generateSigedoc({ body })
  }

  return (
    <Grid
      item
      xs={12}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <BasicTitle title='Resultados actuación' />
        </Grid>
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
            onClick={() => {
              setRowParams({ isNew: true })
              handleShow()
            }}
          >
            Agregar
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <GenericTable
            rows={resultsAct?.data ?? []}
            columns={columns ?? []}
            loading={loadingResultsAct || fetchingResultsAct}
            apiRef={apiRef}
          />
        </Grid>
        <CustomModal
          title={`${!rowParams?.isNew ? 'Editar' : 'Crear'} Resultado de Actuación`}
          open={modalResultAct.show}
          handleClose={handleShow}
          size='lg'
        >
          <AddOrEditResult
            idProcess={idProcess}
            idActivity={idActivity}
            idAlert={idAlert}
            rowParams={rowParams}
            setRowParams={setRowParams}
            handleClose={handleShow}
            refetchResultAct={refetchResultAct}
            handleShowTransfer={handleShowTransfer}
          />
        </CustomModal>
        <CustomModal
          title={`Trasladar resultado de actuación`}
          open={transferModal.show}
          handleClose={transferModal.handleShow}
          size='lg'
          modalType='form'
          actions={[
            {
              label: 'Cancelar',
              onClick: transferModal.handleShow,
            },
            {
              label: 'Trasladar',
              onClick: onSubmit,
            },
          ]}
        >
          {/* form, sigedocData, disabled, originOfficeData */}
          <Grid
            container
            spacing={2}
          >
            <BackdropLoading loading={loadingSigedoc || transferingAlert} />
            <FormSIGEDOC
              form={transferForm}
              // sigedocData={elementData?.[0]?.activityActionItemData?.sigedocData}
              originOfficeData={originOfficeData}
            />
            <FolderManagementSIGEDOC
              form={transferForm}
              originOfficeData={originOfficeData}
            />
          </Grid>
        </CustomModal>
        <CustomModal
          title='Resumen de traslado'
          open={summaryModal.show}
          handleClose={summaryModal.handleShow}
        >
          <BasicDataInbox
            idProcess={summaryData?.id}
            showPendingActs={false}
          />
        </CustomModal>
      </Grid>
    </Grid>
  )
}

export default ResultsAct
