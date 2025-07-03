const useQueryForList = ({ nit_compania, nro_comprobantepptal, compptalType }) => {
  const query = `
          SELECT  
            m.rubro_id,
            m.fecha,
            m.tercero_bd,
            m.tercero_type_bd,
            m.nro_relacionado,
            m.nromovpptal_rel,
            m.tipo_relacionado,
            m.soli_comp,
            m.nrodoc_rel,
            m.adicion,
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
            c.nro_comprobantepptal,
            m.tipo_compptal, 
            m.nromovpptal,
            c.nrodoc,
            m.ano,
            m.tipo_ppto, 
            m.valor AS valor 
          FROM  
            movpresupuestal_w m,
            relxcomp_w r,
            comprobantepptal_w c,
            rubro_w ru,
            fuente_w fu,
            cpc_w cw,
            cpi_w iw
          WHERE  
            m.nit_compania = '${nit_compania}' AND 
            m.nro_comprobantepptal = r.nro_relacionado AND 
            m.tipo_compptal = r.tipo_relacionado AND 
            r.nit_compania = m.nit_compania AND 
            r.nro_comprobantepptal = ${nro_comprobantepptal} AND 
            r.tipo_compptal = '${compptalType}' AND 
            c.nit_compania = '${nit_compania}' AND 
            c.nro_comprobantepptal = m.nro_comprobantepptal AND 
            c.tipo_compptal = m.tipo_compptal AND
            m.rubro_id = ru.rubro_id AND
            m.nit_compania = ru.nit_compania AND 
            m.nit_compania = fu.nit_compania AND
            m.fuente_id = fu.fuente_id AND
            m.nit_compania = cw.nit_compania AND
            m.cpc = cw.id AND
            m.nit_compania = iw.nit_compania AND
            m.cpi = iw.id AND
            (
          translate(upper(m.rubro_id), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
          translate(upper(ru.numero_rubro), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
          translate(upper(ru.nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
          )`

  return query
}

export default useQueryForList
