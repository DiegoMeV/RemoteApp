import { fieldValues } from '../../funcs'

export const numberingFields = (elementActionLocal) => {
  const { type, generationDate, status } = fieldValues(elementActionLocal)

  const inputs = [
    {
      label: 'Tipo',
      value: type ?? '',
      className: 'xs:col-span-12 lg:col-span-4',
    },
    {
      label: 'Fecha de generación',
      value: generationDate ?? '',
      className: 'xs:col-span-12 lg:col-span-3',
    },
    {
      label: 'Estado',
      value: status ?? '',
      className: 'xs:col-span-12 lg:col-span-3',
    },
  ]

  return inputs
}
