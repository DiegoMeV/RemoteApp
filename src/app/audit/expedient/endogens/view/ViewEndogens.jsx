import { TableLayout } from '@/app/audit/components'

const ViewEndogens = ({ handleCreate, columns, searchEndogens }) => {
  return (
    <TableLayout
      title='Fiscalización Endogenas'
      buttonClick={handleCreate}
      columns={columns}
      search={searchEndogens}
      urlApi='/inspectionPlan'
      additionalQry='&dataSourceType=INTERNAL&includeCause=true&includeProcessType=true'
    />
  )
}

export default ViewEndogens
