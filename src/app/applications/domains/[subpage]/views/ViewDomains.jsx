import { Box } from '@mui/material'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../../components'
import { privileges, titles } from '../constants'
import { sxSearchTables } from '@/app/applications/styles'

const ViewDomains = ({
  infoDomains,
  loadingDomains,
  subpage,
  columns,
  addNewVariable,
  searchDomain,
}) => {
  return (
    <>
      <TitleAlerts
        title={`Listado de ${titles[subpage]}`}
        backpath='/applications'
      />
      <Box sx={sxSearchTables}>
        <SearchTableWithRequest
          searchOptions={searchDomain}
          buttonOptions={{
            add: addNewVariable,
            label: `Crear`,
          }}
          privilege={`cgr.alertas.crear_${privileges[subpage]}`}
        />
        <DynamicTableAlert
          columns={columns ?? []}
          rows={infoDomains?.data ?? []}
          loading={loadingDomains}
        />
      </Box>
    </>
  )
}

export default ViewDomains
