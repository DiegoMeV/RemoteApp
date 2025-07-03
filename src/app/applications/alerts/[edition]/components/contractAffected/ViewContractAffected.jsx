import GenericAccordion from '@/app/applications/contracts/[Edition]/components/Accordions/GenericAccordion'
import { BackdropLoading } from '@/lib'

const ViewContractAffected = ({
  loadingUpdate,
  columns,
  contracts,
  updateInfo,
  loadingRows,
  errorRows,
  rowModesModel,
  setRowModesModel,
  newRow,
  setNewRow,
  delItem,
  createContract = () => {},
  contractAffectedAccState,
  handleOpenContractAffectedAcc,
  isView,
}) => {
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAccordion
        title='Contratos Afectados'
        labelButton={isView ? null : 'Agregar contrato'}
        labelButton2={isView ? null : 'Crear Contrato'}
        onClick2={createContract}
        columns={columns}
        infoRows={contracts?.data ?? []}
        updateInfo={updateInfo}
        loadingInfo={loadingRows}
        isError={errorRows}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={delItem}
        expandAccordion={contractAffectedAccState}
        handleOpenAccordion={handleOpenContractAffectedAcc}
        editable={false}
        shouldDelete={!isView}
      />
    </>
  )
}

export default ViewContractAffected
