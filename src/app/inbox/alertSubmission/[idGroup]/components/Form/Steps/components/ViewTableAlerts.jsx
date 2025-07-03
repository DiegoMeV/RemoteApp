import { DynamicTableAlert } from '@/app/applications/components'
import { CustomSearchDatagrid, ErrorPage, useGetAlerts } from '@/lib'

const ViewTableAlerts = ({ columns, setAlertService }) => {
  const { data: alerts, isLoading, isError } = useGetAlerts({ qry: '?aumentarInfo=true' })

  const addAlert = () => {
    setAlertService({ view: 'new', additionalData: 'new' })
  }

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <DynamicTableAlert
          loading={isLoading}
          columns={columns}
          rows={alerts?.data || []}
          toolbar={CustomSearchDatagrid}
          toolbarProps={{
            buttonLabel: 'Crear Alerta',
            onClick: addAlert,
          }}
        />
      )}
    </>
  )
}

export default ViewTableAlerts
