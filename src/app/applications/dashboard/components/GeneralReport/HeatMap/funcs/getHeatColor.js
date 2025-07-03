const getHeatColor = (alertas) => {
  const numAlertas = parseInt(alertas)
  if (numAlertas > 0 && numAlertas <= 30) {
    return 'yellow'
  } else if (numAlertas >= 30.01 && numAlertas <= 70) {
    return 'orange'
  } else if (numAlertas >= 70.01) {
    return 'red'
  } else {
    return 'gray'
  }
}

export default getHeatColor
