export const reviewOptionsSelect = ({ canApproveTotal, canApprovePartial }) => {
  const reviewOptions = [
    {
      value: 'RECHAZADO',
      label: 'Rechazado',
    },
    {
      value: 'PENDIENTE',
      label: 'Pendiente',
    },
  ]
  if (canApproveTotal) {
    reviewOptions.push({
      value: 'APROBADO TOTAL',
      label: 'Aprobado total',
    })
    return reviewOptions
  }
  if (canApprovePartial) {
    reviewOptions.push({
      value: 'APROBADO PARCIAL',
      label: 'Aprobado parcial',
    })
    return reviewOptions
  }
  return reviewOptions
}
