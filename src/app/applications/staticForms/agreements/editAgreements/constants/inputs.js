export const inputsVehicleAgreements = ({ isNew, today }) => {
  // financingRate, mxCuotas
  return [
    {
      name: 'convenio',
      type: 'default',
      label: 'Convenio',
      className: 'col-span-6',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'fecha',
      type: 'date',
      defaultValue: today,
      label: 'Fecha de creación',
      className: 'col-span-6',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'razon_social',
      type: 'default',
      label: 'Nombre',
      className: 'col-span-6',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'direccionContribuyente',
      type: 'default',
      label: 'Dirección',
      className: 'col-span-6',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'ABOGADO',
      type: 'default',
      label: 'Funcionario',
      className: 'col-span-6',
    },
    {
      name: 'nombre_abogado',
      type: 'default',
      label: 'Nombre abogado',
      className: 'col-span-6',
    },
    {
      name: 'modalidad',
      type: 'select',
      label: 'Modalidad',
      defaultValue: 'M',
      InputProps: {
        readOnly: !isNew,
      },
      InputLabelProps: { shrink: true },
      options: [
        { value: 'M', label: 'Mensual' },
        { value: 'B', label: 'Bimensual' },
        { value: 'T', label: 'Trimestral' },
        { value: 'S', label: 'Semestral' },
      ],
      className: 'col-span-6 sm:col-span-3',
    },
    {
      name: 'cuotas',
      type: 'number',
      required: true,
      label: 'Cuotas pactadas',
      className: 'col-span-6 sm:col-span-3',
      InputProps: {
        readOnly: !isNew,
      },
    },
    {
      name: 'fechaInicio',
      type: 'date',
      defaultValue: today,
      label: 'Fecha inicio',
      className: 'col-span-6 sm:col-span-3',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'cuotaInicial',
      type: 'money',
      label: 'Valor Cuota inicial',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6 sm:col-span-3',
    },
    {
      name: 'porcInicial',
      type: 'number',
      label: 'Porcentaje inicial',
      className: 'col-span-6 sm:col-span-3',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'congInteres',
      type: 'checkbox',
      options: [
        { value: 'S', label: 'Sí' },
        { value: 'N', label: 'No' },
      ],
      label: '¿Congela interés?',
      className: 'col-span-6 sm:col-span-3',
    },
    {
      name: 'porcFinanciacion',
      type: 'number',
      label: 'Porcentaje financiación',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6 sm:col-span-3',
    },
    {
      name: 'vlr_cuota',
      type: 'number',
      label: 'Valor cuota',
      className: 'col-span-6 sm:col-span-3',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'observacion',
      type: 'default',
      label: 'Observación',
      multiline: true,
      minRows: 3,
      className: 'col-span-12',
    },
  ]
}

export const inputsInfoAgreementsCalc = () => {
  return [
    {
      name: 'deuda',
      type: 'money',
      label: 'Valor Capital',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6',
    },
    {
      name: 'interesMora',
      type: 'money',
      label: 'Interés de mora',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6',
    },
    {
      name: 'financiacionDeuda',
      type: 'money',
      label: 'Financiación(d)',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6',
    },
    {
      name: 'financiacionConvenio',
      type: 'money',
      label: 'Financiación(C)',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6',
    },
    {
      name: 'sanciones',
      type: 'money',
      label: 'Valor Sanciones',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6',
    },
    {
      name: 'descuento',
      type: 'money',
      label: 'Valor Descuentos',
      className: 'col-span-6',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'totalDeuda',
      type: 'money',
      label: 'Total Convenio',
      className: 'col-span-12',
      InputProps: {
        readOnly: true,
      },
    },
  ]
}

// cancellation information
export const inputsCancellationInformation = () => {
  return [
    {
      name: 'fechaAnulacion',
      type: 'date',
      label: 'Fecha de anulación',
      readOnly: true,
      className: 'col-span-6',
    },
    {
      name: 'usuAnula',
      type: 'default',
      label: 'Usuario',
      InputProps: {
        readOnly: true,
      },
      className: 'col-span-6',
    },
    {
      name: 'tipoAnulacion',
      type: 'select',
      label: 'Tipo de anulación',
      options: [
        { value: 'INCUMPLIDO', label: 'Incumplido' },
        { value: 'RETIRADO', label: 'Retirado' },
        { value: 'VOLUNTARIO', label: 'Voluntario' },
      ],
      className: 'col-span-12',
    },
    {
      name: 'comentario',
      type: 'default',
      label: 'Comentario',
      multiline: true,
      minRows: 3,
      className: 'col-span-12',
    },
  ]
}
// money revisar este input porque no aparece abajo

export const inputsVehicleInfo = ({ form, setVLProps, infoVehicule, isNew }) => {
  // Implementar en input idCodigo el autocompleteRequest para usar la busqueda de vehículos en el modal y en el input
  return [
    {
      name: 'idCodigo',
      label: 'Placa',
      type: 'autocomplete',
      required: true,
      InputProps: {
        readOnly: !isNew,
      },
      className: 'col-span-6 sm:col-span-2',
      autocompleteprops: {
        getId: 'idCodigo',
        options: infoVehicule?.data ?? [],
        isOptionEqualToValue: (option, value) => option?.idCodigo === value?.idCodigo,
        getOptionLabel: (option) => `${option?.codigo ?? ''}`,
        openmodal: () => {
          setVLProps({
            open: true,
            rows: infoVehicule,
            title: 'Vehículos',
            selectedOption: (params) => {
              const data = { ...params?.row }
              form?.setValue('idCodigo', data ?? {})
            },
            dgProps: {
              getRowId: (row) => row?.idCodigo,
            },
            columns: [
              {
                field: 'codigo',
                headerName: 'Placa',
                minWidth: 150,
              },
              {
                field: 'descMarca',
                headerName: 'Marca',
                minWidth: 150,
              },
              {
                field: 'descColor',
                headerName: 'Color',
                minWidth: 150,
              },
              {
                field: 'descClase',
                headerName: 'Clase',
                minWidth: 150,
              },
            ],
          })
        },
      },
      onChange: (_, newValue) => {
        const data = { ...newValue }
        form?.setValue('idCodigo', data ?? {})
      },
    },
    {
      // Este estado se declara al momento de guardar el convenio y generar un codigo de convenio
      name: 'estado',
      type: 'select',
      label: 'Estado convenio',
      defaultValue: 'I',
      options: [
        { value: 'I', label: 'Inicial' },
        { value: 'L', label: 'Vigente' },
        { value: 'F', label: 'Finalizado' },
        { value: 'A', label: 'Anulado' },
      ],
      className: 'col-span-6 sm:col-span-2',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'descMarca',
      type: 'default',
      label: 'Marca',
      className: 'col-span-6 sm:col-span-2',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'descColor',
      type: 'default',
      label: 'Color',
      className: 'col-span-6 sm:col-span-2',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'vmodelo',
      type: 'default',
      label: 'Modelo',
      className: 'col-span-6 sm:col-span-2',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'vserieMotor',
      type: 'default',
      label: 'N° Motor',
      className: 'col-span-6 sm:col-span-2',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'correoe',
      type: 'email',
      label: 'Correo electrónico',
      className: 'col-span-6 sm:col-span-4',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'documentoProp',
      type: 'default',
      label: 'Propietario',
      className: 'col-span-6 sm:col-span-4',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'nombrePropietario',
      type: 'default',
      label: 'Nombre propietario',
      className: 'col-span-6 sm:col-span-4',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'propExpedidaEn',
      type: 'default',
      label: 'Lugar expedición',
      className: 'col-span-6 sm:col-span-4',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'direccionResp',
      type: 'default',
      label: 'Dirección responsable',
      className: 'col-span-6 sm:col-span-4',
      InputProps: {
        readOnly: true,
      },
    },
    {
      name: 'telefonoResp',
      // type: 'tel',
      type: 'default',
      label: 'Teléfono',
      className: 'col-span-6 sm:col-span-4',
      InputProps: {
        readOnly: true,
      },
    },
  ]
}

export const inputsDuesInfo = () => {
  // deudaDesde, hasta, son fechas que vienen de otro lugar, se escogen pero no puede ser cualquier fecha
  return [
    {
      name: 'periodoIni',
      type: 'select',
      label: 'Vigencia Deuda desde',
      className: 'col-span-6 sm:col-span-4',
      options: [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
      ],
    },
    {
      name: 'periodoFin',
      type: 'select',
      label: 'Vigencia Deuda hasta',
      className: 'col-span-6 sm:col-span-4',
      options: [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
      ],
    },
    {
      name: 'tercero',
      type: 'default',
      label: 'Documento Solidario/Otro',
      className: 'col-span-6 sm:col-span-4',
    },
    {
      name: 'nombreTercero',
      type: 'default',
      label: 'Nombre Solidario/Otro',
      className: 'col-span-6',
    },
    {
      name: 'soliExpedidaEn',
      type: 'default',
      label: 'Lugar expedición solidario',
      className: 'col-span-6',
    },
  ]
}

export const inputsDuesTab = () => {
  return [
    {
      name: 'valorConvenio',
      type: 'default',
      label: 'Valor Convenio',
      className: 'col-span-12 md:col-span-4',
    },
    {
      name: 'valorPendiente',
      type: 'default',
      label: 'Valor pendiente por pagar',
      className: 'col-span-12 md:col-span-4',
    },
    {
      name: 'cuotasPendientes',
      type: 'default',
      label: 'Cuotas pendientes por pagar',
      className: 'col-span-12 md:col-span-4',
    },
  ]
}

export const inputsModalDebts = () => {
  return [
    {
      name: 'FACTURA',
      type: 'default',
      label: 'Factura',
      className: 'col-span-12 md:col-span-4',
    },
    {
      name: 'FECHA_LIMITE',
      type: 'default',
      label: 'Fecha Límite',
      className: 'col-span-12 md:col-span-4',
    },
    {
      name: 'TOTAL',
      type: 'money',
      label: 'Total',
      className: 'col-span-12 md:col-span-4',
    },
  ]
}
