export const titleStyles = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px 10px 0 0',
  backgroundColor: 'backgroundGrey2',
  height: '100%',
  padding: 2,
  maxHeight: '60px',
}

export const searchTableBlocksContainer = {
  width: '100%',
  height: '80px',
  pt: '15px',
  px: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  bgcolor: 'backgroundGrey1',
}
export const sxMenuItem = (conditionalSelectedOption, dark) => {
  return {
    backgroundColor: conditionalSelectedOption
      ? dark === 'dark'
        ? '#ffffff26'
        : '#D6E7FE'
      : 'transparent',
  }
}

export const itemsTopItemOrder = {
  width: '90%',
  ml: '15px',
}

export const containerDinamicAlertTable = {
  bgcolor: 'backgroundGrey1',
  padding: '20px',
}

export const containerEditOptionAlertTable = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}

export const toolbarContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'backgroundGrey1',
  padding: '10px',
}
export const menuStyles = {
  display: 'flex',
  justifyContent: 'start',
  height: '50px',
  bgcolor: 'transparent',
  minWidth: '280px',
}

export const searchDatagrid = { '& div': { backgroundColor: 'backgroundWhite1' }, width: '70%' }

export const sidebarMobileContainerOptions = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}
