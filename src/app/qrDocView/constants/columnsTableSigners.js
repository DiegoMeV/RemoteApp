import { formatToLocaleDate } from '@/lib'

export const columnsTableSigners = [
  {
    field: 'nameSigner',
    headerName: 'Firmante',
    minWidth: 300,
    valueGetter: (params) => {
      const name = params?.row?.usuarioAuditaData
      return `${name?.firstName ?? ''} ${name?.lastName ?? ''}`
    },
  },
  {
    field: 'dateSign',
    headerName: 'Fecha',
    minWidth: 300,
    valueGetter: (params) => `${formatToLocaleDate(params?.row?.fechaCreacion) ?? ''}`,
  },
  {
    field: 'securityCode',
    headerName: 'Código de seguridad',
    minWidth: 300,
    valueGetter: (params) => `${params?.row?.codigoSeguridad ?? ''}`,
  },
]
