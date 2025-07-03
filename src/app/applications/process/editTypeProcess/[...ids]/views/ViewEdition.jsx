import { Box, Button, Grid } from '@mui/material'
import { GeneraInfo, ProcessVariables, SectionContainer } from '../components'
import { useEditionProcessType } from '../hooks'
import { BackdropLoading } from '@/lib'
import { Add } from '@mui/icons-material'
import { TitleAdmin } from '@/app/administration/components'

const ViewEdition = ({ dataProcessType, isNew, idGroup }) => {
  const {
    variablesProcessType,
    ProcessTypesForm,
    loadingPT,
    addVariable,
    deleteVariable,
    onSubmit,
  } = useEditionProcessType(dataProcessType, isNew, idGroup)

  return (
    <Box
      component='form'
      onSubmit={ProcessTypesForm.handleSubmit(onSubmit)}
      flexDirection='column'
      rowGap={5}
    >
      <BackdropLoading loading={loadingPT} />
      <SectionContainer>
        <TitleAdmin
          title={isNew ? 'Creación de tipo de proceso' : 'Edición de tipo de proceso'}
          back={true}
          backpath={`/applications/process/tiposDeProcesos/${idGroup}`}
        />
        <GeneraInfo ProcessTypesForm={ProcessTypesForm} />
      </SectionContainer>
      <SectionContainer>
        <TitleAdmin title='Variables de tipo de proceso'>
          <Grid
            item
            container
            xs={12}
            md={6}
            lg={7}
            xl={8}
            justifyContent='flex-end'
          >
            <Button
              variant='contained'
              onClick={addVariable}
              startIcon={<Add />}
            >
              Agregar
            </Button>
          </Grid>
        </TitleAdmin>
        <Box
          maxHeight='300px'
          overflow='auto'
        >
          <ProcessVariables
            ProcessTypesForm={ProcessTypesForm}
            variablesProcessType={variablesProcessType}
            deleteVariable={deleteVariable}
          />
        </Box>
      </SectionContainer>
      <Box
        display='flex'
        justifyContent='center'
        pt={2}
      >
        <Button
          variant='contained'
          type='submit'
        >
          Guardar
        </Button>
      </Box>
    </Box>
  )
}

export default ViewEdition
