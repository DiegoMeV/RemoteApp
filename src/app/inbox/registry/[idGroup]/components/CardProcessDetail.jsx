import { Box } from '@mui/material'
import { FormGenericGridStyles } from '../styles'
import { SummaryCard } from '@/app/inbox/requirements/[idGroup]/components/Form/components'
import TitleSummary from './TitleSummary'

const CardProcessDetail = ({ infoProcess, processGroupsData }) => {
  const headers = [
    { label: 'Grupo de Aplicación', value: processGroupsData?.data[0]?.name ?? '' },
    { label: 'Dependencias', value: infoProcess?.dependenciesSelected?.name ?? '' },
    { label: 'Proceso', value: infoProcess?.processSelected?.name ?? '' },
    { label: 'Descripción', value: infoProcess?.descriptionProcess ?? '' },
  ]
  return (
    <Box
      sx={FormGenericGridStyles}
      minWidth='100%'
      p={2}
    >
      <TitleSummary title={'Información principal'} />
      <Box width='100%'>
        {headers.map((item, index) => {
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

export default CardProcessDetail
