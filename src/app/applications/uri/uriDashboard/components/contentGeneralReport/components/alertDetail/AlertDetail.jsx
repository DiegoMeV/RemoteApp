import { DynamicTableAlert } from '@/app/applications/components'
import { sxSearchTables } from '@/app/applications/styles'
import { formatDateToCustomString } from '@/lib'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'

const AlertDetail = ({ mutateAlertDetail, loadingAlertDetail, infoAlertDetail, qryParams }) => {
  useEffect(() => {
    mutateAlertDetail({ qry: `?${qryParams}` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    { field: 'caso_individual_cat', headerName: 'ARI', minWidth: 200 },
    { field: 'estado_seguimiento', headerName: 'ARI activa', minWidth: 200 },
    {
      field: 'fecha_recepcion_alerta',
      headerName: 'Fecha recepción alerta',
      minWidth: 200,
      valueGetter: (params) => `${formatDateToCustomString(params?.value)}`,
    },
    { field: 'nombre_proyecto', headerName: 'Nombres insignia del proyecto', minWidth: 200 },
    { field: 'numero_contrato', headerName: 'Número de contrato', minWidth: 200 },
    {
      field: 'estado_inicial_contrato_o_proyecto',
      headerName: 'Estado inicial del contrato',
      minWidth: 200,
    },
    {
      field: 'objeto_contrato',
      headerName: 'Descripción',
      minWidth: 300,
      renderCell: (cellValues) => (
        <Box
          sx={{
            whiteSpace: 'normal',
            overflow: 'auto',
            maxHeight: '100px',
            padding: '16px',
            maxWidth: '400px',
          }}
        >
          <Typography
            variant='body2'
            style={{ wordWrap: 'break-word', textAlign: 'justify' }}
          >
            {cellValues.value}
          </Typography>
        </Box>
      ),
    },
  ]
  const rowsWithId = infoAlertDetail?.data?.map((row) => ({
    id: crypto.randomUUID(),
    ...row,
  }))
  // Función para estimar el alto de la fila basado en el contenido
  const getRowHeight = () => {
    // Estima el alto necesario. Este es un ejemplo básico y puede necesitar ajustes.
    const baseHeight = 52 // Altura base para filas sin contenido extra
    return Math.max(baseHeight, 150)
  }

  return (
    <Box sx={sxSearchTables}>
      <DynamicTableAlert
        columns={columns ?? []}
        rows={rowsWithId ?? []}
        loading={loadingAlertDetail}
        getRowHeight={getRowHeight}
      />
    </Box>
  )
}

export default AlertDetail
