import { BasicTitle, ErrorPage, Loading } from '@/lib'
import { Box } from '@mui/material'

import { Accordions, Buttons } from '../components'
import { useState } from 'react'

const ViewActivitySelection = ({ suggestedActivities, isLoading, isError, ids }) => {
  // const apiRefOriginalProcessTasks = useGridApiRef()
  // const apiRefNextActivities = useGridApiRef()
  // const apiRefPreviousActivities = useGridApiRef()
  const [rowSelectionModel, setRowSelectionModel] = useState({
    rowsSelectionNextActivities: [],
    rowsSelectionPreviousActivities: [],
    rowsSelectionOriginalProcessTasks: [],
  })

  // const [rowsSelectionOriginalProcessTasks, setRowsSelectionOriginalProcessTasks] = useState([])
  // const [rowsSelectionNextActivities, setRowsSelectionNextActivities] = useState([])
  // const [rowsSelectionPreviousActivities, setRowsSelectionPreviousActivities] = useState([])

  return (
    <Box
      sx={{
        height: 'calc(100vh - 65px)',
        padding: 5,
      }}
    >
      <BasicTitle title='Actividades sugeridas' />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <Box
          height='calc(100vh - 230px)'
          overflow='auto'
        >
          <Accordions
            isLoading={isLoading}
            suggestedActivities={suggestedActivities?.data || {}}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
          />
        </Box>
      )}
      <Buttons
        ids={ids}
        rowSelectionModel={
          rowSelectionModel.rowsSelectionNextActivities ??
          rowSelectionModel.rowsSelectionPreviousActivities ??
          rowSelectionModel.rowsSelectionOriginalProcessTasks ??
          []
        }
        parentProcessTasks={
          !!rowSelectionModel?.rowsSelectionOriginalProcessTasks ||
          rowSelectionModel?.rowsSelectionOriginalProcessTasks?.length > 0
            ? suggestedActivities?.data?.parentProcessTasks
            : []
        }
      />
    </Box>
  )
}

export default ViewActivitySelection
