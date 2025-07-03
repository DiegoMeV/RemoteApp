import { ViewEditingAlert } from './view'
import { NoAccessCard, useGetAlerts, useGetAllParams, useListModelsInfo } from '@/lib'
import { AccessControl } from '@/libV4'
import { useParams } from 'react-router-dom'

const EditAlert = () => {
  const params = useParams()
  const isView = Boolean(useGetAllParams()?.isView)
  const idEdition = params?.edition === 'new' ? undefined : params?.edition
  const {
    data: infoAlertSelect,
    isFetching,
    isError,
  } = useGetAlerts({ enabled: idEdition !== undefined, qry: `/${idEdition}?aumentarInfo=true` })
  const idModel = infoAlertSelect?.data?.[0]?.modeloInfo?.id
  const idAlert = infoAlertSelect?.data?.[0]?.id
  const {
    data: blocksByModel,
    isFetching: loadingBlocks,
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
  return (
    <AccessControl
      privilege={
        isView
          ? 'cgr.alertas.visualizar_alertas'
          : idEdition === 'new'
          ? 'cgr.alertas.crear_alertas'
          : 'cgr.alertas.editar_alertas'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditingAlert
        idEdition={idEdition}
        infoAlert={infoAlertSelect?.data?.[0]}
        isLoading={isFetching}
        isError={isError}
        loadingBlocks={loadingBlocks}
        errorBlocks={errorBlocks}
        blocksByModel={blocksByModel}
        variablesObject={variablesObject}
        isView={isView}
      />
    </AccessControl>
  )
}

export default EditAlert
