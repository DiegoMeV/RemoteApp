import {
  AccountTree,
  EngineeringOutlined,
  LanOutlined,
  PeopleOutline,
  RecentActorsOutlined,
  DocumentScanner,
  MenuBook,
} from '@mui/icons-material'

export const adminListOptions = [
  {
    label: 'Jerarquía',
    id: 'hierarchy',
    icon: <LanOutlined />,
    path: 'hierarchy',
    privilege: 'usuarios.jerarquia.listar',
  },
  {
    label: 'Usuarios',
    id: 'users',
    icon: <RecentActorsOutlined />,
    path: 'users',
    privilege: 'usuarios.usuarios.listar',
  },
  {
    label: 'Cargos',
    id: 'jobtitles',
    icon: <EngineeringOutlined />,
    path: 'jobtitles',
    privilege: 'usuarios.cargos.listar',
  },
  {
    label: 'Roles',
    id: 'roles',
    icon: <PeopleOutline />,
    path: 'roles',
    privilege: 'usuarios.roles.listar_roles',
  },
  {
    label: 'Procesos',
    id: 'process',
    icon: <AccountTree />,
    path: 'groupProcess',
    privilege: 'procesos.grupos_procesos.visualizar_tipos',
  },
  {
    label: 'Plantillas',
    id: 'templates',
    icon: <DocumentScanner />,
    path: 'templates',
    privilege: 'documentos.plantillas.listar_plantillas',
  },
  {
    label: 'Tabla de retención documental',
    id: 'documentRetencionTable',
    icon: <MenuBook />,
    path: 'documentRetencionTable',
    privilege: 'documentos.retenciones.listar',
  },
]
