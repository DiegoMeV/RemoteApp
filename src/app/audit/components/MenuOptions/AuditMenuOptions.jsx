import { usePrivileges } from '@/lib'
import MenuBlock from './MenuBlock'
import {
  DashboardOutlined,
  DynamicFeed,
  FolderCopy,
  Inbox,
  LabelImportant,
  NotificationsActive,
  Star,
  StarBorder,
  Troubleshoot,
  Folder,
  FileCopy,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { filterOptionsByPrivilege } from '../../funcs'

const AuditMenuOptions = () => {
  const navigate = useNavigate()
  const paramPriv = usePrivileges('fiscaliza.grupos_procesos.editar')
  const submittedFilesPriv = usePrivileges('medmag.reports.med_mag_taxpayer_files')

  const rawOptions = [
    { icon: <DashboardOutlined />, label: 'Dashboard', path: '/audit/dashboard', privilege: true },
    {
      icon: <NotificationsActive />,
      label: 'Notificaciones',
      path: '/audit/notify',
      privilege: true,
    },
    {
      label: 'Parametrización',
      icon: <Star />,
      path: '/audit/fiscalGroupProcess',
      privilege: paramPriv,
    },
    {
      icon: <Inbox />,
      label: 'Expedientes',
      options: [
        {
          label: 'Exógenas',
          icon: <StarBorder />,
          path: '/audit/expedient/exogens',
          privilege: true,
        },
        {
          label: 'Endógenas',
          icon: <LabelImportant />,
          path: '/audit/expedient/endogens',
          privilege: true,
        },
      ],
      privilege: true,
    },
    {
      icon: <DynamicFeed />,
      label: 'Gestiones masivas',
      options: [
        {
          icon: <FolderCopy />,
          label: 'Expedientes',
          path: '/audit/massiveManagement/expedients',
          privilege: true,
        },
        {
          icon: <FolderCopy />,
          label: 'Guías de notificación',
          path: '/audit/massiveManagement/guides',
          privilege: true,
        },
      ],
      privilege: true,
    },
  ]

  const rawReports = [
    {
      icon: <Folder />,
      label: 'Medios Magnéticos',
      options: [
        {
          icon: <FileCopy />,
          label: 'Archivos presentados',
          path: '/audit/reports/magneticMedia/submittedFiles',
          privilege: submittedFilesPriv,
        },
      ],
      privilege: true,
    },
  ]

  const filteredOptions = filterOptionsByPrivilege(rawOptions)
  const filteredReports = filterOptionsByPrivilege(rawReports)

  return (
    <div className='flex flex-col justify-between h-full pb-4'>
      <div>
        {filteredOptions.length > 0 && (
          <MenuBlock
            title='Opciones'
            options={filteredOptions}
          />
        )}
        {filteredReports.length > 0 && (
          <MenuBlock
            title='Informes'
            options={filteredReports}
          />
        )}
      </div>
      <div className='flex justify-center'>
        <Button
          variant='contained'
          startIcon={<Troubleshoot />}
          onClick={() => navigate('advancedSearch')}
          sx={{ minWidth: '200px' }}
        >
          Búsqueda Avanzada
        </Button>
      </div>
    </div>
  )
}

export default AuditMenuOptions
