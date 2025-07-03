import { Box, Typography } from '@mui/material'
import CardAccordion from '../../CardAccordion'
import { cardsToResult } from './cards'
import { HeatMap } from '@/lib'

export const accordionsGraphs = ({ infoRow }) => {
  // Check if coordenadas_municipio exists and is a valid JSON string, otherwise default to an empty array
  let coordenadasMunicipio
  try {
    coordenadasMunicipio = JSON.parse(infoRow?.coordenadas_municipio || [])
  } catch (e) {
    console.error('Error parsing coordenadas_municipio:', e)
    coordenadasMunicipio = []
  }

  const cardsResults = cardsToResult(infoRow)
  const accordions = [
    {
      name: 'resultados',
      title: 'Resultados',
      content: <CardAccordion cards={cardsResults} />,
      defaultExpanded: true,
    },
    {
      name: 'regnionalizacion',
      title: 'Regionalización',
      content: (
        <HeatMap
          dataPolygon={[{ nombre: infoRow?.departamento, porcentaje: '50%' }]}
          markers={[coordenadasMunicipio]}
        />
      ),
    },
    {
      name: 'problematica_alertada',
      title: 'Problemática alertada',
      content: (
        <Box width='100%'>
          <Typography my={2}>{infoRow?.problematica_alertada ?? 'Sin información'}</Typography>
        </Box>
      ),
    },
    {
      name: 'gestion_unidad_reaccion_inmediata',
      title: 'Gestión de la unidad de reacción inmediata',
      content: (
        <Box width='100%'>
          <Typography my={2}>{infoRow?.gestiones_relevantes ?? 'Sin información'}</Typography>
        </Box>
      ),
    },
  ]
  return accordions
}
