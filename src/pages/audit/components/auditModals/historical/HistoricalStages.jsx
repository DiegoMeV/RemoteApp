import { Grid } from '@mui/material'
import { HistoricalDocumentsDownload } from './HistoricalDocumentsDownload'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { getRowClassName, resizeColumns, useBoolean, usePrivileges } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { getColums } from './funcs'
import { useEffect, useMemo, useState } from 'react'
import { InfoByActions } from './components'
import { CustomModal, isEmpty } from '@/libV4'
import { AuditManagement } from '@/pages/audit/management'

const HistoricalStages = ({ infoActivities, isLoading, idProcess }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const apiRef = useGridApiRef()
  const [boxType, setBoxType] = useState()
  const [docs, setDocs] = useState()

  const [ids, setIds] = useState({})
  const openManagement = useBoolean()

  const handleOpenManagement = (ids) => {
    openManagement.handleShow()
    setIds(ids)
  }

  const hasPrivilegeEdit = usePrivileges('procesos.opciones_especiales.actualizar_datos_actividad')
  const hasPrivilegeDelete = usePrivileges('procesos.opciones_especiales.eliminar_actividad')
  const hasSomePrivilege = hasPrivilegeEdit || hasPrivilegeDelete

  const rows = useMemo(
    () =>
      infoActivities?.flatMap?.((stage) => {
        if (!isEmpty(stage)) {
          return stage?.activities?.map?.((activity) => ({
            ...activity,
            stageName: stage?.name,
            stageId: stage?.id,
          }))
        }
        return [] // Retornar array vacío en lugar de null
      }) || [],
    [infoActivities]
  )

  const columns = getColums(setBoxType, setDocs, hasSomePrivilege, handleOpenManagement)

  useEffect(() => {
    resizeColumns(apiRef, isLoading)
  }, [apiRef, isLoading])

  return (
    <Grid
      container
      height='100%'
    >
      <Grid
        item
        xs={12}
        md={boxType ? 8 : 12}
        marginBottom={3}
        height='100%'
      >
        <DataGridPremium
          apiRef={apiRef}
          columns={columns ?? []}
          rows={rows ?? []}
          getRowClassName={(params) => getRowClassName(dark, params)}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            pinnedColumns: {
              right: ['options'],
            },
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={boxType ? 4 : 0}
      >
        {boxType === 'infoDocs' && (
          <HistoricalDocumentsDownload
            docs={docs}
            setBoxType={setBoxType}
            boxType={boxType}
          />
        )}
        {boxType === 'infoActivity' && (
          <InfoByActions
            idProcess={idProcess}
            docs={docs}
            setBoxType={setBoxType}
            boxType={boxType}
          />
        )}
      </Grid>
      {openManagement?.show && (
        <CustomModal
          open={openManagement?.show}
          handleClose={openManagement?.handleShow}
          title='Editar gestión'
          size='xxl'
          height={'calc(100vh - 150px)'}
        >
          <AuditManagement
            idProcessModal={ids?.idProcess}
            idActivityModal={ids?.idActivity}
          />
        </CustomModal>
      )}
    </Grid>
  )
}

export default HistoricalStages
