import { typeHandlers } from '../../../../../funcs'

export const nroDocCompptalValidation = async ({
  nit_compania,
  data,
  getFormValue,
  getProcedureResult,
}) => {
  const convertDate = typeHandlers['date']

  const params = {
    UnaCompania: {
      type: 'IN',
      value: nit_compania,
    },
    UnOpuFecha: {
      type: 'IN',
      value: convertDate(getFormValue('orden_pagou.fecha')) || null,
    },
    UnOpuPrefijo: {
      type: 'IN',
      value: getFormValue('orden_pagou.prefijo') || null,
    },
    UnOpuTercero: {
      type: 'IN',
      value: getFormValue('orden_pagou.tercero') || null,
    },
    UnOpuTerceroType: {
      type: 'IN',
      value: getFormValue('orden_pagou.tercero_type') || null,
    },
    UnOpuNroContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.nro_contrato') || null,
    },
    UnOpuTipoContrato: {
      type: 'IN',
      value: getFormValue('orden_pagou.tipo_contrato') || null,
    },
    UnObliPONroComprobantePptal: {
      type: 'IN',
      value: data?.nro_comprobantepptal || null,
    },
    UnObliPOTipoComprobantePptal: {
      type: 'IN',
      value: data?.tipo_compptal || null,
    },
    OutStatus: {
      type: 'OUT',
    },
    OutMessage: {
      type: 'OUT',
    },
  }
  const resultProcedure = await getProcedureResult({
    statement: `BEGIN siif.pkgweb_orden_pago.obli_por_ordenu_nro_doc_compptal_validate(
                                                        :UnaCompania,
                                                        :UnOpuFecha,
                                                        :UnOpuPrefijo,
                                                        :UnOpuTercero,
                                                        :UnOpuTerceroType,
                                                        :UnOpuNroContrato,
                                                        :UnOpuTipoContrato,
                                                        :UnObliPONroComprobantePptal,
                                                        :UnObliPOTipoComprobantePptal,
                                                        :OutStatus,
                                                        :OutMessage); END;`,
    params,
  })
  return resultProcedure
}
