export const chartContainerStyles = {
  backgroundColor: 'backgroundWhite1',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.2)  0px 10px 15px 0px ',
}

export const titleStyles = {
  display: 'flex',
  alignItems: 'center',
  minHeight: '60px',
  backgroundColor: 'backgroundGrey2',
  borderRadius: '10px 10px 0 0',
  pl: '15px',
}

export const cardChartsStyles = (backgroundColor) => {
  return {
    display: 'flex',
    padding: '15px',
    borderRadius: '10px',
    alignItems: 'flex-end',
    background: backgroundColor,
  }
}
