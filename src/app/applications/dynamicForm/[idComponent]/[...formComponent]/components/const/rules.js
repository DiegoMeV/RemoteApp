import { safeExecute } from '@/lib'
import { isEmpty } from '@/libV4'

const rulesTypeOfItem = (item) => {
  return {
    required: item?.isRequired && !item?.hidden ? 'Este campo es requerido' : false,
    validate: {
      limit: (value) => {
        if (!item?.isRequired && !value) {
          return true
        }

        if (
          value?.length <= (item?.limit || Infinity) ||
          typeof value === 'number' ||
          typeof value === 'boolean' ||
          item?.elementType === 'date' ||
          item?.hidden
        ) {
          return true
        }

        return `El máximo de caracteres permitidos es ${item?.limit}`
      },
      itemValidations: () => {
        if (!isEmpty(item?.validations)) {
          return safeExecute(item?.validations)
        }
      },
    },
  }
}

export default rulesTypeOfItem
