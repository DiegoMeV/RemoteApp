import toast from 'react-hot-toast'
import { typeHandlers } from '../../../funcs'

export const validateInputs = [
  'orden_pago.prefijo',
  'orden_pago.fecha',
  'orden_pago.concepto',
  'orden_pago.tipo',
  'orden_pago.estado',
  'orden_pago.id_centrocosto',
  'orden_pago.tipo_cpto',
]

export const preInsert = async ({
  nit_compania,
  getQueryResult,
  setFormValue,
  validationData,
  setNewGlobalVariables,
}) => {
  const prefijo = validationData?.prefijo

  const responseOrden = await getQueryResult(`SELECT
                                                    nvl(
                                                        max(orden),
                                                        0
                                                    ) + 1 orden
                                                FROM
                                                    orden_pago
                                                WHERE
                                                    nit_compania = ${nit_compania}`)

  if (!responseOrden?.success) {
    toast.error(`Error al obtener el número de orden`)
    return
  }

  const nroOrden = responseOrden?.data?.[0]?.orden

  setFormValue('orden_pago.orden', nroOrden)

  const responseNroDoc = await getQueryResult(`SELECT
                                                    MAX(t.nrodoc) nrodoc
                                                FROM
                                                    (
                                                        SELECT
                                                            nvl(
                                                                max(nrodoc),
                                                                0
                                                            ) + 1 nrodoc
                                                        FROM
                                                            orden_pagou
                                                        WHERE
                                                                nit_compania = ${nit_compania}
                                                            AND prefijo = ${prefijo}
                                                        UNION ALL
                                                        SELECT
                                                            nvl(
                                                                max(nrodoc),
                                                                0
                                                            ) + 1 nrodoc
                                                        FROM
                                                            orden_pago
                                                        WHERE
                                                                nit_compania = ${nit_compania}
                                                            AND prefijo = ${prefijo}
                                                    ) t`)

  if (!responseNroDoc?.success) {
    toast.error(`Error al obtener el número de documento`)
    return
  }

  const nroDoc = responseNroDoc?.data?.[0]?.nrodoc
  setFormValue('orden_pago.nrodoc', nroDoc)

  setNewGlobalVariables({ prefijo })

  if (nit_compania === '800099310') {
    const responseNroDdas = await getQueryResult(`SELECT
                                nvl(
                                    max(nro_ddas),
                                    ${prefijo} * 100000
                                ) + 1 nro_ddas
                            FROM
                                orden_pago
                            WHERE
                                    nit_compania = ${nit_compania}
                                AND prefijo = ${prefijo}
                                AND doc_ddas = ${validationData?.doc_ddas}`)

    const nro_ddas = responseNroDdas?.data?.[0]?.nro_ddas
    setFormValue('orden_pago.nro_ddas', nro_ddas)

    const validationOrdenPago = await getQueryResult(`SELECT
                                                          COUNT(*) micont
                                                      FROM
                                                          orden_pago op
                                                      WHERE
                                                              op.nit_compania = ${nit_compania}
                                                          AND op.tercero = ${validationData?.tercero}
                                                          AND op.tercero_type = ${validationData?.tercero_type}
                                                          AND op.estado <> 'A'
                                                          AND to_char(op.fecha, 'YYYY') = to_char(${validationData?.fecha},
                                                                                                  'YYYY')
                                                          AND to_char(op.fecha, 'MM') = to_char(${validationData?.fecha},
                                                                                                'MM')`)
    const micont = validationOrdenPago?.data?.[0]?.micont
    if (micont > 0) {
      toast.error('Ya existe una orden de pago de este tercero en el mismo mes, por favor revisar')
      return
    }
  }

  return
}

export const whenValidate = async ({
  nit_compania,
  queryParamsPks,
  validationData,
  queryParams,
  getProcedureResult,
}) => {
  const convertDate = typeHandlers['date']
  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpdFecha: {
      type: 'IN',
      value: convertDate(validationData?.fecha),
    },
    UnOpdFechaApliDevret: {
      type: 'IN',
      value: validationData?.fecha_apli_devret
        ? convertDate(validationData?.fecha_apli_devret)
        : null,
    },
    UnOpdTipoCompcnt: {
      type: 'IN',
      value: validationData?.tipo_compcnt ?? null,
    },
    UnOpdPrefijo: {
      type: 'IN',
      value: validationData?.prefijo,
    },
    UnOpdDivision: {
      type: 'IN',
      value: validationData?.division,
    },
    UnOpdTercero: {
      type: 'IN',
      value: validationData?.tercero,
    },
    UnOpdTerceroType: {
      type: 'IN',
      value: validationData?.tercero_type,
    },
    UnOpdCptoCausacion: {
      type: 'IN',
      value: validationData?.cpto_causacion,
    },
    UnOpdEstado: {
      type: 'IN',
      value: validationData?.estado,
    },
    UnOpdDevolucionRetenciones: {
      type: 'IN',
      value: validationData?.devolucion_retenciones ? 'S' : 'N',
    },
    UnParameterProceso: {
      type: 'IN',
      value: queryParams?.unparameterproceso ?? null,
    },
    UnRecordStatus: {
      type: 'IN',
      value: queryParamsPks?.orden ? null : 'NEW',
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }

  return await getProcedureResult({
    params,
    statement: `BEGIN siif.pkgweb_orden_pagod.ordenpagod_when_validate(
                                        :UnaCompania,
                                        :UnOpdFecha,
                                        :UnOpdFechaApliDevret,
                                        :UnOpdTipoCompcnt,
                                        :UnOpdPrefijo,
                                        :UnOpdDivision,
                                        :UnOpdTercero,
                                        :UnOpdTerceroType,
                                        :UnOpdCptoCausacion,
                                        :UnOpdEstado,
                                        :UnOpdDevolucionRetenciones,
                                        :UnParameterProceso,
                                        :UnRecordStatus,
                                        :OutStatus,
                                        :OutMessage);
                                  END;`,
  })
}
