import { DynamicTableAlert, TitleAlerts } from '../../../components'
import { CustomSearchDatagrid, ErrorPage } from '@/lib'

const ViewCompromises = ({ dataCompromises, columns, isLoading, isError, handleCreate }) => {
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title=' Compromisos Ari'
            backpath='/applications'
          />
          <DynamicTableAlert
            columns={columns ?? []}
            rows={dataCompromises?.data ?? []}
            loading={isLoading}
            toolbar={CustomSearchDatagrid}
            toolbarProps={{
              buttonLabel: 'Crear compromiso',
              onClick: handleCreate,
            }}
          />
        </>
      )}
    </>
  )
}

export default ViewCompromises
