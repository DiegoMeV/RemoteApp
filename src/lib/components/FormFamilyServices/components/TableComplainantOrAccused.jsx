import { Box, Button, Grid } from '@mui/material'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { ClassicIconButton, ErrorPage, resizeColumns } from '@/lib'
import { Edit } from '@mui/icons-material'
import { useEffect } from 'react'
import { complainantOrAccusedColumns } from '../constants'

const TableComplainantOrAccused = ({
  actors,
  loadingActors,
  errorActors,
  step,
  type,
  openModal,
  formModal,
  setRowParams,
  setValidationComplainant,
  onlyRead,
}) => {
  const apiRef = useGridApiRef()

  useEffect(() => {
    setValidationComplainant?.(actors?.data?.length > 0)
  }, [actors, setValidationComplainant])

  useEffect(() => {
    resizeColumns(apiRef, loadingActors)
  }, [apiRef, loadingActors])

  const rows = actors?.data?.map((actor) => {
    const object = Array.isArray(actor?.actorData?.additionalData)
      ? actor?.actorData?.additionalData?.reduce((acc, data) => {
          return { ...acc, [data?.id]: data?.value ?? '' }
        }, {})
      : actor?.actorData?.additionalData

    return {
      ...object,
      id: actor.id,
    }
  })

  const basicColumns = complainantOrAccusedColumns(onlyRead)

  const columnOption = {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      return (
        <ClassicIconButton
          color='secondary'
          title='Editar'
          onClick={() => {
            openModal(type)
            formModal.reset()
            setRowParams(params.row)
          }}
        >
          <Edit />
        </ClassicIconButton>
      )
    },
  }

  const columns = onlyRead ? basicColumns : [...basicColumns, columnOption]

  return (
    <>
      {errorActors ? (
        <ErrorPage />
      ) : (
        <Grid
          item
          xs={12}
          key={step}
          sx={{ height: 'calc(100vh - 350px)' }}
        >
          {!onlyRead && (
            <Box
              width='100%'
              display='flex'
              justifyContent='flex-end'
              pb={2}
            >
              <Button
                variant='contained'
                onClick={() => {
                  openModal(type)
                  formModal.reset()
                  setRowParams(null)
                }}
              >
                {type === 'PETICIONARIO' ? 'Agregar peticionario' : 'Agregar tercero'}
              </Button>
            </Box>
          )}

          <DataGridPremium
            apiRef={apiRef}
            rows={rows ?? []}
            columns={columns ?? []}
            initialState={{
              pinnedColumns: {
                right: ['options'],
              },
            }}
            loading={loadingActors}
            pageSize={5}
            sx={{
              bgcolor: 'backgroundWhite1',
            }}
          />
        </Grid>
      )}
    </>
  )
}

export default TableComplainantOrAccused
