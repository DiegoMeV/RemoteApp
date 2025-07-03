import { TableLayout } from '@/app/audit/components'

const ViewMassiveExpedients = ({ handleModalCreate, rows, columns, loading }) => {
  return (
    <TableLayout
      title='Gestión masiva de expedientes'
      buttonClick={handleModalCreate}
      rows={rows}
      columns={columns}
      loading={loading}
      urlApi='/massive-activities'
    />
  )
}

export default ViewMassiveExpedients
