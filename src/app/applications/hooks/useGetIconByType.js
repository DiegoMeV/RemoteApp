import { Folder, ViewList, Web } from '@mui/icons-material'

const useGetIconByType = (type, hasSubmenu) => {
  const iconMap = {
    ORACLE_FORM: (
      <img
        style={{ width: '20px', height: '20px' }}
        src='/assets/svg/oracle-svgrepo-com.svg'
        alt='oracle-svgrepo-com'
      />
    ),
    FORM: <ViewList />,
    PAGE: <Web />,
    ORACLE_REPORT: (
      <img
        style={{ width: '20px', height: '20px' }}
        src='/assets/svg/PDF.svg'
        alt='PDF'
      />
    ),
  }

  // Si tiene submenu, siempre retorna Folder
  if (hasSubmenu) {
    return <Folder />
  }

  // Retorna el icono basado en el tipo, o null si no está en el map
  return iconMap[type] || <ViewList />
}

export default useGetIconByType
