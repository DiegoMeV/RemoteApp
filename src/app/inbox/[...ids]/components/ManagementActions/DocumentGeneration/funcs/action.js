import { getdDisplayedValuesForce } from '../../../funcs'

export const getCancelAction = (handleCancel) => ({
  label: 'Cancelar',
  variant: 'contained',
  color: 'error',
  onClick: handleCancel,
})

export const getGenerateAction = (idDocument) => ({
  label: idDocument ? 'Regenerar' : 'Generar',
  variant: 'contained',
  color: 'primary',
  type: 'submit',
})

export const generationFields = (elementAction) => {
  const { status, createdAt } = getdDisplayedValuesForce(elementAction)

  const inputs = [
    {
      label: 'Tipo',
      value: elementAction ? elementAction?.name : '',
      className: 'general_form_item lg:col-span-4',
    },
    {
      label: 'Fecha de generación',
      value: createdAt,
      className: 'general_form_item lg:col-span-3',
    },
    {
      label: 'Estado',
      value: status,
      className: 'general_form_item lg:col-span-3',
    },
  ]

  const rejectedReason = elementAction?.rejectionCommentData?.comentario

  if (rejectedReason) {
    inputs.unshift({
      label: 'Causa de devolución',
      value: rejectedReason,
      multiline: true,
      minRows: 3,
      error: true,
      className: 'col-span-12',
    })
  }

  return inputs
}
