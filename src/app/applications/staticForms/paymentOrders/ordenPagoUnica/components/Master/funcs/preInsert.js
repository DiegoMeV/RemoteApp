export const validateInputs = [
  'orden_pagou.prefijo',
  'orden_pagou.concepto',
  'orden_pagou.tipo',
  'orden_pagou.estado',
  'orden_pagou.fecha',
  'orden_pagou.tipo_contrato',
  'orden_pagou.nrodoc_contrato',
]

export const preInsert = async ({
  nit_compania,
  getQueryResult,
  getFunctionResult,
  setFormValue,
  validationData,
}) => {
  const prefijo = validationData?.prefijo

  const responseOrden = await getFunctionResult({
    packageName: 'pkg_consecutivos_opu',
    functionName: 'seq_nroopu',
    params: {
      pCompania: nit_compania,
    },
  })

  const orden = responseOrden?.data

  setFormValue('orden_pagou.orden', orden)

  const responseNroDoc = await getQueryResult(`SELECT
                                                MAX(T.nrodoc) nrodoc
                                                FROM
                                                (	 
                                                SELECT	NVL(MAX(nrodoc),0) + 1 nrodoc 
                                                FROM	orden_pagou 
                                                WHERE	nit_compania = ${nit_compania} AND 
                                                  prefijo = ${prefijo}
                                                UNION ALL
                                                SELECT	NVL(MAX(nrodoc),0) + 1 nrodoc
                                                FROM	orden_pago 
                                                WHERE	nit_compania = ${nit_compania} AND 
                                                  prefijo = ${prefijo}
                                                ) T`)

  const nrodoc = responseNroDoc?.data?.[0]?.nrodoc

  setFormValue('orden_pagou.nrodoc', nrodoc)

  // TODO :  if (nit_compania === '800099310') {
  //   const responseNroDdas =
  //     await getQueryResult(`SELECT NVL(MAX(nro_ddas),:orden_pagou.prefijo * 100000) + 1 nro_ddas
  //                                                 FROM	orden_pagou
  //                                                 WHERE	nit_compania = ${nit_compania} AND
  //                                                   prefijo = ${prefijo} AND
  //                                                   doc_ddas=${validationData?.doc_ddas}`)

  //   const nro_ddas = responseNroDdas?.data?.[0]?.nro_ddas
  //   setFormValue('orden_pagou.nro_ddas', nro_ddas)
  // }

  return
}

export const preUpdate = async ({ nit_compania, getProcedureResult, validationData }) => {
  if (validationData?.consecutivo_num_fe && validationData?.estado !== 'A') {
    const params = {
      UnaCompania: {
        type: 'IN',
        value: nit_compania,
      },
      UnOpuNroContrato: {
        type: 'IN',
        value: validationData?.nrodoc_contrato,
      },
      UnOpuTipoContrato: {
        type: 'IN',
        value: validationData?.tipo_contrato,
      },
      UnOpuPrefijoNumFe: {
        type: 'IN',
        value: validationData?.prefijo_num_fe || null,
      },
      UnOpuAplicaNumFe: {
        type: 'IN',
        value: validationData?.aplica_num_fe ? 'S' : 'N',
      },
      UnOpuPrefijo: {
        type: 'IN',
        value: validationData?.prefijo,
      },
      OutMiConsecutivo: {
        type: 'OUT',
      },
      OutGlobalNroDocFraeq: {
        type: 'OUT',
      },
      OutStatus: {
        type: 'OUT',
      },
      OutMessage: {
        type: 'OUT',
      },
    }
    const resultProcedure = await getProcedureResult({
      statement: `BEGIN siif.pkgweb_orden_pago.ordenpagou_numerar_fraeq(
                                                      :UnaCompania,
                                                      :UnOpuNroContrato,
                                                      :UnOpuTipoContrato,
                                                      :UnOpuPrefijoNumFe,
                                                      :UnOpuAplicaNumFe,
                                                      :UnOpuPrefijo,
                                                      :OutMiConsecutivo,
                                                      :OutGlobalNroDocFraeq,
                                                      :OutStatus,
                                                      :OutMessage); END;`,
      params,
    })
    return resultProcedure
  }
}
