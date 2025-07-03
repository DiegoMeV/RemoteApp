import { TitleAdmin } from '@/app/administration/components'
import { ErrorPage } from '@/lib'
import { ProcessTypeTable } from '../components'
import { Button, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ViewProcessType = ({ groupSelected, isLoading, isError, idGroup, idApplication }) => {
  const navigate = useNavigate()
  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAdmin
            title='Tipos de Proceso'
            back='true'
            backpath={`/applications/process/${idApplication}`}
          >
            <Grid
              item
              container
              xs={12}
              md={6}
              lg={7}
              xl={8}
              justifyContent='flex-end'
              alignItems='center'
            >
              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={() => navigate(`/applications/process/editTypeProcess/${idGroup}/new`)}
              >
                Agregar
              </Button>
            </Grid>
          </TitleAdmin>
          <ProcessTypeTable
            processTypes={groupSelected?.data}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  )
}

export default ViewProcessType
