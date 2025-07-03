import { ValueListGlobal } from '@/lib'
import { TableAlerts } from '../components'

const ViewAlertsToSent = ({
  columns,
  sentAlerts,
  isLoadingSendAlerts,
  loadingSentAlerts,
  valueListAlerts,
  searchAlert,
  alerts,
  loadingAlerts,
  columnsAlertsLov,
  handleAlertSelection,
  toggleDisabled,
  isPendingAsing,
}) => {
  return (
    <>
      <TableAlerts
        columns={columns}
        rows={sentAlerts?.data}
        loading={loadingSentAlerts || isLoadingSendAlerts}
        modalAlerts={valueListAlerts}
      />
      {valueListAlerts?.show && (
        <ValueListGlobal
          title={'Alertas'}
          openOptions={valueListAlerts}
          searchOptions={searchAlert}
          rows={alerts?.data}
          loading={loadingAlerts || isPendingAsing}
          columns={columnsAlertsLov}
          selectedOption={handleAlertSelection}
          toggleDisabled={toggleDisabled}
          shouldClose={false}
          // pagination={modal.pagination}
        />
      )}
    </>
  )
}

export default ViewAlertsToSent
