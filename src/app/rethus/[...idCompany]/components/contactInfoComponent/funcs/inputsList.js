import { nonSpecialCharacters } from '@/lib'

export const inputsList = ({
  department,
  city,
  setProvinceSelected,
  unregister,
  setValue,
  getValues,
  isEditing,
}) => {
  const inputList = [
    {
      type: 'autocomplete',
      name: 'province',
      label: 'Departamento de residencia',
      md: 4,
      control: department,
      getValues: (value) => {
        setProvinceSelected(value)
        unregister('city')
        setValue('city', null)
      },
      errorMsj: 'Por favor ingrese el departamento de residencia',
      required: true,
      disabled: isEditing,
    },
    {
      type: 'autocomplete',
      name: 'city',
      label: 'Municipio de residencia',
      md: 4,
      control: city,
      errorMsj: 'Por favor ingrese el municipio de residencia',
      required: true,
      disabled: isEditing,
    },
    {
      type: 'number',
      name: 'phone',
      label: 'Teléfono',
      space: 4,
      errorMsj: 'Por favor ingrese el teléfono',
      disabled: isEditing,
    },
    {
      type: 'number',
      name: 'cellphone',
      label: 'Celular',
      space: 3,
      errorMsj: 'Por favor ingrese el celular',
      required: true,
      disabled: isEditing,
      validate: (value) => {
        if (value.length !== 10) {
          return 'El número debe tener 10 dígitos'
        }
        return true
      },
    },
    {
      type: 'text',
      name: 'address',
      label: 'Dirección de residencia',
      space: 3,
      errorMsj: 'Por favor ingrese la dirección de residencia',
      required: true,
      disabled: isEditing,
      validate: (value) => {
        if (nonSpecialCharacters(value) === false) {
          return 'No puede tener caracteres especiales'
        }
        return true
      },
    },
    {
      type: 'email',
      name: 'email',
      label: 'Correo electrónico',
      space: 3,
      errorMsj: 'Por favor ingrese el correo electrónico',
      required: true,
      disabled: isEditing,
    },
    {
      type: 'email',
      name: 'emailConfirm',
      label: 'Confirme correo electrónico',
      space: 3,
      errorMsj: 'Por favor ingrese el correo electrónico de confirmación',
      required: true,
      noPaste: true,
      validate: (value) => {
        if (value !== getValues('email')) {
          return 'Los correos no coinciden'
        }
        return true
      },
      autoComplete: 'off',
      disabled: isEditing,
    },
  ]
  return inputList
}
