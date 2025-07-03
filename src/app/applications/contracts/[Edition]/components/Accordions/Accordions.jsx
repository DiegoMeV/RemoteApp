import { useState } from 'react'
import AccordionContractAlerts from './AccordionContractAlerts'
import { Amendment, Members, Regions, ResourceOrigin } from './AditionalData'

const Accordions = ({ idContract, watch }) => {
  const accordionsAmenMents = ['ADICION', 'REDUCCION', 'CESION', 'PRORROGA', 'SUSPENSION']
  const [openAccordions, setOpenAccordions] = useState({
    CONTRACTTYPEVARIABLES: false,
    REGIONS: false,
    MEMBERS: false,
    RESOURCEORIGIN: false,
    ADICION: false,
    REDUCCION: false,
    CESION: false,
    PRORROGA: false,
    SUSPENSION: false,
    ALERTS: false,
  })

  const handleOpenAccordion = (type) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }))
  }
  return (
    <>
      <Regions
        idContract={idContract}
        openAccordion={openAccordions.REGIONS}
        handleOpenAccordion={() => handleOpenAccordion('REGIONS')}
      />
      <Members
        idContract={idContract}
        openAccordion={openAccordions.MEMBERS}
        handleOpenAccordion={() => handleOpenAccordion('MEMBERS')}
      />
      <ResourceOrigin
        idContract={idContract}
        openAccordion={openAccordions.RESOURCEORIGIN}
        handleOpenAccordion={() => handleOpenAccordion('RESOURCEORIGIN')}
      />

      {accordionsAmenMents.map((type) => (
        <Amendment
          key={type}
          type={type}
          idContract={idContract}
          openAccordion={openAccordions[type]}
          handleOpenAccordion={() => handleOpenAccordion(type)}
          watch={watch}
        />
      ))}
      <AccordionContractAlerts
        openAccordion={openAccordions.ALERTS}
        idContract={idContract}
        handleOpenAccordion={() => handleOpenAccordion('ALERTS')}
      />
    </>
  )
}

export default Accordions
