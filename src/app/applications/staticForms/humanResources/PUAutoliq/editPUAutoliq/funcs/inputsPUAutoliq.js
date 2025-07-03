export const inputsHeaderForm = ({ form, setVLProps, periodGroup, sucursalInfo, operatorInfo }) => {
  return [
    {
      label: 'Tipo Autoliquidación',
      name: 'tipoautoliq',
      required: true,
      className: 'col-span-2',
      type: 'select',
      options: [
        { label: 'Seleccione una opción', value: '' },
        { label: 'Empleados', value: 'E' },
        { label: 'Jubilados', value: 'J' },
        { label: 'Estudiantes (K)', value: 'K' },
        { label: 'Independientes', value: 'Y' },
      ],
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Estado',
      name: 'estado',
      className: 'col-span-2',
      type: 'select',
      options: [
        { label: 'Seleccione una opción', value: '' },
        { label: 'En preparación', value: 'E' },
        { label: 'Pagada', value: 'P' },
      ],
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Presentación',
      name: 'formapres',
      type: 'select',
      options: [
        { label: 'Seleccione una opción', value: '' },
        { label: 'Único', value: 'U' },
        { label: 'Consolidado', value: 'C' },
        { label: 'Sucursal', value: 'S' },
        { label: 'Dependencia', value: 'D' },
      ],
      className: 'col-span-2',
      title: 'Forma de Presentacion de Autoliquidación',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Número Interno',
      name: 'secuencia',
      className: 'col-span-2',
      disabled: true,
      InputLabelProps: { shrink: true },
      title: 'No Secuencia de Planilla (Valor Automatico)',
    },
    {
      label: 'Número Planilla',
      name: 'numautoliq',
      className: 'col-span-2',
      InputLabelProps: { shrink: true },
      title:
        'Nro de Planilla Autoliquidación (Lo entrega la entidad Operadora a la cual se presenta la Autoliquidación)',
    },
    {
      label: 'Fecha Pago',
      name: 'fechapag',
      className: 'col-span-2',
      type: 'date',
      required: true,
      format: 'YYYY-MM-DD',

      title: 'Fecha de Pago de la Planilla de Autoliquidación',
      slotProps: { textField: { size: 'small', InputLabelProps: { shrink: true } } },
    },
    {
      label: 'Tipo de identificación',
      name: 'tipodoc',
      className: 'col-span-3',
      disabled: true,
      type: 'select',
      options: [
        { label: 'Seleccione una opción', value: null },
        { label: 'Nit', value: 'NI' },
        { label: 'Cédula de Ciudadanía', value: 'CC' },
        { label: 'Cédula de Extranjería', value: 'CE' },
        { label: 'Tarjeta Identidad', value: 'TI' },
        { label: 'Registro Civil', value: 'RC' },
        { label: 'Pasaporte', value: 'PA' },
      ],
      title: 'Tipo De documento de la entidad',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Número',
      name: 'nit_fmt',
      className: 'col-span-3',
      disabled: true,
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Tipo de identificación',
      name: 'nit',
      className: 'hidden',
      disabled: true,
      title: 'Identificación de la Entidad ( Nit, Cédula etc.)',
    },
    {
      label: 'Digito de verificación',
      name: 'dig_ver',
      className: 'hidden',
    },
    {
      label: 'Nombre Empresa',
      name: 'razonsocial',
      className: 'col-span-6',
      disabled: true,
      InputLabelProps: {
        shrink: true,
      },
      title: 'Nombre o Razon Social de la Entidad que Presenta la Autoliquidación',
    },
    {
      label: 'Sucursal',
      name: 'codsucursal',
      className: 'hidden',
    },
    {
      label: 'Sucursal',
      name: 'nomsucursal_mostrar',
      className: 'col-span-3',
      type: 'autocomplete',
      required: true,
      InputLabelProps: { shrink: true },
      autocompleteprops: {
        options: sucursalInfo?.data ?? [],
        getOptionLabel: (option) => {
          return `${option?.codigo ?? ''} ${option?.nombre ?? ''}`.trim()
        },
        isOptionEqualToValue: (option, value) => {
          return option?.codigo === value?.codigo
        },
        openmodal: () => {
          setVLProps({
            open: true,
            rows: sucursalInfo,
            title: 'Sucursales',
            selectedOption: (params) => {
              const filteredData = {
                codigo: params?.row?.codigo,
                nombre: params?.row?.nombre,
              }
              form.setValue('nomsucursal_mostrar', filteredData ?? {})
              form.setValue('codsucursal', params?.row?.codigo ?? null)
            },
            dgProps: {
              getRowId: (row) => row?.codigo,
            },
            columns: [
              {
                field: 'codigo',
                headerName: 'Código',
                width: 100,
              },
              {
                field: 'nombre',
                headerName: 'Nombre',
                width: 300,
              },
            ],
          })
        },
      },
      onChange: (_, newValue) => {
        const filteredData = {
          codigo: newValue?.codigo,
          nombre: newValue?.nombre,
        }
        form.setValue('nomsucursal_mostrar', filteredData ?? {})
        form.setValue('codsucursal', newValue?.codigo ?? null)
      },
      getRowId: (row) => row?.codigo,
    },
    {
      label: 'Operador',
      name: 'codoper',
      className: 'hidden',
    },
    {
      label: 'Operador',
      name: 'nomoperador',
      className: 'col-span-3',
      required: true,
      title: 'Operador a traves del cual se presenta la Autoliquidación',
      InputLabelProps: { shrink: true },
      type: 'autocomplete',
      autocompleteprops: {
        options: operatorInfo?.data ?? [],
        getOptionLabel: (option) => {
          return `${option?.codigo ?? ''} ${option?.operador ?? ''}`.trim()
        },
        isOptionEqualToValue: (option, value) => {
          return option?.codigo === value?.codigo
        },
        openmodal: () => {
          setVLProps({
            open: true,
            rows: operatorInfo,
            title: 'Operadores',
            selectedOption: (params) => {
              const filteredData = {
                codigo: params?.row?.codigo,
                operador: params?.row?.operador,
              }
              form.setValue('nomoperador', filteredData ?? {})
              form.setValue('codoper', params?.row?.codigo ?? null)
            },
            dgProps: {
              getRowId: (row) => row?.codigo,
            },
            columns: [
              {
                field: 'codigo',
                headerName: 'Código',
                width: 100,
              },
              {
                field: 'operador',
                headerName: 'Operador',
                width: 300,
              },
            ],
          })
        },
      },
      onChange: (_, newValue) => {
        const filteredData = {
          codigo: newValue?.codigo,
          operador: newValue?.operador,
        }
        form.setValue('nomoperador', filteredData ?? {})
        form.setValue('codoper', newValue?.codigo ?? null)
      },
      getRowId: (row) => row?.codigo,
    },
    {
      label: 'Grupo Periodo',
      name: 'grupop',
      className: 'hidden',
    },
    {
      label: 'Grupo Periodo',
      name: 'nomgrupo',
      className: 'col-span-2',
      required: true,
      title: 'Ingrese el Grupo de Periodos',
      InputLabelProps: { shrink: true },
      type: 'autocomplete',
      autocompleteprops: {
        options: periodGroup?.data ?? [],
        getOptionLabel: (option) => {
          return `${option?.grupo ?? ''} ${option?.descripcion ?? ''}`.trim()
        },
        isOptionEqualToValue: (option, value) => {
          return option?.grupo === value?.grupo
        },
        openmodal: () => {
          setVLProps({
            open: true,
            rows: periodGroup,
            title: 'Grupo de Periodos',
            selectedOption: (params) => {
              const filteredData = {
                grupo: params?.row?.grupo,
                descripcion: params?.row?.descripcion,
              }
              form.setValue('nomgrupo', filteredData ?? {})
              form.setValue('grupop', params?.row?.grupo ?? null)
              form.setValue('perpagosalud', params?.row?.perpagosalud ?? null)
              form.setValue('perpagopenrc', params?.row?.perpagopenrc ?? null)
            },
            dgProps: {
              getRowId: (row) => row?.grupo,
            },
            columns: [
              {
                field: 'grupo',
                headerName: 'Grupo',
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
        const filteredData = {
          grupo: newValue?.grupo,
          descripcion: newValue?.descripcion,
        }
        form.setValue('nomgrupo', filteredData ?? {})
        form.setValue('grupop', newValue?.grupo ?? null)
        form.setValue('perpagosalud', newValue?.perpagosalud ?? null)
        form.setValue('perpagopenrc', newValue?.perpagopenrc ?? null)
      },
      getRowId: (row) => row?.grupo,
    },
    {
      label: 'Periodo Salud',
      name: 'perpagosalud',
      disabled: true,
      className: 'col-span-2',
      title: 'Periodo de Pago para Salud',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Periodo Pensión',
      name: 'perpagopenrc',
      disabled: true,
      className: 'col-span-2',
      title: 'Periodo de Pago para Arp, Caja Compensación, Sena, Icbf, Esap,Its.',
      InputLabelProps: { shrink: true },
    },
    {
      label: 'ARL',
      name: 'nomarp_mostrar',
      className: 'col-span-6',
      disabled: true,
      InputLabelProps: { shrink: true },
    },
    {
      label: 'ARL',
      name: 'codarp',
      className: 'hidden',
      disabled: true,
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Tipo Aportante',
      name: 'tipoaportante',
      className: 'col-span-2',
      type: 'select',
      options: [
        { label: 'Seleccione una opción', value: null },
        { label: 'Empleador', value: '1' },
      ],
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Tipo Pagador Pensiones',
      name: 'tipopagpensiones',
      className: 'col-span-2',
      type: 'select',
      options: [
        { label: 'Seleccione una opción', value: null },
        { label: 'Empleador', value: '1' },
        { label: 'Administradora de Pensiones', value: '2' },
        { label: 'Pagador de Pensiones', value: '3' },
      ],
      InputLabelProps: { shrink: true },
    },
    {
      label: 'Pagar Esap e ITS',
      name: 'esapite',
      type: 'checkbox',
      className: 'col-span-2',
      defaultValue: 'S',
      options: [{ value: 'S' }, { value: 'N' }],
      InputLabelProps: { shrink: true },
    },
  ]
}
