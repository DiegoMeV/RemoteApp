import { CustomAccordion } from '@/lib'
import TableRegionContract from './TableRegionContract'

const ViewRegionContract = ({ regionAffectedAccState, handleOpenContractAffectedAcc, idAlert }) => {
  return (
    <CustomAccordion
      title='Regiones Afectadas (Contrato)'
      color='primary'
      expandedValue={regionAffectedAccState}
      onClickAccordion={handleOpenContractAffectedAcc}
    >
      <TableRegionContract idAlert={idAlert} />
    </CustomAccordion>
  )
}

export default ViewRegionContract
