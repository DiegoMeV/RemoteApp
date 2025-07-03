import {
  documentTypeLabels,
  ethnicityLabels,
  keyLabels,
  maritalStatusLabels,
  sections,
} from '../../../constant'
import { formatDateForTextfield } from '@/lib'
import { useCitiesInfo } from './useCitiesInfo'
import { useProvinceInfo } from './useProvinceInfo'
import { useAcademyInfo } from './useAcademyInfo'

export const useFormatValues = (additionalData) => {
  const { residencialCity, expeditionCity, bornCity } = useCitiesInfo(additionalData)
  const { residencialProvince, bornProvince, expeditionProvince } = useProvinceInfo(additionalData)
  const { school, career, cityOffer } = useAcademyInfo(additionalData)
  const cityOrProvinceFormatter = {
    city: residencialCity,
    expeditionCity: expeditionCity,
    bornCity: bornCity,
    province: residencialProvince,
    expeditionProvince: expeditionProvince,
    bornProvince: bornProvince,
    school: school,
    career: career,
    offerCity: cityOffer,
  }
  const formattedFields = {
    gender: {
      M: 'Masculino',
      F: 'Femenino',
    },
    ethnicity: ethnicityLabels,
    maritalStatus: maritalStatusLabels,
    documentType: documentTypeLabels,
  }
  const formatCityOrProvince = (data) => {
    return data?.data?.[0]?.nombre ?? 'No disponible'
  }
  const formatDateFields = ['dateAct', 'bornDate', 'dateBook', 'dateGraduation', 'expeditionDate']

  const formatValue = (key, value) => {
    if (formatDateFields.includes(key)) {
      return formatDateForTextfield(value)
    }
    // eslint-disable-next-line no-prototype-builtins
    if (cityOrProvinceFormatter.hasOwnProperty(key)) {
      return formatCityOrProvince(cityOrProvinceFormatter[key])
    }
    return formattedFields[key]?.[value] || value
  }

  const groupedRows = Object.keys(sections).map((sectionTitle) => {
    const fields = sections[sectionTitle]
    return {
      title: sectionTitle,
      rows: fields.map((key) => ({
        label: keyLabels[key] || key,
        value: formatValue(key, additionalData[key]),
      })),
    }
  })
  return groupedRows
}
