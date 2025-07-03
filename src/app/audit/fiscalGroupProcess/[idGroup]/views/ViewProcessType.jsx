import { ErrorPage } from '@/lib'
import { ProcessTypeTable } from '../components'
import { Button, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { TitleAdmin } from '@/app/administration/components'

const ViewProcessType = ({ groupSelected, isLoading, isError, idGroup }) => {
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
            backpath='/audit/fiscalGroupProcess'
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
                onClick={() => navigate(`/audit/fiscalGroupProcess/editTypeProcess/${idGroup}/new`)}
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
