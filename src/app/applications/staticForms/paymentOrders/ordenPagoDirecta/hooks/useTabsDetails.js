import {
  DepuracionRetFuente,
  DetalleOrden,
  ImputacionContable,
  ObligacionPorOrdenNC,
  OrdenadorPago,
  Rechazos,
} from '../components/Detail/components'

const useTabsDetails = (props) => {
  let detailTabs = [
    {
      id: 'detalleOrden',
      label: 'Detalle orden',
      component: (componentProps) => (
        <DetalleOrden
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'obliPorOrdenNC',
      label: 'Obligaciones por orden (N. Clasif.)',
      component: (componentProps) => (
        <ObligacionPorOrdenNC
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'depuracionRetFuente',
      label: 'Depuración Rte. Fte.',
      component: (componentProps) => (
        <DepuracionRetFuente
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'imputacionContable',
      label: 'Imputación contable',
      component: (componentProps) => (
        <ImputacionContable
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'ordenPago',
      label: 'Ordenador de pago',
      component: (componentProps) => (
        <OrdenadorPago
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'rechazos',
      label: 'Rechazos',
      component: (componentProps) => (
        <Rechazos
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
  ]

  if ([800099310, 890102006]?.includes(props?.nit_compania)) {
    detailTabs = detailTabs.filter((tab) => tab.id !== 'depuracionRetFuente')
  }

  return { detailTabs: detailTabs }
}

export default useTabsDetails
