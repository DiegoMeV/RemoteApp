import { Box, Button, CircularProgress } from '@mui/material'
import CardInfo from './CardInfo'
import { useInfoCards } from '../funcs'
import {
  BackdropLoading,
  CustomAccordion,
  ErrorPage,
  Loading,
  processDocument,
  TableComplainantOrAccused,
  useGetActorsFamilyServices,
  useGetAlerts,
  useGetBufferDocument,
  useListModelsInfo,
  useMutationDynamicBaseUrl,
  usePrivileges,
  useQueryDynamicApi,
} from '@/lib'
import ActorProcessInfo from './actorProcessInfo/ActorProcessInfo'
import { useEffect, useState } from 'react'
import { StepsToCreateAlert } from '@/app/applications/alerts/[edition]/components'
import { HeaderViewAlert } from '@/app/applications/components'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const CardsInfoData = ({ infoMain, idProcess, showPendingActs }) => {
  const [info, setInfo] = useState(infoMain)
  const idAlert = info?.processData?.cgrAlertas?.idAlert
  const {
    data: infoAlert,
    isLoading: isLoadingAlert,
    isError: isErrorAlert,
  } = useGetAlerts({ enabled: idAlert !== undefined, qry: `/${idAlert}?aumentarInfo=true` })
  const idModel = infoAlert?.data?.[0]?.modeloInfo?.id
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const [isViewingAlert, setIsViewingAlert] = useState(false)
  const {
    foundData,
    processData,
    assignedTaskInfo,
    columnsActivity,
    columnsEntity,
    sigedocInfo,
    isLoading,
    parentProcessInfo,
    dataAlert,
    sigedocFile,
    infoProcessPerformanceResults,
    infoContract,
    infoThird,
    infoPayOrder,
    infoPayEmpData,
    infoPayDescuentoData,
    infoPayFormData,
    solicitudPptalData,
    disponibilidadPptalData,
    compromisoPptalData,
    solCompromisoPptalData,
  } = useInfoCards({
    info,
    setIsViewingAlert,
  })

  const {
    data: getProcessActor,
    isLoading: loadingProcessActor,
    // isError: errorVariablesContract,
  } = useQueryDynamicApi({
    url: `/processes/${idProcess}/actors?inclActorType=true&actorTypeKey=PETICIONARIO`,
    baseKey: 'urlProcess',
    isCompanyRequest: true,
  })
  const [newBuffer, setNewBuffer] = useState(null)

  const {
    complainants,
    loadingComplainants,
    errorComplainants,
    accuseds,
    loadingAccuseds,
    errorAccuseds,
  } = useGetActorsFamilyServices(idProcess)

  const {
    data: blocksByModel,
    isLoading: loadingBlocks,
    isError: errorBlocks,
  } = useListModelsInfo({
    qry: `/${idModel}/bloquesActivos/${idAlert}`,
    enabled: idModel !== undefined || idAlert !== undefined,
  })

  const variablesObject = blocksByModel?.data.reduce((acc, block) => {
    block.variables?.forEach((variable) => {
      if (variable.dato_alerta_valor !== null) {
        const valueVar =
          variable.dato_alerta_valor === 'false'
            ? false
            : variable.dato_alerta_valor === 'true'
            ? true
            : variable.dato_alerta_valor
        // Filter null values
        acc[variable.variable_id] = {
          idDatoAlerta: variable.dato_alerta_id,
          value: valueVar,
          variable: variable.variable_titulo,
        }
      }
    })
    return acc
  }, {})

  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId

  const { mutateAsync: getBuffer, isLoading: loadingBuffer } = useGetBufferDocument({
    companyId,
    onSuccess: async (response) => {
      const buffer = await processDocument({ buffer: response })
      setNewBuffer(buffer)
    },
    onError: () => {
      toast.error('Error al obtener el sticker')
    },
  })

  useEffect(() => {
    if (info?.processData?.idDocumentSticker) {
      getBuffer({ qry: `${info?.processData?.idDocumentSticker}/documentos` })
    }
  }, [info?.processData?.idDocumentSticker])

  const canRefetchData = usePrivileges('procesos.opciones_especiales.actualizar_datos_siifweb')

  const { mutateAsync: refetchInfo, isPending: isPendingRefetch } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes`,
    isCompanyRequest: true,
    method: 'PATCH',
    onSuccess: (e) => {
      setInfo({ ...info, processData: e?.data?.processData })
      toast.success('Datos actualizados')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al actualizar los datos')
    },
  })

  //TODO: These cards are better include in a map function

  return (
    <Box component={'div'}>
      {!isViewingAlert ? (
        <>
          {loadingProcessActor || (isPendingRefetch && <BackdropLoading loading={true} />)}
          {info?.processData?.idDocumentSticker && (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              position='relative'
              mb={5}
            >
              <Button
                variant='contained'
                onClick={() =>
                  setPreviewer({
                    open: true,
                    idDocument:
                      info?.processData?.idDocumentStickerPdf ??
                      info?.processData?.idDocumentSticker,
                    loadingPreviewer: true,
                  })
                }
                sx={{
                  m: 2,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 1,
                }}
              >
                Descargar sticker
              </Button>
              {loadingBuffer ? (
                <CircularProgress size={40} />
              ) : (
                <img
                  src={newBuffer}
                  height={200}
                  alt='sticker'
                  style={{ height: 'auto' }}
                />
              )}
            </Box>
          )}

          {info?.idParentProcess && isLoading && <BackdropLoading loading={isLoading} />}
          <CardInfo
            title={'Datos del proceso'}
            info={processData}
          />
          {complainants?.data?.length > 0 && (
            <CustomAccordion
              title='Denunciantes'
              defaultExpanded={true}
            >
              <TableComplainantOrAccused
                actors={complainants}
                loadingActors={loadingComplainants}
                errorActors={errorComplainants}
                onlyRead={true}
              />
            </CustomAccordion>
          )}
          {info?.processData?.solicitudPptalData && (
            <CardInfo
              title={'Datos de la Solicitud de CDP'}
              info={solicitudPptalData}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/solicitudPptalData`,
                privilege: canRefetchData,
              }}
            />
          )}
          {info?.processData?.disponibilidadPptalData && (
            <CardInfo
              title={'Datos del CDP'}
              info={disponibilidadPptalData}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/disponibilidadPptalData`,
                privilege: canRefetchData,
              }}
            />
          )}
          {info?.processData?.compromisoPptalData && (
            <CardInfo
              title={'Datos del RP'}
              info={compromisoPptalData}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/compromisoPptalData`,
                privilege: canRefetchData,
              }}
            />
          )}
          {info?.processData?.solCompromisoPptalData && (
            <CardInfo
              title={'Solicitud de RP'}
              info={solCompromisoPptalData}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/solCompromisoPptalData`,
                privilege: canRefetchData,
              }}
            />
          )}
          {info?.processData?.payFormData && (
            <CardInfo
              title={'Datos de la Planilla'}
              info={infoPayFormData}
            />
          )}
          {info?.processData?.payOrderData && (
            <CardInfo
              title={'Datos de la orden de pago'}
              info={infoPayOrder}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/payOrderData`,
                privilege: canRefetchData,
              }}
            />
          )}

          {info?.processData?.payOrderEmpData && (
            <CardInfo
              title={'Datos de la orden de pago de empleados'}
              info={infoPayEmpData}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/payOrderEmpData`,
                privilege: canRefetchData,
              }}
            />
          )}
          {info?.processData?.payOrderDescuentoData && (
            <CardInfo
              title={'Datos de la orden de pago de descuento'}
              info={infoPayDescuentoData}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/payOrderDescuentoData`,
                privilege: canRefetchData,
              }}
            />
          )}
          {info?.processData?.thirdData && (
            <CardInfo
              title={'Datos del tercero'}
              info={infoThird}
            />
          )}
          {info?.processData?.contractData && (
            <CardInfo
              title={'Datos del contrato'}
              info={infoContract}
              refreshData={{
                api: refetchInfo,
                url: `/${idProcess}/update-siifweb-data/contractData`,
                privilege: canRefetchData,
              }}
            />
          )}
          {info?.processData?.cgrAlertas && (
            <CardInfo
              title={'Datos de la alerta'}
              info={dataAlert}
            />
          )}
          {info?.processData?.processPerformanceResults && (
            <CardInfo
              title={'Datos del insumo enviado'}
              info={infoProcessPerformanceResults}
            />
          )}
          {info?.processData?.entities?.length > 0 && (
            <CardInfo
              title={'Entidades'}
              info={info?.processData?.entities}
              columnsActivity={columnsEntity}
              getId={(row) => row.idEntity}
            />
          )}
          {accuseds?.data?.length > 0 && (
            <CustomAccordion
              title='Denunciados'
              defaultExpanded={true}
            >
              <TableComplainantOrAccused
                actors={accuseds}
                loadingActors={loadingAccuseds}
                errorActors={errorAccuseds}
                onlyRead={true}
              />
            </CustomAccordion>
          )}
          {foundData && sigedocInfo && (
            <CardInfo
              title={'Datos SIGEDOC'}
              info={sigedocInfo}
              sigedocFile={sigedocFile}
              isPreviewerSigedoc={true}
            />
          )}
          {foundData && info.idParentProcess && (
            <CardInfo
              title={'Datos proceso Origen'}
              info={parentProcessInfo}
            />
          )}
          {info?.processActors?.TERCERO_CONTRATISTA && (
            <CardInfo
              title={'Datos del contratista'}
              info={assignedTaskInfo}
            />
          )}
          {loadingProcessActor && <BackdropLoading loading={loadingProcessActor} />}
          {getProcessActor?.data.length > 0 && (
            <ActorProcessInfo getProcessActor={getProcessActor?.data?.[0]} />
          )}
          {showPendingActs && (
            <CardInfo
              title={'Actividades por gestionar'}
              info={info?.pendingActivities}
              columnsActivity={columnsActivity}
            />
          )}
        </>
      ) : (
        <>
          {isLoadingAlert ? (
            <Loading />
          ) : isErrorAlert ? (
            <ErrorPage />
          ) : (
            <>
              {loadingBlocks ? (
                <BackdropLoading loading={loadingBlocks} />
              ) : errorBlocks ? (
                'Error al cargar bloques'
              ) : (
                <>
                  <HeaderViewAlert
                    title={`Visualización de alerta ${infoAlert?.data?.[0]?.identificador ?? ''}`}
                    handleBack={() => setIsViewingAlert(false)}
                  />
                  <StepsToCreateAlert
                    infoAlert={infoAlert?.data?.[0]}
                    blocksByModel={blocksByModel}
                    variablesObject={variablesObject}
                    idEdition={idAlert}
                    isView={true}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default CardsInfoData
