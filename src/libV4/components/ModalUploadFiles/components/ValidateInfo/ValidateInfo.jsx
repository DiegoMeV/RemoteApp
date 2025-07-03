import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { validateRows } from './funcs'
import { Box, LinearProgress, Typography } from '@mui/material'
import InfoData from '../InfoData'
import { CancelOutlined, CheckCircle } from '@mui/icons-material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { BackdropLoadingLabel, getRowClassName, localeTextsEsp, NoDataOverlay } from '@/lib'

const ValidateInfo = ({ rowsFile, form, errors, setErrors }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const infoForm = form.getValues()
  const [progress, setProgress] = useState(null) // Estado para el progreso

  useEffect(() => {
    let accumulatedErrors = []
    const result = rowsFile.map((row) => {
      const data = {}

      infoForm?.columnsMatch?.forEach(({ originCol, destCol }) => {
        data[destCol.keyName] = row[originCol] ?? null
      })

      return { data }
    })
    form.setValue('finalRows', result)

    const validateInChunks = async () => {
      const batchSize = 500
      let currentIndex = 0
      const totalRows = rowsFile.length

      const processBatch = async (deadline) => {
        if (totalRows === 0) {
          setErrors([
            ...accumulatedErrors,
            { id: '999', row: '999', column: '999', message: 'No se encontró ningún registro' },
          ])
          setProgress(100)
          return
        }
        while (currentIndex < totalRows && deadline.timeRemaining() > 0) {
          const nextBatch = rowsFile.slice(currentIndex, currentIndex + batchSize)
          const validationErrors = await validateRows(
            nextBatch,
            infoForm.columnsMatch,
            currentIndex
          )

          if (Array.isArray(validationErrors)) {
            accumulatedErrors = [...accumulatedErrors, ...validationErrors]
            setErrors([...accumulatedErrors])
          }

          currentIndex += batchSize

          const progressValue = Math.min(100, Math.floor((currentIndex / totalRows) * 100))
          setProgress(progressValue)
        }

        if (currentIndex < totalRows) {
          requestIdleCallback(processBatch)
        }
      }

      requestIdleCallback(processBatch)
    }

    validateInChunks()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsFile, infoForm.columnsMatch])

  const columns = [
    { field: 'row', headerName: 'Fila', width: 100 },
    { field: 'column', headerName: 'Columna', width: 200 },
    { field: 'message', headerName: 'Mensaje', flex: 1 },
  ]

  return (
    <Box
      bgcolor='#fff'
      p={2}
      display='flex'
      flexDirection='column'
      minHeight='20vh'
      justifyContent='center'
      alignItems='center'
    >
      {progress === 100 && !!errors.length && (
        <Box
          display='flex'
          flexDirection='column'
          width='100%'
          height='100%'
          gap={2}
        >
          <InfoData
            color={'#828282'}
            bgcolor={'#FFEAEA'}
          >
            <CancelOutlined />
            <Typography>
              <strong>¡Error!</strong> Al insertar {errors?.length} datos en la columna de destino
            </Typography>
          </InfoData>
          <Box width='100%'>
            <DataGridPremium
              rows={errors ?? []}
              columns={columns}
              slots={{
                noRowsOverlay: NoDataOverlay, // To show a custom overlay when no rows are displayed
                loadingOverlay: LinearProgress, // To show a linear progress indicator when loading
              }}
              localeText={localeTextsEsp} // translations for the table
              pageSizeOptions={[10, 20, 50, 100]}
              disableRowSelectionOnClick
              getRowClassName={(params) => getRowClassName(dark, params)}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
                pinnedColumns: {
                  right: ['options'],
                },
              }}
              sx={{ maxHeight: '40vh' }}
            />
          </Box>
        </Box>
      )}
      {progress === 100 && !errors.length && (
        <InfoData
          color={'#828282'}
          bgcolor={'#DDEFFF'}
        >
          <CheckCircle />
          <Typography>
            <strong>¡Correcto!</strong> No se encontraron errores de verificación.
          </Typography>
        </InfoData>
      )}
      {progress && progress !== 100 && (
        <BackdropLoadingLabel
          value={progress}
          label={'Verificando datos...'}
        />
      )}
    </Box>
  )
}

export default ValidateInfo
