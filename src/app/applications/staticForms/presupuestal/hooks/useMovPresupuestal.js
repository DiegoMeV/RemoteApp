/* eslint-disable react-hooks/exhaustive-deps */
import { useOracleExecutes } from '@/libV4'
import { useEffect, useState } from 'react'

const useMovPresupuestal = ({
  nit_compania,
  dataComprobantepptal_w,
  nro_comprobantepptal,
  setSelectedRubro,
}) => {
  const [responseQuery, setResponseQuery] = useState(null)
  const { getQueryResult, isPendingQuery } = useOracleExecutes()

  useEffect(() => {
    ;(async () => {
      if (nit_compania && dataComprobantepptal_w) {
        const query = `SELECT  
            m.rubro_id,
            m.fecha,
            m.tercero_bd,
            m.tercero_type_bd,
            ru.numero_rubro, 
            ru.nombre AS nombre_rubro,
            m.recurso,
            m.id_centrocosto,
            m.proyecto,
            m.fuente_id,
            m.cpc,
            cw.codigo AS codigo_cpc,
            m.cpi,
            iw.codigo AS codigo_cpi,
            fu.numero_fuente,
            m.nro_comprobantepptal,
            m.tipo_compptal, 
            m.nromovpptal,
            m.ano,
            m.tipo_ppto, 
            m.valor AS valor 
          FROM  
            movpresupuestal_w m,
            rubro_w ru,
            fuente_w fu,
            cpc_w cw,
            cpi_w iw
          WHERE  
            m.nit_compania = '${nit_compania}' AND 
            m.nro_comprobantepptal =  ${nro_comprobantepptal} AND 
            m.tipo_compptal = '${dataComprobantepptal_w.tipo_compptal}' AND 
            m.rubro_id = ru.rubro_id AND
            m.nit_compania = ru.nit_compania AND 
            m.nit_compania = fu.nit_compania AND
            m.fuente_id = fu.fuente_id AND
            m.nit_compania = cw.nit_compania AND
            m.cpc = cw.id AND
            m.nit_compania = iw.nit_compania AND
            m.cpi= iw.id`

        const result = await getQueryResult(query)
        setSelectedRubro(result?.data ?? [])
        setResponseQuery(result?.data)
      }
    })()
  }, [dataComprobantepptal_w, nit_compania, getQueryResult])
  return { responseQuery, isPendingQuery }
}

export default useMovPresupuestal
