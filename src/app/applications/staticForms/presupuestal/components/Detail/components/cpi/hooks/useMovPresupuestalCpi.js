import { useOracleExecutes } from '@/libV4'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const useMovPresupuestalCpi = ({
  nit_compania,
  tipo_compptal,
  nro_comprobantepptal,
  rubro_id,
  fecha,
  nromovpptal,
  setCpis,
}) => {
  const [responseQuery, setResponseQuery] = useState(null)
  const { getQueryResult } = useOracleExecutes()

  useEffect(() => {
    const fetchData = async () => {
      if (!nit_compania || !tipo_compptal || !nro_comprobantepptal) return

      let minivel = 4

      try {
        const queryNivel = `
          SELECT NVL(nivel_mp, 4) AS nivel
          FROM plan_desarrollo pd
          WHERE nit_compania = '${nit_compania}'
          AND TRUNC(TO_DATE('${dayjs(fecha).format(
            'YYYY-MM-DD'
          )}', 'YYYY-MM-DD')) BETWEEN TRUNC(pd.fecha_inicio) AND TRUNC(pd.fecha_fin)
        `
        const resultNivel = await getQueryResult(queryNivel)
        minivel = resultNivel?.data?.[0]?.nivel ?? 4
      } catch (e) {
        console.error('Error fetching nivel_mp:', e)
        minivel = 4
      }

      const entidadesConNivel3 = [
        '8914800302',
        '8913800073',
        '892280021',
        '890102006',
        '8901020061',
        '8901020062',
        '890480059',
        '891900624',
        '891780009',
        '891900853',
      ]

      if (entidadesConNivel3.includes(nit_compania)) {
        minivel = 3
      }

      const query =
        minivel === 3
          ? `
            SELECT
              VI.codigo_act,
              VI.nombre_actividad,
              VI.codigo_ins,
              VI.nombre_subtipo,
              PP.programa,
              MP.valor,
              MP.actividad,
              MP.insumo,
              MP.programa,
              MP.subprograma
            FROM movpresupuestal_wp MP
            JOIN v_ins_wp VI ON MP.nit_compania = VI.nit_compania AND MP.insumo = VI.id_insumo AND MP.ano = VI.anno
            JOIN programa_pry PP ON MP.nit_compania = PP.nit_compania AND MP.programa = PP.id
            WHERE MP.nit_compania = '${nit_compania}'
              AND MP.tipo_compptal = '${tipo_compptal}'
              AND MP.nro_comprobantepptal = ${nro_comprobantepptal}
              AND MP.nromovpptal = ${nromovpptal}
              
          `
          : `
            SELECT
              VI.codigo_act,
              VI.nombre_actividad,
              VI.codigo_ins,
              VI.nombre_subtipo nombre_insumo,
              PP.subprograma,
              MP.valor,
              MP.actividad,
              MP.insumo,
              MP.programa,
              MP.subprograma
            FROM movpresupuestal_wp MP
            JOIN v_ins_wp VI ON MP.nit_compania = VI.nit_compania AND MP.insumo = VI.id_insumo AND MP.ano = VI.anno
            JOIN subprograma_pry PP ON MP.nit_compania = PP.nit_compania AND MP.subprograma = PP.id
            WHERE MP.nit_compania = '${nit_compania}'
              AND MP.tipo_compptal = '${tipo_compptal}'
              AND MP.nro_comprobantepptal = ${nro_comprobantepptal}
              AND MP.nromovpptal = ${nromovpptal}
              
          `

      const result = await getQueryResult(query)
      setCpis(result?.data ?? [])
      setResponseQuery(result?.data ?? null)
    }

    fetchData()
  }, [
    nit_compania,
    tipo_compptal,
    nro_comprobantepptal,
    rubro_id,
    getQueryResult,
    setCpis,
    fecha,
    nromovpptal,
  ])

  return responseQuery
}

export default useMovPresupuestalCpi
