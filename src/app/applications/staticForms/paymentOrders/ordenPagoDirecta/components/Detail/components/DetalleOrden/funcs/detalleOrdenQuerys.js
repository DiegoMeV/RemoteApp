export const QUERY_DETALLE_ORDEN = ({ nit_compania, queryParamsPks }) => {
  return `SELECT
              dt.nro_detalle,
              dt.id_centrocosto,
              dt.tercero,
              dt.grupo,
              dt.cpto_gasto,
              dt.id_conceptocaja,
              dt.valor,
              dt.iva,
              cc.nombre nombre_centro_costo,
              substr(t.nombre || ' ' || t.apellido_1 || ' ' || t.apellido_2, 1, 255) nombre_tercero,
              nvl(cg.nombre,coc.nombre) concepto,
              NVL(SUM(dt.valor), 0) + NVL(SUM(dt.iva), 0) -
              NVL(und_orden.sumaretenciones(${nit_compania}, NULL, NULL, NULL, ${queryParamsPks?.orden}), 0) AS valor_neto
          FROM
              siif.detalle_orden dt
              JOIN siif.centrocosto        cc ON dt.id_centrocosto = cc.id_centrocosto
                                          AND cc.nit_compania = dt.nit_compania
              JOIN siif.tercero       t ON dt.tercero = t.tercero
                                          AND dt.nit_compania = t.nit_compania
                                          AND dt.tercero_type = t.tercero_type
              LEFT JOIN siif.cpto_gasto cg ON dt.cpto_gasto = cg.cpto_gasto
                                          AND cg.nit_compania = dt.nit_compania
              LEFT JOIN siif.conceptocaja coc ON dt.id_conceptocaja = coc.id_conceptocaja
                                          AND coc.nit_compania = dt.nit_compania

          WHERE DT.nit_compania = ${nit_compania} AND DT.orden = ${queryParamsPks?.orden}
          
          GROUP BY
            dt.nro_detalle,
            dt.id_centrocosto,
            dt.tercero,
            dt.grupo,
            dt.cpto_gasto,
            dt.id_conceptocaja,
            dt.valor,
            dt.iva,
            cc.nombre,
            t.nombre,
            t.apellido_1,
            t.apellido_2,
            cg.nombre,
            coc.nombre`
}
