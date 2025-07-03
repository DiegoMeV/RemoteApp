import { currentDay, formatDateForTextfield } from '@/libV4'

export const inputsHeaderForm = ({
  form,
  division,
  setVLProps,
  periodInfo,
  vinculationInfo,
  isRetroactive,
}) => [
  {
    label: 'Periodo',
    name: 'periodo',
    className: 'col-span-6',
    required: true,
    InputLabelProps: { shrink: true },
    type: 'autocomplete',
    autocompleteprops: {
      options: periodInfo?.data ?? [],
      getOptionLabel: (option) => {
        return `${option?.periodo ?? ''} ${option?.descripcion ?? ''}`.trim()
      },
      isOptionEqualToValue: (option, value) => {
        return option?.periodo === value?.periodo
      },
      openmodal: () => {
        setVLProps({
          open: true,
          rows: periodInfo,
          title: 'Periodo',
          selectedOption: (params) => {
            const structuredData = {
              periodo: params?.row?.periodo,
              descripcion: params?.row?.descripcion,
            }
            form.setValue('periodo', structuredData ?? {})
            form.setValue('dias', params?.row?.dias ?? 0)
            form.setValue('fechaInicio', formatDateForTextfield(params?.row?.fecha_inicio ?? null))
            form.setValue('fechaFin', formatDateForTextfield(params?.row?.fecha_fin ?? null))
          },
          dgProps: {
            getRowId: (row) => row?.periodo,
          },
          columns: [
            {
              field: 'periodo',
              headerName: 'Periodo',
              width: 100,
            },
            {
              field: 'descripcion',
              headerName: 'Descripcion',
              width: 300,
            },
          ],
        })
      },
    },
    onChange: (_, newValue) => {
      const structuredData = {
        periodo: newValue?.periodo,
        descripcion: newValue?.descripcion,
      }
      form.setValue('periodo', structuredData ?? {})
      form.setValue('dias', newValue?.dias ?? 0)
      form.setValue('fechaInicio', formatDateForTextfield(newValue?.fecha_inicio ?? null))
      form.setValue('fechaFin', formatDateForTextfield(newValue?.fecha_fin ?? null))
    },
    getRowId: (row) => row?.periodo,
  },
  {
    label: 'Dias',
    name: 'dias',
    className: 'col-span-2',
    disabled: true,
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Desde',
    name: 'fechaInicio',
    type: 'date',
    format: 'YYYY-MM-DD',
    className: 'col-span-2',
    disabled: true,
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
  {
    label: 'Hasta',
    name: 'fechaFin',
    type: 'date',
    format: 'YYYY-MM-DD',
    className: 'col-span-2',
    disabled: true,
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
  {
    label: 'Nomina',
    name: 'nomina',
    className: 'col-span-2',
    required: true,
    type: 'number',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Descripción',
    name: 'descripcion',
    className: 'col-span-4',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Vinculación',
    name: 'vinculacion',
    className: 'col-span-4',
    InputLabelProps: { shrink: true },
    type: 'autocomplete',
    required: true,
    autocompleteprops: {
      options: vinculationInfo?.data ?? [],
      getOptionLabel: (option) => {
        return `${option?.vinculacion ?? ''} ${option?.descripcion ?? ''}`.trim()
      },
      isOptionEqualToValue: (option, value) => {
        return option?.vinculacion === value?.vinculacion
      },
      openmodal: () => {
        setVLProps({
          open: true,
          rows: vinculationInfo,
          title: 'Vinculación',
          selectedOption: (params) => {
            const structuredData = {
              vinculacion: params?.row?.vinculacion,
              descripcion: params?.row?.descripcion,
            }
            form.setValue('vinculacion', structuredData ?? {})
          },
          dgProps: {
            getRowId: (row) => row?.vinculacion,
          },
          columns: [
            {
              field: 'vinculacion',
              headerName: 'Vinculación',
              width: 100,
            },
            {
              field: 'descripcion',
              headerName: 'Descripción',
              width: 300,
            },
          ],
        })
      },
    },
    onChange: (_, newValue) => {
      const structuredData = {
        vinculacion: newValue?.vinculacion,
        descripcion: newValue?.descripcion,
      }
      form.setValue('vinculacion', structuredData ?? {})
    },
    getRowId: (row) => row?.vinculacion,
  },
  {
    label: 'División',
    name: 'division',
    className: 'col-span-2',
    disabled: true,
    defaultValue: division,
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Liquidar solo empleados marcados',
    name: 'solo_marcados',
    className: 'col-span-3',
    type: 'switch',
    defaultValue: 'N',
    options: [{ value: 'S' }, { value: 'N' }],
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Cargar empleados de otras nominas',
    name: 'cargar_todos_empleados',
    className: 'col-span-3',
    type: 'switch',
    defaultValue: 'N',
    options: [{ value: 'S' }, { value: 'N' }],
    InputLabelProps: { shrink: true },
  },
  {
    type: 'section',
    name: 'retroactive_section',
    className: 'col-span-6 p-4 gap-2 flex bg-gray-100 rounded-lg shadow-inner',
    children: [
      {
        label: 'Retroactivo',
        name: 'retroactivo',
        type: 'switch',
        defaultValue: 'N',
        options: [{ value: 'S' }, { value: 'N' }],
        InputLabelProps: { shrink: true },
      },
      isRetroactive && {
        label: 'Inicio',
        name: 'fecha_inicio_retro',
        className: 'col-span-4 md:col-span-2',
        type: 'date',
        format: 'YYYY-MM-DD',
        slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
      },
      isRetroactive && {
        label: 'Fin',
        name: 'fecha_fin_retro',
        className: 'col-span-4 md:col-span-2',
        type: 'date',
        format: 'YYYY-MM-DD',
        slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
      },
    ].filter(Boolean),
  },
  {
    label: 'Observaciones',
    name: 'observaciones',
    className: 'col-span-12',
    InputLabelProps: { shrink: true },
    multiline: true,
    minRows: 3,
    maxRows: 3,
  },
  {
    label: 'Estado',
    name: 'estado',
    type: 'select',
    options: [
      { label: 'Seleccione una opción', value: null },
      { label: 'En preparación', value: 'P' },
      { label: 'Para revisión', value: 'R' },
      { label: 'Liquidada OK', value: 'L' },
    ],
    defaultValue: 'P',
    className: 'col-span-3',
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Fecha de liquidación',
    name: 'fecha_liquidacion',
    className: 'col-span-3',
    type: 'date',
    format: 'YYYY-MM-DD',
    useTimeZone: false,
    defaultValue: currentDay('YYYY-MM-DD'),
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
  {
    label: 'Liquidar obligaciones',
    name: 'liqui_oblig',
    type: 'switch',
    className: 'col-span-3',
    defaultValue: 'S',
    options: [{ value: 'S' }, { value: 'N' }],
    InputLabelProps: { shrink: true },
  },
  {
    label: 'Eximir todas las obligaciones',
    name: 'exi_oblig',
    className: 'col-span-3',
    type: 'switch',
    defaultValue: 'N',
    options: [{ value: 'S' }, { value: 'N' }],
    InputLabelProps: { shrink: true },
  },
  {
    label: 'F. Pago',
    name: 'fecha_pago',
    className: 'hidden',
    type: 'date',
    format: 'YYYY-MM-DD',
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
  {
    label: 'Nómina validada',
    name: 'validada',
    className: 'hidden',
    type: 'switch',
    defaultValue: 'N',
    options: [{ value: 'S' }, { value: 'N' }],
    InputLabelProps: { shrink: true },
  },
  {
    label: 'F. Pago',
    name: 'fecha_pago',
    className: 'hidden',
    type: 'date',
    format: 'YYYY-MM-DD',
    slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
  },
]
