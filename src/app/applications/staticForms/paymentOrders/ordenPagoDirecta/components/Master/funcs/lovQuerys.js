export const recursoQuery = ({ nit_compania }) => {
  return `SELECT
              recurso,
              nombre
          FROM
              recurso
          WHERE
              nit_compania = ${nit_compania}
          and (
                  translate(upper(recurso), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
                  order by 1`
}

export const centroCostoQuery = ({ nit_compania }) => {
  return `select id_centrocosto,nombre
                  from centrocosto
                  where nit_compania = ${nit_compania} 
                  and (
                  translate(upper(id_centrocosto), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
                  order by 1`
}

export const terceroQuery = ({ nit_compania, queryParams }) => {
  return `SELECT
              tercero,
              substr(nombre
                    || ' '
                    || apellido_1
                    || ' '
                    || apellido_2, 1, 255) nombre,
              tercero_type           tipo,
              dependencia            dependencia
          FROM
              tercero
          WHERE
                  tercero <> 1
              AND nit_compania = ${nit_compania}
              AND nvl(activo, 'S') = 'S'
              AND tercero = nvl(${queryParams.tercero ?? null}, tercero)
              AND tercero_type = nvl(${queryParams?.untercerotype ?? null},
                                    tercero_type)
              AND tercero_type NOT IN ( 'CLIENTE' )
              AND (
                  translate(upper(tercero), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
          ORDER BY
              2,
              3`
}

export const unidadNegocioQuery = ({ nit_compania }) => {
  return `select codigo,nombre 
                  from unidad_negocio 
                  where nit_compania=${nit_compania} 
                  and (
                  translate(upper(codigo), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
                  and activo='S' 
                  order by 1`
}

export const idBancoQuery = ({ nit_compania, getFormValue }) => {
  return `SELECT ID_BANCO,
                      NRO_CUENTA,
                      TIPO_CUENTA,
                      NRO_CUENTA_FIDU,
                      NOMBRE_CUENTA
                  FROM   CUENTA_BANCARIA_TERCERO
                  WHERE  NIT_COMPANIA = ${nit_compania} AND
                      TERCERO = ${getFormValue('orden_pago.tercero')} AND
                      TERCERO_TYPE = '${getFormValue('orden_pago.tercero_type')}'
                  ORDER BY 1, 2`
}

export const idTipoRetQuery = ({ nit_compania }) => {
  return `SELECT
              id_tipo_ret,
              descripcion
          FROM
              tipos_ret
          WHERE
              nit_compania = ${nit_compania}
          AND (
              translate(upper(id_tipo_ret), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
              translate(upper(descripcion), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
          ORDER BY
              1, 2`
}

export const cptoCausacionQuery = ({ nit_compania }) => {
  return `SELECT
              cpto_causacion,
              nombre
          FROM
              ${nit_compania === 800099310 ? 'cpto_gasto' : 'cpto_causacion'}
          WHERE
              nit_compania = ${nit_compania}
          AND (
              translate(upper(cpto_causacion), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
              translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
          ORDER BY
              cpto_causacion`
}

export const terceroEmbargoQuery = ({ nit_compania, queryParams }) => {
  return `SELECT
              tercero,
              substr(nombre
                    || ' '
                    || apellido_1
                    || ' '
                    || apellido_2, 1, 255) nombre,
              tercero_type           tipo,
              dependencia            dependencia
          FROM
              tercero
          WHERE
                  tercero <> 1
              AND nit_compania = ${nit_compania}
              AND nvl(activo, 'S') = 'S'
              AND tercero = nvl(${queryParams.tercero ?? null}, tercero)
              AND tercero_type = nvl(${queryParams?.untercerotype ?? null},
                                    tercero_type)
              AND tercero_type NOT IN ( 'CLIENTE' )
              AND (
                  translate(upper(tercero), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                  translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
          ORDER BY
              2,
              3`
}

export const cptoAnticiposQuery = ({ nit_compania }) => {
  return `SELECT
              cpto_anticipo,
              nombre
          FROM
              cpto_anticipo
          WHERE
              nit_compania = ${nit_compania}
          AND (
                translate(upper(cpto_anticipo), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') OR
                translate(upper(nombre), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE translate(upper('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU'))
          ORDER BY
              1`
}

export const nroDocRelQuery = ({ nit_compania, getFormValue }) => {
  return `SELECT
              c.nrodoc,
              c.concepto,
              c.tipo_compptal,
              c.nro_comprobantepptal
          FROM
              comprobantepptal_w c,
              tipo_contrato      tc
          WHERE
                  c.nit_compania = ${nit_compania}
              AND tipo_compptal = 'COMPROMISO'
              AND c.estado = 'V'
              AND c.prefijo = ${getFormValue('orden_pago.prefijo')}
              AND tc.clase = 'PAGO_DIRECTO'
              AND c.nit_compania = tc.nit_compania
              AND c.tipo_contrato = tc.tipo_contrato
          ORDER BY
              1, 2`
}
