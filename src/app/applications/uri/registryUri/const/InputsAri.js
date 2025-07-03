const departamentosColombia = [
  { label: 'Amazonas', value: 'Amazonas' },
  { label: 'Antioquia', value: 'Antioquia' },
  { label: 'Arauca', value: 'Arauca' },
  { label: 'Atlántico', value: 'Atlántico' },
  { label: 'Bolívar', value: 'Bolívar' },
  { label: 'Boyacá', value: 'Boyacá' },
  { label: 'Caldas', value: 'Caldas' },
  { label: 'Caquetá', value: 'Caquetá' },
  { label: 'Casanare', value: 'Casanare' },
  { label: 'Cauca', value: 'Cauca' },
  { label: 'Cesar', value: 'Cesar' },
  { label: 'Chocó', value: 'Chocó' },
  { label: 'Córdoba', value: 'Córdoba' },
  { label: 'Cundinamarca', value: 'Cundinamarca' },
  { label: 'Guainía', value: 'Guainía' },
  { label: 'Guaviare', value: 'Guaviare' },
  { label: 'Huila', value: 'Huila' },
  { label: 'La Guajira', value: 'La Guajira' },
  { label: 'Magdalena', value: 'Magdalena' },
  { label: 'Meta', value: 'Meta' },
  { label: 'Nariño', value: 'Nariño' },
  { label: 'Norte de Santander', value: 'Norte de Santander' },
  { label: 'Putumayo', value: 'Putumayo' },
  { label: 'Quindío', value: 'Quindío' },
  { label: 'Risaralda', value: 'Risaralda' },
  { label: 'San Andrés y Providencia', value: 'San Andrés y Providencia' },
  { label: 'Santander', value: 'Santander' },
  { label: 'Sucre', value: 'Sucre' },
  { label: 'Tolima', value: 'Tolima' },
  { label: 'Valle del Cauca', value: 'Valle del Cauca' },
  { label: 'Vaupés', value: 'Vaupés' },
  { label: 'Vichada', value: 'Vichada' },
]

export const regionesColombia = [
  { label: 'Región Andina', value: 'Región Andina' },
  { label: 'Región Caribe', value: 'Región Caribe' },
  { label: 'Región Insular', value: 'Región Insular' },
  { label: 'Región Pacífica', value: 'Región Pacífica' },
  { label: 'Región Orinoquía', value: 'Región Orinoquía' },
  { label: 'Región Amazonia', value: 'Región Amazonia' },
]

export const inputsBasicData = [
  {
    name: 'actuacion',
    type: 'select',
    label: 'Actuación',
    options: [{ label: 'SP - Seguimiento Permanente', value: 'SP - Seguimiento Permanente' }],
  },
  {
    name: 'caso_gestion_delegada',
    type: 'text',
    label: 'Caso gestión delegada',
  },
  {
    name: 'sigedoc_inclusion',
    type: 'text',
    label: 'Sigedoc inclusión *',
  },
  {
    name: 'intervencion_funcional_oficio',
    type: 'select',
    label: 'Intervención funcional de oficio',
    options: [
      { label: 'SI', value: 'SI' },
      { label: 'NO', value: 'NO' },
    ],
  },
  {
    name: 'caso_individual_cat',
    type: 'text',
    label: 'Caso individual (CAT)',
  },
  {
    name: 'fecha_inicial_apertura_actuacion',
    type: 'date',
    label: 'Fecha inicial apertura actuación *',
  },
  {
    name: 'fecha_final_cierre_actuacion',
    type: 'date',
    label: 'Fecha inicial cierre actuación',
  },
]

export const inputsAlertData = {
  rowOne: [
    {
      name: 'fecha_recepcion_alerta',
      type: 'date',
      label: 'Fecha de recepción de alerta',
    },
    {
      name: 'sigedoc_recepcion',
      type: 'text',
      label: 'SIGEDOC recepción',
    },
    {
      name: 'bpin',
      type: 'text',
      label: 'BPIN',
    },
    {
      name: 'tipo_alerta',
      type: 'select',
      label: 'Tipo de alerta',
      options: [
        { label: 'Alerta DIARI', value: 'Alerta DIARI' },
        { label: 'Solicitud', value: 'Solicitud' },
      ],
    },
  ],
  rowTwo: [
    {
      name: 'modelo',
      type: 'text',
      label: 'Modelo',
    },
    {
      name: 'entrega',
      type: 'number',
      label: 'Entrega',
    },
    {
      name: 'numero_alerta',
      type: 'number',
      label: 'Número de alerta',
    },
    {
      name: 'id_unico_analisis',
      type: 'text',
      label: 'ID único análisis',
    },
  ],
  rowThree: [
    {
      name: 'valor_alertado',
      type: 'peso',
      label: 'Valor alertado obra',
    },
    {
      name: 'valor_interventoria',
      type: 'peso',
      label: 'Valor interventoria',
    },
    {
      name: 'valor_complementario',
      type: 'peso',
      label: 'Valor complementario',
    },
    {
      name: 'valor_proyecto',
      type: 'peso',
      label: 'Valor del proyecto',
      disabled: true,
    },
    {
      name: 'avance_fisico_alertado',
      type: 'porcentaje',
      label: 'Avance físico alertado',
    },
    {
      name: 'avance_financiero_alertado',
      type: 'porcentaje',
      label: 'Avance financiero alertado',
    },
    {
      name: 'avance_fisico_ejecutado',
      type: 'porcentaje',
      label: 'Avance físico ejecutado',
    },
  ],
  other: [
    {
      name: 'criterio_riesgo',
      type: 'text',
      label: 'Criterio de riesgo',
    },
    {
      name: 'problematica_alertada',
      type: 'text',
      label: 'Problemática alertada',
    },
  ],
}

export const contractData = {
  rowOne: [
    {
      name: 'sector_alertado',
      type: 'select',
      label: 'Sector alertado',
      options: [
        { label: 'SALUD', value: 'SALUD' },
        { label: 'VIVIENDA', value: 'VIVIENDA' },
        { label: 'AGUA Y SANEAMIENTO POTABLE', value: 'AGUA Y SANEAMIENTO POTABLE' },
        { label: 'INFRAESTRUCTURA', value: 'INFRAESTRUCTURA' },
        { label: 'MITIGACIÓN DEL RIESGO', value: 'MITIGACIÓN DEL RIESGO' },
        { label: 'EDUCACIÓN', value: 'EDUCACIÓN' },
        { label: 'JUSTICIA', value: 'JUSTICIA' },
        { label: 'DEFENSA Y SEGURIDAD', value: 'DEFENSA Y SEGURIDAD' },
        { label: 'INCLUSIÓN SOCIAL', value: 'INCLUSIÓN SOCIAL' },
        { label: 'PLAN ALIMENTARIO ESCOLAR (PAE)', value: 'PLAN ALIMENTARIO ESCOLAR (PAE)' },
        { label: 'MITIGACION DEL RIESGO', value: 'MITIGACION DEL RIESGO' },
      ],
    },
    {
      name: 'entidad',
      type: 'text',
      label: 'Sujeto de vigilancia y control',
    },
  ],
  rowTwo: [
    {
      name: 'departamento',
      type: 'select',
      label: 'Departamento',
      options: departamentosColombia,
    },
    {
      name: 'municipio',
      type: 'text',
      label: 'Municipio',
    },
    {
      name: 'nombre_proyecto',
      type: 'text',
      label: 'Nombre del proyecto',
      md: 12,
    },
  ],
  rowThree: [
    {
      name: 'objeto_contrato',
      type: 'text',
      label: 'Objeto del contrato',
    },
  ],
  rowFour: [
    {
      name: 'contratante_ejecutor',
      type: 'text',
      label: 'Contratante ejecutor',
      md: 6,
    },
    {
      name: 'contratista',
      type: 'text',
      label: 'Contratista',
      md: 6,
    },
    {
      name: 'numero_contrato',
      type: 'text',
      label: 'Número de contrato',
    },
    {
      name: 'numero_contrato_interventoria',
      type: 'text',
      label: 'Número contrato interventoria',
    },
    {
      name: 'estado_inicial_contrato_o_proyecto',
      type: 'select',
      label: 'Estado inicial del contrato o proyecto',
      options: [
        { label: 'SUSPENDIDO', value: 'SUSPENDIDO' },
        { label: 'EN EJECUCIÓN', value: 'EN EJECUCIÓN' },
        { label: 'LIQUIDADO', value: 'LIQUIDADO' },
        { label: 'TERMINADO', value: 'TERMINADO' },
      ],
    },
  ],
  other: [
    {
      name: 'fecha_suscripcion_contrato',
      type: 'date',
      label: 'Fecha suscripción contrato',
    },
    {
      name: 'fecha_inicial_contrato_o_proyecto',
      type: 'date',
      label: 'Fecha inical del contrato',
    },
    {
      name: 'fecha_finalizacion_inicial',
      type: 'date',
      label: 'Fecha finalización inicial',
    },
    {
      name: 'fecha_actual_finalizacion',
      type: 'date',
      label: 'Fecha actual finalización',
    },
    {
      name: 'fuente_recursos_principal',
      type: 'select',
      label: 'Fuente recurso principal',
      options: [
        {
          label: 'SGP - Sistema General de Participaciones',
          value: 'SGP - Sistema General de Participaciones',
        },
        {
          label: 'PGN - Presupuesto General de la Nación',
          value: 'PGN - Presupuesto General de la Nación',
        },
        { label: 'SGR- Sistema General de Regalías', value: 'SGR- Sistema General de Regalías' },
        { label: 'Propios', value: 'Propios' },
        { label: 'Mixtos - (PGN, SGP, SGR, Propios)', value: 'Mixtos - (PGN, SGP, SGR, Propios)' },
      ],
    },
    {
      name: 'aplicativo_identificacion_actuacion',
      type: 'select',
      label: 'Aplicativo identificación actuación',
      options: [
        {
          label: 'APA - Automatización Proceso Auditor',
          value: 'APA - Automatización Proceso Auditor',
        },
        {
          label: 'SACI - Sistema de Alertas de Control Interno',
          value: 'SACI - Sistema de Alertas de Control Interno',
        },
      ],
    },
  ],
}

export const actuaciones = {
  rowOne: [
    {
      name: 'fuente_recursos_principal',
      type: 'select',
      label: 'Fuente recurso principal',
      options: [
        {
          label: 'SGP - Sistema General de Participaciones',
          value: 'SGP - Sistema General de Participaciones',
        },
        {
          label: 'PGN - Presupuesto General de la Nación',
          value: 'PGN - Presupuesto General de la Nación',
        },
        { label: 'SGR- Sistema General de Regalías', value: 'SGR- Sistema General de Regalías' },
        { label: 'Propios', value: 'Propios' },
        { label: 'Mixtos - (PGN, SGP, SGR, Propios)', value: 'Mixtos - (PGN, SGP, SGR, Propios)' },
      ],
    },
    {
      name: 'aplicativo_identificacion_actuacion',
      type: 'select',
      label: 'Aplicativo identificación actuación',
      options: [
        {
          label: 'APA - Automatización Proceso Auditor',
          value: 'APA - Automatización Proceso Auditor',
        },
        {
          label: 'SACI - Sistema de Alertas de Control Interno',
          value: 'SACI - Sistema de Alertas de Control Interno',
        },
      ],
    },
  ],

  rowTwo: [
    {
      name: 'estado_actuacion',
      type: 'select',
      label: 'Estado actuación',
      options: [
        {
          label: 'Sin crear',
          value: 'Sin crear',
        },
        {
          label: 'Pendiente de Instalación',
          value: 'Pendiente de Instalación',
        },
        {
          label: 'Fase de Inicio',
          value: 'Fase de Inicio',
        },
        {
          label: 'Fase de Planeación',
          value: 'Fase de Planeación',
        },
        {
          label: 'Fase de Ejecución',
          value: 'Fase de Ejecución',
        },
        {
          label: 'Fase de Informe',
          value: 'Fase de Informe',
        },
        {
          label: 'Fase de Cierre',
          value: 'Fase de Cierre',
        },
      ],
    },
    { name: 'fecha_inicio_actuacion', label: 'Fecha inicio actuación', type: 'date' },
    { name: 'nombre_insignia_proyecto', label: 'Nombre insignia de proyecto', type: 'text' },
  ],
}
