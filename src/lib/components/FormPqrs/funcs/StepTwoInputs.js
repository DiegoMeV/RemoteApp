export const stepTwoInputs = ({ idProcessType, idProcess }) => {
  return [
    {
      label: 'Fecha de registro',
      name: 'processData[additionalData].incidentDate',
      type: 'date',
      required: true,
      space: 4,
      disableFuture: true,
      disabled: idProcessType ? true : idProcess ? true : false,
      helperText: idProcessType ? 'Los datos hereados no se pueden cambiar' : '',
      validate: {
        custom: (value) => {
          if (value > new Date()) {
            return 'La fecha no puede ser mayor a la fecha actual'
          }
          return true
        },
      },
    },
    {
      label: 'Observaciones',
      name: 'processData[additionalData].incidentReporting',
      type: 'multiline',
      space: 12,
      sm: 12,
      required: true,
      disabled: idProcessType ? true : idProcess ? true : false,
      helperText: idProcessType ? 'Los datos heredados no se pueden cambiar' : '',
    },
  ]
}
