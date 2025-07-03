const useQueryForList = ({ nit_compania }) => {
  const query = `SELECT *
          FROM
            comprobantepptal_w
          WHERE 
            nit_compania='${nit_compania ?? ''}'
          AND tipo_compptal='COMPROMISO'
          AND (
            translate(upper(nrodoc), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
            translate(upper(tipo_compptal), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
            translate(upper(nro_comprobantepptal), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
          )`

  return query
}

export default useQueryForList
