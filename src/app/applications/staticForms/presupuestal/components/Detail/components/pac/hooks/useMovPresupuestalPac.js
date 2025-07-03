import { useOracleExecutes } from '@/libV4'
import { useEffect, useState } from 'react'

const useMovPresupuestalPac = ({
  nit_compania,
  tipo_compptal,
  nro_comprobantepptal,
  rubro_id,
  nromovpptal,
  setPacs,
}) => {
  const [responseQuery, setResponseQuery] = useState(null)
  const { getQueryResult } = useOracleExecutes()

  useEffect(() => {
    const fetchData = async () => {
      if (!nit_compania || !tipo_compptal || !nro_comprobantepptal) return

      const query = `SELECT 
                        mes, 
                        valor
                    FROM 
                      pacxcomp_w
                    WHERE 
                        nit_compania = '${nit_compania}' AND
                        rubro_id = ${rubro_id} AND
                        nromovpptal = ${nromovpptal} AND
                        tipo_compptal = '${tipo_compptal}'`

      const result = await getQueryResult(query)
      setPacs(result?.data ?? [])
      setResponseQuery(result?.data ?? null)
    }

    fetchData()
  }, [
    nit_compania,
    tipo_compptal,
    nro_comprobantepptal,
    getQueryResult,
    rubro_id,
    setPacs,
    nromovpptal,
  ])

  return responseQuery
}

export default useMovPresupuestalPac
