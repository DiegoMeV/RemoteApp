import { BasicTitle, ErrorPage, NoAccessCard, useGetProcess } from '@/lib'
import { Box } from '@mui/material'
import { TableNotes } from './components'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const NotesByProcess = () => {
  const params = useParams()
  const idProcess = params.idProcess

  const {
    data: process,
    isLoading: loadingProcess,
    isError: errorProcess,
  } = useGetProcess({
    qry: `/${idProcess}/comments`,
    enabled: !!idProcess,
  })

  return (
    <AccessControl
      privilege='procesos.bandeja.notas'
      nodeContent={<NoAccessCard />}
    >
      <Box p={2}>
        <BasicTitle
          title='Notas por proceso'
          backpath='/inbox'
        />
        {errorProcess ? (
          <ErrorPage />
        ) : (
          <TableNotes
            process={process}
            loadingProcess={loadingProcess}
            errorProcess={errorProcess}
            idProcess={idProcess}
          />
        )}
      </Box>
    </AccessControl>
  )
}

export default NotesByProcess
