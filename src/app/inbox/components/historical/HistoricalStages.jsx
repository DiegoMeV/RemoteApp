import { Grid } from '@mui/material'
import { HistoricalDocumentsDownload } from './HistoricalDocumentsDownload'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { getRowClassName, resizeColumns, useBoolean, usePrivileges } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { getColums } from './funcs'
import { useEffect, useMemo, useState } from 'react'
import { InfoByActions, ModalsMoreOptions } from './components'

const HistoricalStages = ({ infoActivities, isLoading, idProcess }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const apiRef = useGridApiRef()
  const [boxType, setBoxType] = useState()
  const [docs, setDocs] = useState()
  const [idActivity, setIdActivity] = useState()
  const editActivity = useBoolean()
  const deleteNotification = useBoolean()
  const openModals = {
    handleEditActivity: editActivity?.handleShow,
    handleDeleteNotification: deleteNotification?.handleShow,
  }

  const hasPrivilegeEdit = usePrivileges('procesos.opciones_especiales.actualizar_datos_actividad')
  const hasPrivilegeDelete = usePrivileges('procesos.opciones_especiales.eliminar_actividad')
  const hasSomePrivilege = hasPrivilegeEdit || hasPrivilegeDelete

  const rows = useMemo(
    () =>
      infoActivities?.flatMap?.((stage) => {
        return stage?.activities?.map?.((activity) => ({
          ...activity,
          stageName: stage?.name,
          stageId: stage?.id,
        }))
      }) || [],
    [infoActivities]
  )
  const columns = getColums(setBoxType, setDocs, setIdActivity, hasSomePrivilege, openModals)

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
        <ModalsMoreOptions
          idProcess={idProcess}
          idActivity={idActivity}
          editActivity={editActivity}
          deleteNotification={deleteNotification}
        />
      </Grid>
    </Grid>
  )
}

export default HistoricalStages
