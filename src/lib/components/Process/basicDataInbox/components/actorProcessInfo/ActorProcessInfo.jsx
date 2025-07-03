import { CustomAccordion } from '@/lib'
import { Box } from '@mui/material'
import Section from './section'
import { useFormatValues } from './funcs'

const ActorProcessInfo = ({ getProcessActor }) => {
  const additionalData = getProcessActor?.actorData?.additionalData
  const groupedRows = useFormatValues(additionalData)

  return (
    <CustomAccordion
      title={
        getProcessActor?.ActorType?.shortName
          ? `Datos ${getProcessActor?.ActorType?.shortName}`
          : 'Datos del actor'
      }
      defaultExpanded={true}
    >
      <Box
        bgcolor={'backgroundWhite1'}
        borderRadius={2}
        p={2}
      >
        {groupedRows.map((section) => (
          <Section
            key={section.title}
            title={section.title}
            rows={section.rows}
          />
        ))}
      </Box>
    </CustomAccordion>
  )
}
export default ActorProcessInfo
