export const FORM_GLOBAL_VARIABLES = ({ nit_compania }) => `SELECT
                und_commom.valorparametro('PPTO DETALLE CPC', ${nit_compania})                                  detalecpc,
                und_commom.valorparametro('PPTO DETALLE PRY', ${nit_compania})                                  detallepry,
                TO_NUMBER(und_commom.valorparametro('UVT ACTAS', ${nit_compania}))                              miuvt,
                und_commom.valorparametro('PPTO DETALLE PRY IMPLEMENTACION', ${nit_compania})                   detallepryimple,
                und_commom.valorparametro('CUENTA BANCARIA OP', ${nit_compania})                                miparametro,
                und_commom.valorparametro('BOTON CESION Y EMBARGOS OP DIRECTA', ${nit_compania})                miparametro2,
                und_commom.valorparametro('APLICA NRO RESOLUCION OP EXTRAPRESUPUESTAL', ${nit_compania})        miparametro3,
                und_commom.valorparametro('ACTIVAR CAMPO CXP EN LA OP', ${nit_compania})                        miparametro4,
                und_commom.valorparametro('OPCION COPIAR CONCEPTO COMPROMISO', ${nit_compania})                 miparametro5,
                TO_NUMBER(und_commom.valorparametro('SUELDO MINIMO',${nit_compania}))                           misalminimo

            FROM
                dual`
