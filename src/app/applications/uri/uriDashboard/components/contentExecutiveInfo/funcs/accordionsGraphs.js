import { Typography } from '@mui/material'
import CardAccordion from '../../CardAccordion'
import { cardsToResult, teamCards } from './cards'
import CommitmentsAccordion from '../../CommitmentsAccordion'

export const accordionsGraphs = ({ infoExecutiveInfo }) => {
  const executiveInfo = infoExecutiveInfo?.data?.[0]
  const cardsResults = cardsToResult(infoExecutiveInfo)
  const team = teamCards(infoExecutiveInfo)
  const problematica_alertada = executiveInfo?.problematica_alertada
  const problematica_actual_mesa = executiveInfo?.problematica_actual_mesa
  const gestiones_relevantes = executiveInfo?.gestiones_relevantes
  const dataCompromisosMesas = executiveInfo?.dataCompromisosMesas
  const accordions = [
    {
      name: 'resultados',
      title: 'Resultados',
      content: <CardAccordion cards={cardsResults} />,
      defaultExpanded: true,
    },
    {
      name: 'problematica_alertada',
      title: 'Problemática alertada',
      content: (
        <Typography>{problematica_alertada ?? 'No se encontró información registrada'}</Typography>
      ),
    },
    {
      name: 'equipo_auditor',
      title: 'Equipo auditor',
      content: <CardAccordion cards={team} />,
    },
    {
      name: 'problematica_actual',
      title: 'Problemática actual',
      content: (
        <Typography>
          {problematica_actual_mesa ?? 'No se encontró información registrada'}
        </Typography>
      ),
    },
    {
      name: 'compromisos_pactados',
      title: 'Compromisos pactados',
      content: <CommitmentsAccordion dataCompromisosMesas={dataCompromisosMesas} />,
    },
    {
      name: 'gestion_URI',
      title: 'Gestión Unidad de Reacción Inmediata',
      content: (
        <Typography>{gestiones_relevantes ?? 'No se encontró información registrada'}</Typography>
      ),
    },
  ]
  return accordions
}
