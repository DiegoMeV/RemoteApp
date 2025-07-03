export const getMenuOptions = ({ bloquear_imp, navigate, ordenPagouData }) => {
  return [
    {
      label: 'Auditoría',
    },
    {
      label: 'Impuestos',
      disabled: bloquear_imp === 'S',
    },
    {
      label: 'Descuentos Fijos',
      disabled: bloquear_imp === 'S',
    },
    {
      label: 'Documentos',
    },
    {
      label: 'Obligación',
      onClick: () =>
        navigate(
          `/applications/staticForms/presupuestal/obligacionPresupuestal?compptalType=OBLIGACION&nrodoc_orden=${ordenPagouData?.orden}&prefijo_orden=${ordenPagouData?.prefijo}`
        ),
    },
    {
      label: 'Ver anticipos y amortización',
    },
  ]
}
