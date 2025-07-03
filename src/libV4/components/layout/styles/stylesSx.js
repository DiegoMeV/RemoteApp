export const navbarContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const optionsContainer = {
  display: 'flex',
  paddingLeft: '20px',
  columnGap: '20px',
  alignItems: 'center',
}

export const buttonsNavBar = (selectedOption) => ({
  flexDirection: 'column',
  color: selectedOption ? '' : 'text.secondary',
  textTransform: 'none',
})

export const boxPasswordModal = {
  width: '100%',
  backgroundColor: 'backgroundWhite1',
  p: '30px',
}

export const boxButtons = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '10px',
}

export const boxForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '30px 100px 0 100px',
  '@media (max-width:768px)': {
    padding: '0',
  },
}

export const boxInputs = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}
