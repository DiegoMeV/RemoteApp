import { Box, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { inputsColumnMatch } from './funcs'
import { GenericForm } from '@/lib'

const ColumnMatching = ({ columnsFile, infoTypeDoc, form }) => {
  useEffect(() => {
    // Iterar sobre las columnas parametrizadas
    infoTypeDoc?.FileColsSpecs?.forEach((colSpec, index) => {
      form.setValue(`columnsMatch.${index}.destCol`, colSpec)

      // Buscar si alguna columna original coincide con colSpec.keyName formateado
      const matchingColumn = columnsFile.find((col) => {
        const formattedCol = col.toUpperCase().replace(/[^A-Z0-9]/g, '_')
        return formattedCol === colSpec.keyName
      })

      // Si hay coincidencia, establecer el valor original en originCol
      if (matchingColumn) {
        form.setValue(`columnsMatch.${index}.originCol`, matchingColumn)
      }
    })
  }, [columnsFile, form, infoTypeDoc])

  return (
    <Box
      bgcolor='#fff'
      p={2}
    >
      <Grid
        container
        spacing={2}
      >
        {!infoTypeDoc?.FileColsSpecs && (
          <Typography
            variant='h5'
            m={3}
          >
            No hay columnas parametrizadas.
          </Typography>
        )}
        {infoTypeDoc?.FileColsSpecs?.map((colSpec, index) => {
          const inputs = inputsColumnMatch(columnsFile, colSpec, index)
          return (
            <Grid
              item
              container
              spacing={2}
              key={colSpec.id}
              xs={12}
            >
              <GenericForm
                inputs={inputs ?? []}
                control={form?.control}
              />
              <Grid
                item
                container
                xs={4}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Typography
                    variant='subtitle2'
                    color='primary'
                  >
                    {colSpec.colSpecs?.type === 'string' ? 'text' : colSpec.colSpecs?.type}(
                    {colSpec.colSpecs?.maxLength})
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  {colSpec.description || ''}
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default ColumnMatching
