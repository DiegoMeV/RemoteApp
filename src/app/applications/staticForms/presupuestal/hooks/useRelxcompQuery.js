import { useOracleExecutes } from '@/libV4'
import { useEffect, useState } from 'react'

const useRelxcompQuery = ({
  nit_compania,
  tipo_compptal,
  nro_comprobantepptal,
  setSelectedCompromise,
}) => {
  const [responseQuery, setResponseQuery] = useState(null)
  const { getQueryResult, isPendingQuery } = useOracleExecutes()

  useEffect(() => {
    const fetchData = async () => {
      if (!nit_compania || !tipo_compptal || !nro_comprobantepptal) return

      const query = `
        SELECT r.*, c.concepto, c.nrodoc
        FROM relxcomp_w r
        JOIN comprobantepptal_w c
          ON r.nro_relacionado = c.nro_comprobantepptal
         AND r.nit_compania = c.nit_compania
        WHERE r.tipo_compptal = '${tipo_compptal}'
          AND r.nit_compania = '${nit_compania}'
          AND r.nro_comprobantepptal = '${nro_comprobantepptal}'
          AND c.tipo_compptal = 'COMPROMISO'
      `

      const result = await getQueryResult(query)
      setSelectedCompromise(result?.data ?? [])
      setResponseQuery(result?.data ?? null)
    }

    fetchData()
  }, [nit_compania, tipo_compptal, nro_comprobantepptal, getQueryResult, setSelectedCompromise])

  return { responseQuery, isPendingQuery }
}

export default useRelxcompQuery
