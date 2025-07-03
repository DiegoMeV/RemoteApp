export const infoInputsFunc = () => {
  const infoInputs = [
    {
      name: 'affair',
      label: 'Asunto de la solicitud',
      required: true,
      className: 'col-span-12',
    },
    {
      name: 'affairDescription',
      label: 'Descripción de la solicitud',
      required: true,
      className: 'col-span-12',
      type: 'multiline',
      minRows: 6,
    },
  ]
  return infoInputs
}
