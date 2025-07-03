import ViewRegionContract from './ViewRegionContract'
import { useState } from 'react'

const RegionContract = ({ idAlert }) => {
  // Accordion Props
  const [regionAffectedAccState, setRegionAffectedAccState] = useState(false)
  const handleOpenContractAffectedAcc = () => {
    setRegionAffectedAccState(!regionAffectedAccState)
  }

  const props = {
    regionAffectedAccState,
    handleOpenContractAffectedAcc,
    idAlert,
  }

  return <ViewRegionContract {...props} />
}

export default RegionContract
