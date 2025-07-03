import { SummaryCard } from '@/app/inbox/requirements/[idGroup]/components/Form/components'
import { FormGenericGridStyles } from '../styles'
import TitleSummary from './TitleSummary'
import { Box } from '@mui/material'

const CardInfoSummaryDescription = ({ basicDataProcess }) => {
  const showSummaryBasicData = basicDataProcess.map((item) => {
    return { label: `${item.name}:`, value: item.value }
  })
  return (
    <Box
      sx={FormGenericGridStyles}
      minWidth='100%'
      p={2}
    >
      <TitleSummary title={'Datos básicos del proceso'} />
      <Box width='100%'>
        {showSummaryBasicData.map((item, index) => {
          return (
            <SummaryCard
              key={index}
              index={index}
              item={item}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default CardInfoSummaryDescription
