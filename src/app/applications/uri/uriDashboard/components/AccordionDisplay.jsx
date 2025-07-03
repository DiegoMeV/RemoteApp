import { CustomAccordion } from '@/lib'

const AccordionDisplay = ({ AccordionData, expandedAccordions, handleClickAccordion }) => {
  return (
    <>
      {AccordionData.map((accordion) => (
        <CustomAccordion
          key={accordion.name}
          title={accordion.title}
          defaultExpanded={accordion.defaultExpanded}
          backgroundColor='backgroundWhite1'
          expandedValue={expandedAccordions?.includes(accordion.name)}
          onClickAccordion={() => handleClickAccordion?.(accordion.name)}
        >
          {accordion.content}
        </CustomAccordion>
      ))}
    </>
  )
}

export default AccordionDisplay
