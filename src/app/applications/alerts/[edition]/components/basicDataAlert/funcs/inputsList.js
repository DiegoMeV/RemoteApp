export const inputsList = ({ fteInfo, regInfo, alertsModel, isView }) => {
  const fildsDatabasic = [
    {
      name: 'fecha',
      label: 'Fecha',
      type: 'text',
      readOnly: true,
      space: 3,
      disabled: isView,
    },
    {
      name: 'valor_alerta',
      label: 'Valor alertado',
      type: 'money',
      space: 3,
      disabled: isView,
    },
    {
      name: 'id_fte_informacion',
      label: 'Fuentes de informacion',
      type: 'autocomplete',
      md: 6,
      control: fteInfo,
      required: true,
      disabled: isView,
    },
    {
      name: 'id_registro_ua',
      label: 'Origen UA',
      type: 'autocomplete',
      md: 5,
      control: regInfo,
      required: true,
      disabled: isView,
    },

    {
      name: 'tipo_alerta',
      label: 'Tipo alerta',
      type: 'select',
      options: [
        { value: 'ALERTA CONTRACTUAL', label: 'ALERTA CONTRACTUAL' },
        { value: 'ALERTA NOCONTRACTUAL', label: 'ALERTA NOCONTRACTUAL' },
        { value: 'ALERTA PRECONTRACTUAL', label: 'ALERTA PRECONTRACTUAL' },
        { value: 'INFORME', label: 'INFORME' },
      ],
      space: 3,
      disabled: isView,
    },
    {
      name: 'id_alerta_inicial',
      label: 'Alerta previa',
      type: 'autocomplete',
      md: 4,
      control: alertsModel,
      disabled: isView,
    },
    {
      name: 'posible_emblematico',
      label: 'Posible emblemático',
      type: 'switch',
      space: 3,
      disabled: isView,
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'multiline',
      space: 12,
      disabled: isView,
    },
  ]
  return fildsDatabasic
}
