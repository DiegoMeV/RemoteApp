import { valueToNumber, valueToString } from '@/libV4'

export const generateSequence = ({ nit_compania }) => {
  return `
    SELECT TO_CHAR( NVL( MAX( TO_NUMBER(secuencia) ),0)+1 ) secuencia
    FROM siif.atoliq_punica
    WHERE nit_compania = '${nit_compania}'
`
}

export const infoIndividualPlanilla = ({ nit_compania, paramsSecuence }) => {
  return `SELECT *
    FROM siif.v_planilla_autoliq_web
    WHERE nit_compania = '${nit_compania}'
  AND secuencia = '${paramsSecuence}'`
}

export const infoCompany = ({ nit_compania }) => {
  return `
  SELECT co.nit_compania,
       co.nit_compania nit, 
       co.nombre razonsocial,
       co.digito_ver dig_ver,
       co.codarp,
       co.nit_compania || '-' || co.digito_ver nit_fmt,
       co.codarp || ' ' || ter.nombre || ' ' || ter.apellido_1 || ' ' || ter.apellido_2 nomarp_mostrar,
       pu.secuencia,
       SYSDATE fechapag,
       'NI' tipodoc

FROM siif.compania co

JOIN siif.tercero ter ON ter.nit_compania = co.nit_compania
                     AND ter.codigo_al = co.codarp
                     
JOIN (  
    SELECT nit_compania, TO_CHAR( NVL( MAX( TO_NUMBER(secuencia) ),0)+1 ) secuencia
    FROM siif.atoliq_punica
    GROUP BY nit_compania 
) pu ON pu.nit_compania = co.nit_compania
                    

WHERE co.nit_compania = '${nit_compania}'
  `
}

export const infoPUAutoliq = ({ nit_compania }) => {
  return `
    SELECT *
    FROM siif.v_planilla_autoliq_web
    WHERE nit_compania = '${nit_compania}'
`
}

export const infoPeriodGroup = ({ nit_compania }) => {
  return `
    SELECT gru.*,
       TO_CHAR(gru.anno) || '-' || LPAD( gru.mes,2,'0') perpagopenrc,
       TO_CHAR( ADD_MONTHS( TO_DATE( gru.anno || gru.mes, 'YYYYMM' ), 1 ), 'YYYY-MM' ) perpagosalud
    FROM siif.grupos_de_periodos gru
    WHERE gru.nit_compania = '${nit_compania}'
    ORDER BY gru.grupo DESC
`
}

export const infoSucursal = ({ nit_compania }) => {
  return `
    SELECT *
    FROM siif.sucursal_al
    WHERE nit_compania = '${nit_compania}'
`
}

export const infoOperator = ({ nit_compania }) => {
  return `
    SELECT *
    FROM siif.operadores_autoliq
    WHERE nit_compania = '${nit_compania}'
`
}

export const infoDetailPUAtoliq = ({ nit_compania, secuence, paginationModel }) => {
  return `
  SELECT qpag.*
            FROM  (
              SELECT qorigen.*,
              rownum AS numfilapag,
              Count(*) OVER () AS total_count
                FROM   (
    SELECT *
    FROM siif.v_det_planilla_autoliq_web
    WHERE nit_compania = '${nit_compania}'
    AND secuenciapu = '${secuence}'
    ) qorigen
              ) qpag
              WHERE  qpag.numfilapag BETWEEN ( (${paginationModel?.page}) 
              * ${paginationModel?.pageSize} + 1 )
              AND (${paginationModel?.page + 1} * ${paginationModel?.pageSize} )
    `
}

export const postPUAtoliq = (body) => {
  return `
    INSERT INTO siif.atoliq_punica (
    nit_compania,
    nit,
    dig_ver,
    secuencia,
    razonsocial,
    tipodoc,
    formapres,
    codsucursal,
    nomsucursal,
    codarp,
    perpagopenrc,
    perpagosalud,
    numautoliq,
    fechapag,
    codoper,
    grupop,
    tipopagpensiones,
    tipoautoliq,
    tipoaportante,
    estado,
    esapite
) VALUES (
    ${valueToString(body?.nit_compania)},
    ${valueToString(body?.nit)},
    ${valueToString(body?.dig_ver)},
    ${valueToString(body?.secuencia)},
    ${valueToString(body?.razonsocial)},
    ${valueToString(body?.tipodoc)},
    ${valueToString(body?.formapres)},
    ${valueToString(body?.codsucursal)},
    ${valueToString(body?.nomsucursal)},
    ${valueToString(body?.codarp)},
    ${valueToString(body?.perpagopenrc)},
    ${valueToString(body?.perpagosalud)},
    ${valueToNumber(body?.numautoliq)},
    TO_TIMESTAMP( ${valueToString(body?.fechapag)}, 'YYYY-MM-DD"T"HH24:MI:SS.FF"Z"'),
    ${valueToString(body?.codoper)},
    ${valueToNumber(body?.grupop)},
    ${valueToNumber(body?.tipopagpensiones)},
    ${valueToString(body?.tipoautoliq)},
    ${valueToNumber(body?.tipoaportante)},
    ${valueToString(body?.estado)},
    ${valueToString(body?.esapite)}
)
    `
}
