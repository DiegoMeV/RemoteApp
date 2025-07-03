export const FORM_GLOBAL_VARIABLES = ({ nit_compania }) => `SELECT
                und_commom.valorparametro('PPTO DETALLE CPC', ${nit_compania})                                  detalecpc,
                und_commom.valorparametro('PPTO DETALLE PRY', ${nit_compania})                                  detallepry,
                TO_NUMBER(und_commom.valorparametro('UVT ACTAS', ${nit_compania}))                              miuvt,
                und_nomina.constante(${nit_compania}, 1000)                                                     misalminimo,
                TO_NUMBER(und_commom.valorparametro('PORCENTAJE APORTE PENSION CONTRATISTAS', ${nit_compania})) porcenpension,
                und_commom.valorparametro('PPTO DETALLE PRY IMPLEMENTACION', ${nit_compania})                   detallepryimple,
                und_commom.valorparametro('CUENTA BANCARIA OP', ${nit_compania})                                miparametro
            FROM
                dual`
