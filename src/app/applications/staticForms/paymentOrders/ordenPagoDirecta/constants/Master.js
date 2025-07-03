export const getMenuOptions = ({ navigate, globalVariables, ordenPagoData }) => {
  const tipoOrdenPagoIsCesantias = ordenPagoData?.tipo === 'CESANTIAS'

  const bloquear_imp = globalVariables?.bloquear_imp || 'N'

  const validationMiParametro2 = globalVariables?.miparametro2 === 'NO'

  return [
    { label: 'Cesiones y Embargos', hidden: validationMiParametro2 },
    {
      label: 'Obligación',
      hidde: tipoOrdenPagoIsCesantias,
      onClick: () =>
        navigate(
          `/applications/staticForms/presupuestal/obligacionPresupuestal?compptalType=OBLIGACION&nrodoc_orden=${ordenPagoData?.orden}&prefijo_orden=${ordenPagoData?.prefijo}`
        ),
    },
    {
      label: 'Auditoría',
    },
    {
      label: 'Retenciones',
      disabled: bloquear_imp === 'S',
    },
    {
      label: 'Descuentos Fijos',
      disabled: bloquear_imp === 'S',
    },
    {
      label: 'Causación contable',
    },
    {
      label: 'Documentos',
    },
    {
      label: 'Digitalización',
    },
    {
      label: 'Imprimir',
    },
    {
      label: 'Dev Retenciones',
    },
  ]
}
