export const useInputsList = () => {
  const inputsMassiveActivities = [
    {
      label: 'Consecutivo',
      name: 'identifier',
      type: 'text',
      disabled: true,
      space: 6,
    },
    {
      label: 'Fecha de inicio',
      name: 'createdAt',
      disabled: true,
      type: 'date',
      space: 6,
    },
    {
      label: 'Observaciones',
      name: 'observation',
      type: 'multiline',
      minRows: 3,
      space: 12,
    },
  ]
  const arrayModals = []
  return { inputsMassiveActivities, arrayModals }
}
