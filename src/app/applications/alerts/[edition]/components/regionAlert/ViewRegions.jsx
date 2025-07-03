import GenericAccordion from '@/app/applications/contracts/[Edition]/components/Accordions/GenericAccordion'
import { BackdropLoading } from '@/lib'

const ViewRegions = ({
  apiRef,
  columns,
  regions,
  updateInfo,
  loadingRegions,
  errorRegion,
  rowModesModel,
  setRowModesModel,
  newRow,
  setNewRow,
  delItem,
  loadingUpdate,
  regionAlertAccState,
  handleOpenRegionAlertAcc,
  isView,
}) => {
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAccordion
        apiRefDatagrid={apiRef}
        title='Regiones afectadas'
        labelButton={isView ? null : 'Agregar región'}
        columns={columns}
        infoRows={regions?.data ?? []}
        updateInfo={updateInfo}
        loadingInfo={loadingRegions}
        isError={errorRegion}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={delItem}
        expandAccordion={regionAlertAccState}
        handleOpenAccordion={handleOpenRegionAlertAcc}
        shouldDelete={!isView}
        editable={!isView}
      />
    </>
  )
}

export default ViewRegions
