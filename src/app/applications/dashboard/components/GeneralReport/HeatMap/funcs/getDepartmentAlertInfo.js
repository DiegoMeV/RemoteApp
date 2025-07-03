import getHeatColor from './getHeatColor'

const getDepartmentAlertInfo = (dataAlerts, feature) => {
  const departamentoInfo = dataAlerts?.data?.find(
    (depto) => depto.nombre.toUpperCase() === feature.properties.NOMBRE_DPT.toUpperCase()
  )
  const alertas = departamentoInfo?.porcentaje ?? '0'
  const color = getHeatColor(alertas)

  return { alertas, color }
}

export default getDepartmentAlertInfo
