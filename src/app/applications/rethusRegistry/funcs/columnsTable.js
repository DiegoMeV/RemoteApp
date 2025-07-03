import { ClassicIconButton } from '@/lib'
import { Email, Visibility } from '@mui/icons-material'
import { Box } from '@mui/material'

export const columnsTable = ({
  viewBatch,
  filterValue,
  setConfirmAlertProps,
  sendConfirmationEmail,
  canSentEmail,
}) => {
  const columns = [
    {
      field: 'identifier',
      headerName: 'Proceso',
      width: 250,
      valueGetter: (params) => {
        return `${params.row.identifier ?? ''}`
      },
    },
    {
      field: 'actor',
      headerName: 'Solicitante',
      width: 200,
      valueGetter: (params) => {
        return `${params.row.processActors?.PETICIONARIO?.[0]?.firstName ?? ''} ${
          params.row.processActors?.PETICIONARIO?.[0]?.secondName ?? ''
        } ${params.row.processActors?.PETICIONARIO?.[0]?.firstLastName ?? ''} ${
          params.row.processActors?.PETICIONARIO?.[0]?.secondLastName ?? ''
        }`
      },
    },
    {
      field: 'school',
      headerName: 'Institucion Educativa',
      width: 300,
      valueGetter: (params) => {
        return `${params.row.processActors?.PETICIONARIO?.[0]?.schoolData?.nombre ?? ''}`
      },
    },
    {
      field: 'career',
      headerName: 'Titulo',
      width: 300,
      valueGetter: (params) => {
        return `${params.row.processActors?.PETICIONARIO?.[0]?.careerData?.nombre ?? ''}`
      },
    },
  ]
  if (filterValue === 1 || filterValue === 2) {
    columns.push(
      {
        field: 'identifierRethusRegistry',
        headerName: 'Lote',
        width: 200,
      },
      {
        field: 'view',
        headerName: '',
        disableColumnMenu: true,
        disableReorder: true,
        filterable: false,
        hideable: false,
        resizable: false,
        width: 100,
        renderCell: (params) => {
          return (
            <Box mx='auto'>
              {params?.row?.identifier ? (
                !params?.row?.sendEmailAt &&
                canSentEmail && (
                  <ClassicIconButton
                    title='Enviar confirmación por correo'
                    onClick={() =>
                      setConfirmAlertProps({
                        open: true,
                        icon: 'warning',
                        content: `¿Esta seguro que desea enviar el correo de confirmación?`,
                        onConfirm: () => {
                          sendConfirmationEmail({
                            qry: `/${params.row.id}/sendEmail/${params.row.idRethusRegistry}`,
                          })
                        },
                      })
                    }
                  >
                    <Email />
                  </ClassicIconButton>
                )
              ) : (
                <ClassicIconButton
                  title='Ver archivo plano'
                  onClick={() => viewBatch(params)}
                >
                  <Visibility />
                </ClassicIconButton>
              )}
            </Box>
          )
        },
      }
    )
  }
  return columns
}
