import {
  ImputacionContable,
  DepuracionRetFuente,
  DetalleOrden,
  EntradaAlmacen,
  Interventores,
  ObligacionPorOrden,
} from '../components/Detail/components'
import { firstValidationTipo } from '../components/Master/constants'

const useTabsDetails = (props) => {
  const tipo = props?.getFormValue('orden_pagou.tipo')
  const validationTipo = firstValidationTipo.includes(tipo)

  const originalTabs = [
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
          display: validationTipo ? 'none' : 'block',
        },
      },
    },
    {
      id: 'entradaAlmacen',
      label: 'Entrada almacén',
      component: (componentProps) => (
        <EntradaAlmacen
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
          display: validationTipo ? 'none' : 'block',
        },
      },
    },
    {
      id: 'interventores',
      label: 'Interventores',
      component: (componentProps) => (
        <Interventores
          {...props}
          {...componentProps}
        />
      ),
      props: {
        sx: {
          textTransform: 'none',
          display: validationTipo ? 'none' : 'block',
        },
      },
    },
    {
      id: 'depuracionRetFuente',
      label: 'Depuración Retención en la fuente',
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
      id: 'obligacionPorOrden',
      label: 'Obligación por orden (Nuevos Clasificadores)',
      component: (componentProps) => (
        <ObligacionPorOrden
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
      label: 'Imputación contable pago',
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
  ]

  return { detailTabs: originalTabs }
}

export default useTabsDetails
