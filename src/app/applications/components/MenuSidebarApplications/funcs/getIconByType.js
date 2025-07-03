import { Folder, ViewList, Web } from '@mui/icons-material'

const getIconByType = (type, hasSubmenu) => {
  const iconMap = {
    FORM: <ViewList color='secondary' />,
    PAGE: <Web color='secondary' />,
    ORACLE_FORM: (
      <img
        style={{ width: '20px', height: '20px' }}
        src='/assets/svg/oracle-svgrepo-com.svg'
        alt='PDF'
      />
    ),
    ORACLE_REPORT: (
      <img
        style={{ width: '20px', height: '20px' }}
        src='/assets/svg/PDF.svg'
        alt='PDF'
      />
    ),
  }

  if (hasSubmenu) {
    return <Folder color='secondary' />
  }

  return iconMap[type] || <ViewList color='secondary' />
}

export default getIconByType
