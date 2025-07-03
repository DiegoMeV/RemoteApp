import {
  Acuerdos,
  Avaluos,
  Cartera,
  Expedientes,
  Facturas,
  Pagos,
  Propietarios,
} from '../components'

const useDebtTabs = (props) => {
  const originalTabs = [
    {
      id: 'cartera',
      label: 'Cartera',
      component: <Cartera {...props} />,
    },
    {
      id: 'acuerdos',
      label: 'Acuerdos',
      component: <Acuerdos {...props} />,
    },
    {
      id: 'factura',
      label: 'Facturas',
      component: <Facturas {...props} />,
    },
    {
      id: 'pagos',
      label: 'Pagos',
      component: <Pagos {...props} />,
    },
    {
      id: 'propietarios',
      label: 'Propietarios',
      component: <Propietarios {...props} />,
    },
    {
      id: 'expedientes',
      label: 'Expedientes',
      component: <Expedientes {...props} />,
    },
    {
      id: 'avalúos',
      label: 'Avalúos',
      component: <Avaluos {...props} />,
    },
  ]

  return { detailTabs: originalTabs }
}

export default useDebtTabs
