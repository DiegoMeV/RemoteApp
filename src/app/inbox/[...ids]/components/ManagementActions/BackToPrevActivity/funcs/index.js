export const inputsBackToPrevAc = (idProcess, idAction, validationInputs) => [
  {
    label: 'Actividad',
    name: 'activity',
    type: 'autocompleteRequest',
    disabled: validationInputs,
    requestprops: {
      baseKey: 'urlProcess',
      method: 'get',
      url: `/processes/${idProcess}/lov/back-to-activity/${idAction}`,
      isPaginated: false,
    },
    required: true,
    className: 'col-span-12',
  },
  {
    label: 'Comentario',
    name: 'observation',
    type: 'multiline',
    disabled: validationInputs,
    required: true,
    multiline: true,
    rows: 4,
    className: 'col-span-12',
  },
]
