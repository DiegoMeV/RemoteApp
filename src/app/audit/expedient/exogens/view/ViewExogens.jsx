import { TableLayout } from '@/app/audit/components'

const ViewExogens = ({ handleModalCreate, columns, searchExogens }) => {
  return (
    <TableLayout
      title='Fiscalización Exógenas'
      buttonClick={handleModalCreate}
      columns={columns}
      search={searchExogens}
      urlApi='/inspectionPlan'
      additionalQry='&dataSourceType=EXTERNAL&includeProcessType=true'
    />
  )
}

export default ViewExogens
