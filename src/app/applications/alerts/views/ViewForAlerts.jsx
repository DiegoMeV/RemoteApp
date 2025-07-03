import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewForAlerts = ({ isError, isLoading, columns, alerts, searchAlert }) => {
  const navigate = useNavigate()
  const addAlert = () => {
    navigate('/applications/alerts/new')
  }
  return (
    <>
      <TitleAlerts
        title='Listado de alertas'
        backpath='/applications'
      />
      {isError ? (
        <ErrorPage />
      ) : (
        <Box sx={sxSearchTables}>
          <SearchTableWithRequest
            searchOptions={searchAlert}
            buttonOptions={{
              add: addAlert,
              label: 'Crear',
            }}
            privilege='cgr.alertas.crear_alertas'
          />
          <DynamicTableAlert
            loading={isLoading}
            columns={columns}
            rows={alerts?.data || []}
          />
        </Box>
      )}
    </>
  )
}

export default ViewForAlerts
