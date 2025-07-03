export const basciData = {
  rowOne: [
    {
      name: 'caso_individual_cat',
      type: 'select',
      label: 'Caso individual cat',
      options: [
        { label: 'Llave primaria', value: 'Llave primaria' },
        { label: 'precarga de DB', value: 'precarga de DB' },
      ],
    },
    {
      name: 'fecha_compromiso',
      type: 'date',
      label: 'Fecha de compromiso',
    },
    {
      name: 'tipo_compromiso',
      type: 'select',
      label: 'Tipo de compromiso',
      options: [
        { label: 'INTERNO', value: 'INTERNO' },
        { label: 'EXTERNO', value: 'EXTERNO' },
        { label: 'DIRECCIÓN', value: 'DIRECCIÓN' },
      ],
    },
  ],
  rowTwo: [
    {
      name: 'requerido_oficio',
      type: 'text',
      label: 'Requerido con oficio',
    },
    {
      name: 'numero_sigedoc',
      type: 'number',
      label: 'Número sigedoc',
    },
    {
      name: 'fecha_inicio',
      type: 'date',
      label: 'Fecha de inicio',
    },
  ],
  rowThree: [
    {
      name: 'fecha_proyectada_finali',
      type: 'date',
      label: 'Fecha proyectada finalización',
    },
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      options: [
        { label: 'VENCIDO', value: 'VENCIDO' },
        { label: ' VENCIDO CON JUSTIFICACIÓN', value: ' VENCIDO CON JUSTIFICACIÓN' },
        { label: 'A TIEMPO', value: 'A TIEMPO' },
        { label: 'POR PROGRAMAR', value: 'POR PROGRAMAR' },
        { label: 'REALIZADO', value: 'REALIZADO' },
      ],
    },
    {
      name: 'dias_vencimiento',
      type: 'number',
      label: 'Días vencimiento',
    },
  ],
  rowFour: [
    {
      name: 'compromiso',
      type: 'text',
      label: 'Compromiso',
    },
  ],
}

export const actualizacionContrato = {
  rowOne: [
    {
      name: 'numero_contrato',
      type: 'text',
      label: 'Número de contrato',
    },
    {
      name: 'responsable',
      type: 'text',
      label: 'Responsable',
    },
  ],
  rowTwo: [
    {
      name: 'descripcion_avance',
      type: 'number',
      label: 'Descripción del avance',
    },
  ],
}

export const actuacionesFuncionario = {
  rowOne: [
    {
      name: 'aprobacion_lider',
      type: 'text',
      label: 'Aprobación líder',
    },
    {
      name: 'aprobacion_coordinador',
      type: 'text',
      label: 'Aprobación coordinador',
    },
    {
      name: 'aprobacion_jefe_uri',
      type: 'text',
      label: 'Aprobación Jefe',
    },
  ],
  rowTwo: [
    {
      name: 'comentarios',
      type: 'text',
      label: 'Comentarios',
    },
  ],
}
