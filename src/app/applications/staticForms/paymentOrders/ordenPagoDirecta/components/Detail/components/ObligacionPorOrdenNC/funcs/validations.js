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
    UnOpdFecha: {
      type: 'IN',
      value: convertDate(getFormValue('orden_pagou.fecha')) || null,
    },
    UnOpdPrefijo: {
      type: 'IN',
      value: getFormValue('orden_pagou.prefijo') || null,
    },
    UnOpdTercero: {
      type: 'IN',
      value: getFormValue('orden_pagou.tercero') || null,
    },
    UnOpdTerceroType: {
      type: 'IN',
      value: getFormValue('orden_pagou.tercero_type') || null,
    },
    UnOpdViaticos: {
      type: 'IN',
      value: getFormValue('orden_pagou.viaticos') || null,
    },
    UnOpoNroComprobantepptal: {
      type: 'IN',
      value: data?.nro_comprobantepptal || null,
    },
    UnOpoTipoComprobantepptal: {
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
    statement: `BEGIN siif.pkgweb_orden_pagod.ordenpagod_nrodoc_compptal_validate(
                                                        :UnaCompania,
                                                        :UnOpdFecha,
                                                        :UnOpdPrefijo,
                                                        :UnOpdTercero,
                                                        :UnOpdTerceroType,
                                                        :UnOpdViaticos,
                                                        :UnOpoNroComprobantepptal,
                                                        :UnOpoTipoComprobantepptal,
                                                        :OutStatus,
                                                        :OutMessage);
                                                        END;`,
    params,
  })
  return resultProcedure
}
