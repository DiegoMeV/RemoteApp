import { getObjectDifferences } from '@/libV4'
import { savableFields } from '../constants'

export const getPUAutoliqDif = ({ form, infoPlanilla }) => {
  const currentValues = form.getValues()

  const savableValues = {}
  savableFields.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(currentValues, key)) {
      savableValues[key] = currentValues[key]
    }
  })

  const filteredInfoPlanilla = {}
  savableFields.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(infoPlanilla, key)) {
      filteredInfoPlanilla[key] = infoPlanilla[key]
    }
  })

  return getObjectDifferences(filteredInfoPlanilla, savableValues) ?? {}
}
