import { ClassicIconButton } from '@/lib'
import { CallMissedOutgoing } from '@mui/icons-material'

export const columnsContractAlert = (setConfirmAlertProps, navigate) => [
  {
    field: 'numero',
    headerName: 'Número',
    width: 150,
    valueGetter: (params) => `${params?.row?.alertaInfo?.identificador ?? ''}`,
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 150,
    valueGetter: (params) => `${params?.row?.alertaInfo?.tipo ?? ''}`,
  },
  {
    field: 'modelo',
    headerName: 'Modelo',
    width: 150,
    valueGetter: (params) => `${params?.row?.alertaInfo?.modeloInfo?.nombre ?? ''}`,
  },
  {
    field: 'categoria',
    headerName: 'Categoría',
    width: 150,
    valueGetter: (params) => `${params?.row?.alertaInfo?.categoriaInfo?.nombre ?? ''}`,
  },
  {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      const idAlerta = params?.row?.alertaInfo?.id
      return (
        <ClassicIconButton
          title='Ver Alerta'
          onClick={() => {
            setConfirmAlertProps({
              open: true,
              icon: 'info',
              title: 'Confirmar',
              content: 'Será redirigido a la alerta. ¿Desea continuar?',
              onConfirm: () => {
                navigate(`/applications/alerts/${idAlerta}`)
              },
            })
          }}
        >
          <CallMissedOutgoing />
        </ClassicIconButton>
      )
    },
  },
]
