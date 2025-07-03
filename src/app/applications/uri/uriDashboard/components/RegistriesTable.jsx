import { sxSearchTables } from '@/app/applications/styles'
import { NoDataOverlay } from '@/lib'
import { Visibility } from '@mui/icons-material'
import { Box, IconButton, LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import React from 'react'

const RegistriesTable = ({
  infoExecutiveInfo,
  loadingExecutiveInfo,
  modalExecutiveInfo,
  setInfoRow,
  setRegistryAriSigeDoc,
}) => {
  return (
    <Box sx={sxSearchTables}>
      <DataGridPremium
        rows={infoExecutiveInfo?.data ?? []}
        loading={loadingExecutiveInfo}
        getRowId={(row) => row.id_registro_ari}
        initialState={{
          pinnedColumns: {
            right: ['opciones'],
          },
        }}
        onRowDoubleClick={() => {
          modalExecutiveInfo.handleShow()
        }}
        columns={[
          {
            field: 'caso_individual_cat',
            headerName: 'Caso individual CAT',
            width: 200,
          },
          {
            field: 'estado_seguimiento',
            headerName: 'Estado de seguimiento',
            width: 200,
          },
          {
            field: 'departamento',
            headerName: 'Departamento',
            width: 200,
          },
          {
            field: 'municipio',
            headerName: 'Municipio',
            width: 200,
          },
          {
            field: 'problematica_alertada',
            headerName: 'Problemática alertada',
            width: 200,
          },
          {
            field: 'beneficiarios',
            headerName: 'Beneficiarios',
            width: 200,
          },
          {
            field: 'opciones',
            headerName: '',
            width: 50,
            align: 'center',
            renderCell: (params) => {
              return (
                <IconButton
                  color='primary'
                  onClick={() => {
                    modalExecutiveInfo.handleShow()
                    setInfoRow?.(params?.row)
                    setRegistryAriSigeDoc?.(params?.row?.sigedoc_inclusion)
                  }}
                >
                  <Visibility />
                </IconButton>
              )
            },
          },
        ]}
        slots={{
          noRowsOverlay: NoDataOverlay,
          loadingOverlay: LinearProgress,
        }}
        sx={{ backgroundColor: 'backgroundWhite1', minHeight: '300px' }}
      />
    </Box>
  )
}

export default RegistriesTable
