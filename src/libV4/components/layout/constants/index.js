import {
  AccountBalance,
  Business,
  CallMissedOutgoing,
  DashboardOutlined,
  GridView,
  InboxOutlined,
  Settings,
} from '@mui/icons-material'

export const exportOptions = ({ params, superSaiyayin }) => {
  const companyOption = {
    label: 'Compañias',
    icon: Business,
    newTab: false,
    path: `/companies`,
  }

  const leftOptions = [
    {
      label: 'Consola',
      icon: DashboardOutlined,
      newTab: false,
      path: '/dashboard',
      privilege: 'procesos.consola.analitica_personal',
    },
    { label: 'Bandeja', icon: InboxOutlined, path: '/inbox' },
    {
      label: 'Aplicaciones',
      icon: GridView,
      newTab: false,
      path: '/applications',
      privilege: 'comun.modulo.visualizar_modulos',
    },
    {
      label: 'Fiscalización',
      icon: AccountBalance,
      newTab: false,
      path: '/audit/notify',
      privilege: 'fiscaliza.modulo.visualizar',
    },
    {
      label: 'Módulo ERP',
      icon: CallMissedOutgoing,
      newTab: true,
      path: `https://app.siifweb.com:9100/siifweb/index.jsp?nc=${params?.taxt_id}`,
      privilege: 'erp.modulo.ir_a_erp',
    },
  ]
  const rightOptions = [
    {
      label: 'Configuración',
      icon: Settings,
      path: '/administration',
      privilege: 'usuarios.administracion.opcion_administracion',
    },
  ]
  return {
    leftOptions: superSaiyayin ? [...leftOptions, companyOption] : leftOptions,
    rightOptions,
  }
}

export const excludeNavbarPaths = [
  '/',
  '/selectCompany',
  '/forgot-password',
  '/requestedDataPage',
  '/authGoogle',
  '/accessLink',
  '/authMicrosoft',
]
