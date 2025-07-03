import { GenericTable, formatToLocaleDate } from '@/lib'

const HistoricalCommnets = ({ infoHistoricalComments }) => {
  return (
    <GenericTable
      columns={[
        {
          field: 'Usuario',
          headerName: 'Usuario',
          minWidth: 250,
          valueGetter: (params) => {
            return `${params?.row?.dataUserAudita?.firstName ?? ''} ${
              params?.row?.dataUserAudita?.lastName ?? ''
            }`
          },
        },
        {
          field: 'revision',
          headerName: 'Revisión',
          minWidth: 150,
        },
        {
          field: 'fecha_audita',
          headerName: 'Fecha de revisión',
          minWidth: 150,
          valueGetter: (params) => {
            return `${formatToLocaleDate(params.value)}`
          },
        },

        {
          field: 'comentario',
          headerName: 'Comentario',
          minWidth: 400,
        },
      ]}
      rows={infoHistoricalComments}
      sx={{ height: 'calc(100vh - 400px)' }}
      sortModel={[{ field: 'fecha_audita', sort: 'desc' }]}
    />
  )
}

export default HistoricalCommnets
