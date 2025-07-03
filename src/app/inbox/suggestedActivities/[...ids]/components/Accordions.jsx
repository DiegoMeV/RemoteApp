import { CustomAccordion, getRowClassName, resizeColumns } from '@/lib'
import { Box } from '@mui/material'
import {
  DataGridPremium,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  useGridApiRef,
} from '@mui/x-data-grid-premium'
import { columnsManagedActivities, columnsNextActivities } from '../constants'
import { useEffect } from 'react'
import { useStoreState } from 'easy-peasy'

const Accordions = ({
  isLoading,
  suggestedActivities,
  rowSelectionModel,
  setRowSelectionModel,
}) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  // TODO : const apiRefSuggestedActivities = useGridApiRef()
  const apiRefOriginalProcessTasks = useGridApiRef()
  const apiRefNextActivities = useGridApiRef()
  const apiRefPreviousActivities = useGridApiRef()

  const customCheckboxSelection = {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    renderHeader: () => <></>,
    width: 100,
  }
  const handleRowSelectionModelChange = (newRowSelectionModel, name) => {
    const length = newRowSelectionModel?.length
    if (length > 1) {
      setRowSelectionModel({ [name]: [newRowSelectionModel[length - 1]] })
      return
    }
    setRowSelectionModel({ [name]: newRowSelectionModel })
  }

  useEffect(() => {
    // TODO :  resizeColumns(apiRefSuggestedActivities, isLoading)
    resizeColumns(apiRefOriginalProcessTasks, isLoading)
    resizeColumns(apiRefNextActivities, isLoading)
    resizeColumns(apiRefPreviousActivities, isLoading)
  }, [apiRefNextActivities, apiRefOriginalProcessTasks, apiRefPreviousActivities, isLoading])

  return (
    <>
      {/*  TODO  <CustomAccordion
        title='Sugerida'
        defaultExpanded={suggestedActivities?.suggestedActivities?.length > 0}
      >
        <Box sx={{ height: 300 }}>
          <DataGridPremium
            apiRef={apiRefSuggestedActivities}
            columns={[customCheckboxSelection, ...columnsSuggestedActivities] ?? []}
            getRowClassName={(params) => getRowClassName(dark, params)}
            rows={suggestedActivities?.suggestedActivities ?? []}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={rowSelectionModel}
            checkboxSelection
            disableRowSelectionOnClick
            disableMultipleRowSelection
            sx={{ backgroundColor: 'backgroundWhite1' }}
          />
        </Box>
      </CustomAccordion> */}
      {suggestedActivities?.parentProcessTasks?.length > 0 && (
        <CustomAccordion
          title='Actividades proceso origen'
          defaultExpanded={suggestedActivities?.parentProcessTasks?.length > 0}
        >
          <Box sx={{ height: 500 }}>
            <DataGridPremium
              apiRef={apiRefOriginalProcessTasks}
              columns={[customCheckboxSelection, ...columnsNextActivities]}
              getRowClassName={(params) => getRowClassName(dark, params)}
              rows={suggestedActivities?.parentProcessTasks ?? []}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                handleRowSelectionModelChange(
                  newRowSelectionModel,
                  'rowsSelectionOriginalProcessTasks'
                )
              }}
              rowSelectionModel={rowSelectionModel?.rowsSelectionOriginalProcessTasks ?? []}
              checkboxSelection
              disableRowSelectionOnClick
              disableMultipleRowSelection
              sx={{ backgroundColor: 'backgroundWhite1' }}
            />
          </Box>
        </CustomAccordion>
      )}
      <CustomAccordion
        title='Próximas actividades'
        defaultExpanded={suggestedActivities?.nextActivities?.length > 0}
      >
        <Box sx={{ height: 500 }}>
          <DataGridPremium
            apiRef={apiRefNextActivities}
            columns={[customCheckboxSelection, ...columnsNextActivities]}
            getRowClassName={(params) => getRowClassName(dark, params)}
            rows={suggestedActivities?.nextActivities ?? []}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              handleRowSelectionModelChange(newRowSelectionModel, 'rowsSelectionNextActivities')
            }}
            rowSelectionModel={rowSelectionModel?.rowsSelectionNextActivities ?? []}
            checkboxSelection
            disableRowSelectionOnClick
            disableMultipleRowSelection
            sx={{ backgroundColor: 'backgroundWhite1' }}
          />
        </Box>
      </CustomAccordion>
      <CustomAccordion
        title='Actividades anteriores'
        defaultExpanded={suggestedActivities?.nextActivities?.length > 0}
      >
        <Box sx={{ height: 500 }}>
          <DataGridPremium
            apiRef={apiRefPreviousActivities}
            columns={[customCheckboxSelection, ...columnsManagedActivities]}
            getRowClassName={(params) => getRowClassName(dark, params)}
            rows={suggestedActivities?.previousActivities ?? []}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              handleRowSelectionModelChange(newRowSelectionModel, 'rowsSelectionPreviousActivities')
            }}
            rowSelectionModel={rowSelectionModel?.rowsSelectionPreviousActivities ?? []}
            checkboxSelection
            disableRowSelectionOnClick
            disableMultipleRowSelection
            sx={{ backgroundColor: 'backgroundWhite1' }}
          />
        </Box>
      </CustomAccordion>
    </>
  )
}

export default Accordions
