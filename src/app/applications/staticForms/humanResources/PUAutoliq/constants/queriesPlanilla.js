export const infoTablePlanilla = ({ nit_compania, busqueda }) => {
  const searchCondition = busqueda
    ? `
    AND (
      TRANSLATE(UPPER(secuencia), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') 
      OR
      TRANSLATE(UPPER(nomplanilla), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%${busqueda}%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
      )
  `
    : ''
  return `
    SELECT *
    FROM siif.v_planilla_autoliq_web
    WHERE nit_compania = '${nit_compania}'
    ${searchCondition}

  `
}
