import { GenericChip } from '@/libV4'
import { RolesOptions } from '../components'

export const columnsRoles = ({
  rolTypeText,
  handleOpenEdition,
  handleListPrivileges,
  handleOpenUsersByRole,
  editAccess,
  listPrivAccess,
}) => {
  return [
    {
      headerName: 'Nombre',
      field: 'name',
    },
    {
      headerName: 'Tipo de rol',
      field: 'typeRole',
      filters: [
        {
          label: 'Operativo',
          value: 'OPERATIONAL',
        },
        {
          label: 'De sistema',
          value: 'SYSTEM',
        },
      ],
      onFilter: (value, record) => record?.typeRole === value,
      renderCell: (data) => rolTypeText?.[data.typeRole] ?? '',
    },
    {
      headerName: 'Descripción',
      field: 'description',
    },
    {
      headerName: 'Para dependencia',
      field: 'byDependency',
      width: 120,
      renderCell: (row) => {
        return GenericChip({
          color: row?.byDependency ? 'primary' : 'secondary',
          label: row?.byDependency ? 'Si' : 'No',
        })
      },
    },
    {
      headerName: '',
      field: 'options',
      pinned: 'right',
      width: 120,
      renderCell: (data) => {
        return RolesOptions({
          data,
          handleOpenEdition,
          handleListPrivileges,
          handleOpenUsersByRole,
          editAccess,
          listPrivAccess,
        })
      },
    },
  ]
}
