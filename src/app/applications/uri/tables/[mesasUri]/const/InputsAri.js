export const informaciónPersonal = {
  rowOne: [
    {
      name: 'caso_individual_cat',
      type: 'valueList',
      label: 'Caso individual cat',
      qry: '?searchCat',
    },
    // {
    //   name: 'numero_mesa',
    //   type: 'number',
    //   label: 'Número de mesa',
    //   required: true,
    // },
    // {
    //   name: 'sigedoc_inclusion',
    //   type: 'valueList',
    //   label: 'Sigedoc de inclusión',
    //   required: true,
    //   qry: '?searchSigedoc',
    // },
    // id_registro
  ],
  rowTwo: [
    {
      name: 'medio_reunion',
      type: 'select',
      label: 'Medio reunión',
      required: true,
      options: [
        { label: 'Reunión virtual TEAMS', value: 'Reunión virtual TEAMS' },
        { label: 'En Sitio', value: 'En Sitio' },
      ],
    },
    {
      name: 'fecha_reunion',
      type: 'date',
      label: 'Fecha de reunión',
      required: true,
    },
  ],
}

export const actuacionesContrato = {
  rowOne: [
    {
      name: 'numero_contrato',
      type: 'text',
      label: 'Número de contrato',
      required: true,
      readOnly: true,
    },
    {
      name: 'valor_contrato_proyecto',
      type: 'peso',
      label: 'Valor contrato',
      required: true,
    },
    {
      name: 'valor_interventoria',
      type: 'peso',
      label: 'Valor interventoría',
      required: true,
    },
    {
      name: 'estado_actual_proyecto',
      type: 'select',
      label: 'Estado actual del proyecto',
      options: [
        { label: 'Terminado', value: 'Terminado' },
        { label: 'Contratado sin iniciar', value: 'Contratado sin iniciar' },
        { label: 'En Ejecución', value: 'En Ejecución' },
        {
          label: 'En presunto proceso de incumplimiento',
          value: 'En presunto proceso de incumplimiento',
        },
        { label: 'Liquidado', value: 'Liquidado' },
        { label: 'Suspendido', value: 'Suspendido' },
        { label: 'Vencido', value: 'Vencido' },
      ],
    },
  ],
  rowTwo: [
    {
      name: 'avance_fisico_actual',
      type: 'porcentaje',
      label: 'Avance físico actual',
      required: true,
    },
    {
      name: 'avance_financiero_actual',
      type: 'porcentaje',
      label: 'Avance financiero actual',
      required: true,
    },
    {
      name: 'avance_fisico_programado',
      type: 'porcentaje',
      label: 'Avance físico programado',
      required: true,
    },
  ],
  rowThree: [
    {
      name: 'nombre_proyecto',
      type: 'text',
      label: 'Nombre del proyecto',
      required: true,
      readOnly: true,
    },
    {
      name: 'objeto_contrato',
      type: 'text',
      label: 'Objeto del contrato',
      required: true,
      readOnly: true,
    },
  ],
}

export const actuacionesProceso = {
  rowOne: [
    {
      name: 'fecha_act_finan_proyecto',
      type: 'date',
      label: 'Fecha actualizada de finalización del proyecto',
    },
  ],
  rowTwo: [
    {
      name: 'problematica',
      type: 'text',
      label: 'Problemática',
      required: true,
    },
    {
      name: 'resultados_e_interveciones',
      type: 'text',
      label: 'Resultados e intervenciones',
      required: true,
    },
  ],
}

export const actuacionesResponsables = {
  rowOne: [
    {
      name: 'aprobacion_lider',
      type: 'select',
      label: 'Aprobación líder',
      options: [
        { label: 'Sí', value: 'Sí' },
        { label: 'No', value: 'No' },
        { label: 'REVISAR', value: 'REVISAR' },
      ],
    },
    {
      name: 'aprobacion_coordinador',
      type: 'select',
      label: 'Aprobación coordinador',
      options: [
        { label: 'Sí', value: 'Sí' },
        { label: 'No', value: 'No' },
        { label: 'REVISAR', value: 'REVISAR' },
      ],
    },
    {
      name: 'aprobacion_jefe_uri',
      type: 'select',
      label: 'Aprobación jefe uri',
      options: [
        { label: 'Sí', value: 'Sí' },
        { label: 'No', value: 'No' },
        { label: 'REVISAR', value: 'REVISAR' },
      ],
    },
  ],
  rowTwo: [
    {
      name: 'comentarios',
      type: 'text',
      label: 'Comentarios',
    },
    {
      name: 'resumen_general',
      type: 'text',
      label: 'Resumen general',
    },
  ],
}
