import { useOracleExecutes } from '@/libV4'
import { useEffect, useState } from 'react'

const useMovPresupuestalCpc = ({
  nit_compania,
  tipo_compptal,
  nro_comprobantepptal,
  rubro_id,
  nromovpptal,
  setCpcs,
}) => {
  const [responseQuery, setResponseQuery] = useState(null)
  const { getQueryResult } = useOracleExecutes()

  useEffect(() => {
    const fetchData = async () => {
      if (!nit_compania || !tipo_compptal || !nro_comprobantepptal) return

      const query = `SELECT 
                        m.nro_comprobantepptal, 
                        m.tipo_compptal,
                        m.valor,
                        c.id, 
                        c.codigo, 
                        c.nombre
                    FROM 
                      movpresupuestal_wc m
                    JOIN 
                      cpc_w c 
                      ON c.id = m.cpcd 
                      AND c.nit_compania = m.nit_compania
                    WHERE 
                        m.nit_compania = '${nit_compania}' AND
                        m.rubro_id = '${rubro_id}' AND
                        m.nro_comprobantepptal = ${nro_comprobantepptal} AND
                        m.nromovpptal = ${nromovpptal} AND
                        m.tipo_compptal = '${tipo_compptal}'`

      const result = await getQueryResult(query)
      setCpcs(result?.data ?? [])
      setResponseQuery(result?.data ?? null)
    }

    fetchData()
  }, [
    nit_compania,
    tipo_compptal,
    nro_comprobantepptal,
    getQueryResult,
    rubro_id,
    setCpcs,
    nromovpptal,
  ])

  return responseQuery
}

export default useMovPresupuestalCpc
