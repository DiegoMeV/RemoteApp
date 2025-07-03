export const infoNomina = ({ nit_compania, busqueda }) => {
  const searchCondition = busqueda
    ? `
      AND (
        TRANSLATE(UPPER(periodo), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') 
        OR
        TRANSLATE(UPPER(vinculacion), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
        OR
        TRANSLATE(UPPER(nomina), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
      )
    `
    : ''

  return `SELECT *
    FROM siif.v_nomina_web
    WHERE nit_compania = '${nit_compania}'
    ${searchCondition}
  `
}
