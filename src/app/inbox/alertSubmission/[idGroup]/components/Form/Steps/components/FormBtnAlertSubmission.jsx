import { Add, Edit } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { ContentBtnStyles } from '../../../../styles'
import { usePrivileges } from '@/lib'

const FormBtnAlertSubmission = ({ handleOpen, modalAlerts }) => {
  const registryAlertPrivilege = 'cgr.alertas.visualizar_alertas'
  const btnRegistryAlert = usePrivileges(registryAlertPrivilege)

  return (
    <Grid
      item
      xs={12}
      sx={ContentBtnStyles}
    >
      <Button
        variant='outlined'
        onClick={modalAlerts?.handleShow}
        startIcon={<Add />}
        size='small'
      >
        Agregar alerta
      </Button>
      {btnRegistryAlert && (
        <Button
          variant='outlined'
          startIcon={<Edit />}
          onClick={handleOpen}
          size='small'
        >
          Registrar alerta
        </Button>
      )}
    </Grid>
  )
}

export default FormBtnAlertSubmission
