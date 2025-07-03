export const infoDebt = ({ nit_compania }) => {
  return `SELECT * 
    FROM siim.v_infovehiculos
    WHERE nit_compania = '${nit_compania}'`
}
