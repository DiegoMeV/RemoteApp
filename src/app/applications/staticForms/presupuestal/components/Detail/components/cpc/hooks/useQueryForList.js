const useQueryForList = ({ nit_compania, ano }) => {
  const query = `select id,codigo,nombre
    from cpc_w where nit_compania= '${nit_compania}'
    AND no_aplica= 'N' AND vigencia= ${ano} and
    (
      translate(upper(id), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
      translate(upper(codigo), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
      translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
    )`

  return query
}

export default useQueryForList
