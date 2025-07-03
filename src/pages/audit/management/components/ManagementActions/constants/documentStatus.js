export const documentStatus = {
  approved: 'APROBADO',
  rejected: 'RECHAZADO',
  rejectedToTask: 'REVISAR',
  signed: 'FIRMADO',
  empty: '',
}

export const columnsSigners = [
  { field: 'name', headerName: 'Nombre', flex: 1 },
  {
    field: 'jobtitles',
    headerName: 'Cargo',
    flex: 1,
  },
  {
    field: 'dependency',
    headerName: 'Dependencia',
    flex: 1,
  },
]

export const titleOptions = {
  APPROVED: 'Aprobación',
  REJECTED: 'Rechazo',
}
