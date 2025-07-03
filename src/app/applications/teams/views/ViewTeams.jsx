import { ErrorPage } from '@/lib'
import { DynamicTableAlert, SearchTableWithRequest, TitleAlerts } from '../../components'
import { Box } from '@mui/material'
import { sxSearchTables } from '../../styles'

const ViewTeams = ({ teams, isLoading, isError, columns, addTeam, searchTeams }) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title='Lista de regiones'
            backpath='/applications'
          />
          <Box sx={sxSearchTables}>
            <SearchTableWithRequest
              searchOptions={searchTeams}
              buttonOptions={{
                add: addTeam,
                label: 'Crear',
              }}
              privilege={'cgr.uri.crear_equipos'}
            />
            <DynamicTableAlert
              columns={columns ?? []}
              rows={teams?.data ?? []}
              loading={isLoading}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default ViewTeams
