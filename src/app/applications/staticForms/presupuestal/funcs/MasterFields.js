import { MagicString } from '@/libV4'

export const masterFormFields = (setValue, nit_compania, compptalType) => [
  {
    name: 'comprobantepptal_w.tipo_id',
    label: 'Código tipo de comprobante',
    type: 'textfieldQuery',
    required: true,
    lovTitle: 'Código tipo de comprobante',
    onChange: (_, value) => {
      setValue('comprobantepptal_w.tipo_id', value?.tipo_id)
      setValue('comprobantepptal_w.tipo_compptal', value?.descripcion)
    },
    queryProps: {
      lovQuery: `select tipo_id,descripcion from tipo_compptal_w where nit_compania= '${nit_compania}' and tipo_compptal= '${compptalType}' and activo='S'`,
    },
    tableProps: {
      columns: [
        {
          field: 'tipo_id',
          headerName: 'Tipo Id',
        },
        {
          field: 'descripcion',
          headerName: 'Descripción',
        },
      ],
    },
    className: 'col-span-12',
  },
  {
    name: 'comprobantepptal_w.tipo_compptal',
    label: 'Tipo de comprobante',
    type: 'text',
    disabled: true,
    className: 'col-span-36',
  },
  {
    name: 'comprobantepptal_w.nro_comprobantepptal',
    label: 'Número interno',
    type: 'number',
    required: true,
    disabled: true,
    className: 'col-span-12',
  },
  {
    name: 'comprobantepptal_w.nrodoc',
    label: 'Número de documento',
    type: 'number',
    required: true,
    disabled: true,
    className: 'col-span-12',
  },
  {
    name: 'comprobantepptal_w.prefijo',
    label: 'Prefijo',
    required: true,
    type: 'text',
    className: 'col-span-12',
  },
  {
    name: 'comprobantepptal_w.estado',
    label: 'Estado',
    required: true,
    type: 'select',
    options: [
      {
        value: 'V',
        label: 'Vigente',
      },
      {
        value: 'A',
        label: 'Anulado',
      },
    ],
    className: 'col-span-12',
  },
  {
    name: 'comprobantepptal_w.fecha',
    label: 'Fecha',
    required: true,
    type: 'date',
    datePickerProps: {
      dateFormat: MagicString.DATE_FORMAT.ORACLE_FORMAT,
    },
    className: 'col-span-12',
  },
  {
    name: 'comprobantepptal_w.fecha_vencimiento',
    label: 'Vencimiento',
    type: 'date',
    datePickerProps: {
      dateFormat: MagicString.DATE_FORMAT.ORACLE_FORMAT,
    },
    className: 'col-span-12',
  },
  {
    name: 'comprobantepptal_w.division',
    label: 'División',
    required: true,
    disabled: true,
    type: 'text',
    className: 'col-span-20',
  },
  {
    name: 'comprobantepptal_w.prefijo_orden',
    label: 'Prefijo orden',
    required: true,
    type: 'number',
    className: 'col-span-20',
  },
  {
    name: 'comprobantepptal_w.orden',
    label: 'Número de orden',
    required: true,
    disabled: true,
    type: 'number',
    className: 'col-span-20',
  },
  {
    name: 'comprobantepptal_w.nrodoc_orden',
    label: 'Número doc orden',
    required: true,
    disabled: true,
    hidden: true,
    type: 'number',
    className: 'hidden',
  },
  {
    name: 'comprobantepptal_w.concepto',
    label: 'Concepto',
    required: true,
    multiline: true,
    minRows: 3,
    maxRows: 5,
    className: 'col-span-60',
  },
  {
    name: 'comprobantepptal_w.sinsituacion',
    label: 'Sin situación',
    type: 'switch',
    className: 'col-span-60',
  },
  {
    name: 'comprobantepptal_w.observaciones',
    label: 'Observaciones',
    multiline: true,
    minRows: 3,
    maxRows: 5,
    className: 'col-span-60',
  },
]
