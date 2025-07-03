export const mapContainerStyle = {
  height: '700px',
  width: '100%',
  borderRadius: '10px',
}

export const gridOneButtonsSelects = {
  display: 'flex',
  justifyContent: 'flex-end',
}

export const boxOneButtonsSelects = {
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  paddingY: '20px',
}

export const gridReportTable = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const polygonOptions = (color) => {
  return {
    fillColor: color,
    fillOpacity: 0.4,
    strokeColor: 'white',
    strokeOpacity: 1,
    strokeWeight: 1,
  }
}

export const colorCircleStyles = (color) => {
  return {
    backgroundColor: color,
    borderRadius: '50%',
    width: '20px',
    height: '20px',
  }
}
