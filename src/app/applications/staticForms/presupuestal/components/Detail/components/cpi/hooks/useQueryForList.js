// Query para traer la lista de cpc

const useQueryForList = ({ nit_compania, proyecto, ano }) => {
  const query = `SELECT
                    vi.codigo_act,
                    vi.id_actividad,
                    vi.nombre_actividad,
                    vi.codigo_ins,
                    vi.id_insumo,
                    vi.nombre_subtipo nombre_insumo,
                    programa,
                    id_programa,
                    subprograma,
                    id_subprograma
                  FROM
                      v_ins_wp vi
                  WHERE
                      vi.nit_compania = '${nit_compania}'
                      AND vi.proyecto = ${proyecto}
                      AND vi.anno = ${ano} and
                      (
                        translate(upper(vi.codigo_act), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                        translate(upper(vi.nombre_actividad), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                        translate(upper(vi.codigo_ins), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
                      ) ORDER BY
                      codigo_act,
                      codigo_ins`

  return query
}

export default useQueryForList
