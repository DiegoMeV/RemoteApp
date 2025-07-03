import toast from 'react-hot-toast'
import { redondeo, redondeoacien_cond } from './utils'

export * from './depuracionRetFuenteQuerys'
export * from './events'
export * from './utils'

export const editableInpus = ({
  //   // nit_compania,
  globalVariables,
  watch,
  //   // getFormValue,
  setValue,
  ordenPagouData,
  //   // getQueryResult,
}) => {
  return [
    {
      name: 'valor_mes',
      type: 'money',
      label: 'Valor acumulado mes',
      // TODO : validate: (valor) => {
      //   const value = Number(valor) || 0

      //   if (value !== valores_dorden_pagou?.subtotalValue1 && nit_compania !== 800099310) {
      //     return 'El valor no puede ser diferente al total del detalle de la orden'
      //   }
      //   const valor_orden_pagou = Number(getFormValue('orden_pagou.valor')) || 0
      //   const iva = Number(getFormValue('orden_pagou.iva')) || 0
      //   const total = valor_orden_pagou + iva

      //   if (total > 0 && nit_compania !== 890102006) {
      //     return `El tercero tiene pagos en el mes por ${formatColombianMoney(total)}`
      //   }
      //   return true
      // },
    },
    {
      name: 'base_aportes',
      type: 'money',
      label: 'Base aportes',
      onClick: () => {
        const valor_mes = watch('valor_mes')
        const misalminimo = Number(globalVariables?.misalminimo) || 0
        if (redondeo(valor_mes * 0.4) < misalminimo) {
          setValue('base_aportes', misalminimo)
        } else {
          setValue('base_aportes', redondeo(valor_mes * 0.4))
        }
      },
    },
    {
      name: 'pago_salud',
      type: 'money',
      label: 'Pago salud',
      onClick: () => {
        const base_aportes = watch('base_aportes')
        setValue('pago_salud', redondeoacien_cond(base_aportes * 0.125))
      },
      validate: (valor) => {
        const value = Number(valor) || 0
        const pensionado = ordenPagouData?.pensionado ?? 'N'
        if (pensionado === 'N') {
          const base_aportes = Number(watch('base_aportes')) || 0
          if (value < Math.round(base_aportes * 0.125)) {
            return `El pago de salud no puede ser inferior al 12.5% del valor del mes`
          }
        }
      },
    },
    {
      name: 'pago_pension',
      type: 'money',
      label: 'Pago pensión',
      onClick: () => {
        const pensionado = ordenPagouData?.pensionado ?? 'N'
        if (pensionado === 'N') {
          const base_aportes = watch('base_aportes') || 0

          const valor_pension = redondeoacien_cond(Number(base_aportes) * 0.16)

          setValue('pago_pension', valor_pension)
          return
        }
        setValue('pago_pension', 0)
      },
      validate: (valor) => {
        const value = Number(valor) || 0
        const pensionado = ordenPagouData?.pensionado ?? 'N'
        if (pensionado === 'N') {
          const base_aportes = Number(watch('base_aportes')) || 0
          if (value !== redondeoacien_cond(base_aportes * 0.16)) {
            toast.error(`El aporte a pensión no puede ser diferente al 16% del valor del mes`)
            setValue('pago_pension', redondeoacien_cond(base_aportes * 0.16))
            return true
          }
        }
        return true
      },
    },
    // Validacion
    {
      name: 'pago_arp',
      type: 'money',
      label: 'Pago ARL',
      // onClick: async () =>
      //   await onClickPagoARP({
      //     nit_compania,
      //     getQueryResult,
      //     getFormValue,
      //     watch,
      //     setValue,
      //   }),

      // validate: async (valor) => {
      //   const value = Number(valor) || 0

      //   await validatePagoARP({
      //     value,
      //     nit_compania,
      //     getQueryResult,
      //     getFormValue,
      //     watch,
      //     setValue,
      //   })
      // },
    },
    {
      name: 'int_vivienda',
      type: 'money',
      label: 'Int vivienda',
    },
    {
      name: 'med_prepagada',
      type: 'money',
      label: 'Medicina prepagada',
      validate: (valor) => {
        const value = Number(valor) || 0
        if (value > 429456) {
          return `La medicina prepagada no puede ser mayor a 16 UVT`
        }
        return true
      },
    },
    {
      name: 'dependientes',
      type: 'money',
      label: 'Dependientes',
      validate: (valor) => {
        const value = Number(valor) || 0
        const valor_mes = Number(watch('valor_mes')) || 0
        if (value > valor_mes * 0.1) {
          return 'Este valor no puede ser mayor al 10% del valor acumulado del mes'
        }
        return true
      },
    },
    {
      name: 'cuentas_afc',
      type: 'money',
      label: 'Cuentas AFC',
    },
    {
      name: 'valor_deducible',
      type: 'money',
      label: 'Valor deducible',
    },
    // {
    //   name: 'totalBaseRetencion',
    //   type: 'money',
    //   label: 'Total (Base retención)',
    //   disabled: true,
    //   defaultValue: 0,
    // },
  ]
}

export const disabledInputs = () => [
  {
    name: 'base_retencion',
    type: 'money',
    label: 'Base retención',
    disabled: true,
  },
  {
    name: 'base_en_uvt',
    type: 'money',
    label: 'Base en UVT',
    disabled: true,
  },
  {
    name: 'porcentaje',
    type: 'number',
    label: 'Porcentaje',
    disabled: true,
  },
  {
    name: 'vr_rte_fte_art1',
    label: 'Valor retención en la fuente - Artículo 383',
    disabled: true,
  },
  {
    name: 'vr_rte_fte_art3',
    label: 'Valor retención en la fuente - Artículo 384',
    disabled: true,
  },
  {
    name: 'vr_rte_fte',
    label: 'Valor retención en la fuente - Aplicada',
    disabled: true,
  },
]
