import { getObjectDifferences } from '@/libV4'
import { savableFields } from '../constants'

export const getPayrollDifferences = ({ form, infoNomina }) => {
  const currentValues = form.getValues()

  const {
    periodo: periodoObject,
    vinculacion: vinculacionObject,
    ...restOfCurrentValues
  } = currentValues

  const processedCurrentValues = {
    ...restOfCurrentValues,
    periodo: periodoObject?.periodo || null,
    vinculacion: vinculacionObject?.vinculacion || null,
  }

  const savableValues = {}
  savableFields.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(processedCurrentValues, key)) {
      savableValues[key] = processedCurrentValues[key]
    }
  })

  const {
    periodo: originalPeriodoObject,
    vinculacion: originalVinculacionObject,
    ...restOfInfoNomina
  } = infoNomina

  const processedInfoNomina = {
    ...restOfInfoNomina,
    periodo: originalPeriodoObject?.periodo || '',
    vinculacion: originalVinculacionObject?.vinculacion || '',
  }

  const filteredInfoNomina = {}
  savableFields.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(processedInfoNomina, key)) {
      filteredInfoNomina[key] = processedInfoNomina[key]
    }
  })

  return getObjectDifferences(filteredInfoNomina, savableValues) ?? {}
}
