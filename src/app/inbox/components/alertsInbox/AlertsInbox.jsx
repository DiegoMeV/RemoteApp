import { DataGridPremium } from '@mui/x-data-grid-premium'
import useTableFunctions from '../../hooks/useTableFunctions'
import { CallMissedOutgoing, FormatListBulleted } from '@mui/icons-material'
import { Box, Button, Tooltip } from '@mui/material'

//TODO: Traer informacion del idProcess Seleccionado.
const AlertsInbox = () => {
  const provisionalRows = [
    {
      id: '1',
      date: new Date('2023-09-01 01:03:12'),
      message: 'El expediente reporta 90 días o más sin gestión realizada.',
      assigned: 'John Smith',
    },
    {
      id: '2',
      date: new Date('2023-09-02 08:15:30'),
      message: 'Necesitamos actualizar la información de contacto del cliente.',
      assigned: 'Maria Rodriguez',
    },
    {
      id: '3',
      date: new Date('2023-09-03 14:22:45'),
      message: 'Se ha completado la revisión del expediente.',
      assigned: 'David Johnson',
    },
    {
      id: '4',
      date: new Date('2023-09-04 11:30:20'),
      message: 'Por favor, proporciona una actualización sobre el estado del cliente.',
      assigned: 'Emily Brown',
    },
    {
      id: '5',
      date: new Date('2023-09-05 16:45:55'),
      message: 'El cliente ha solicitado una extensión de plazo.',
      assigned: 'Michael Wilson',
    },
    {
      id: '6',
      date: new Date('2023-09-06 09:10:08'),
      message: 'Se requiere revisión adicional de documentos.',
      assigned: 'Sophia Martinez',
    },
    {
      id: '7',
      date: new Date('2023-09-07 17:55:30'),
      message: 'Hemos recibido una queja del cliente, por favor investigar.',
      assigned: 'Daniel Lee',
    },
    {
      id: '8',
      date: new Date('2023-09-08 14:40:12'),
      message: 'El cliente ha proporcionado información adicional.',
      assigned: 'Olivia Garcia',
    },
    {
      id: '9',
      date: new Date('2023-09-09 10:20:05'),
      message: 'Reunión programada con el cliente para la próxima semana.',
      assigned: 'William Anderson',
    },
    {
      id: '10',
      date: new Date('2023-09-10 12:05:30'),
      message: 'El cliente ha cancelado su solicitud.',
      assigned: 'Ava Thomas',
    },
    {
      id: '11',
      date: new Date('2023-09-11 15:18:40'),
      message: 'Es necesario enviar una notificación por correo electrónico.',
      assigned: 'Liam Hernandez',
    },
    {
      id: '12',
      date: new Date('2023-09-12 19:30:22'),
      message: 'Se ha resuelto el problema con el expediente.',
      assigned: 'Emma Smith',
    },
    {
      id: '13',
      date: new Date('2023-09-13 20:50:17'),
      message: 'El cliente ha solicitado una reunión urgente.',
      assigned: 'Noah Davis',
    },
    {
      id: '14',
      date: new Date('2023-09-14 08:07:55'),
      message: 'Actualización de estado: expediente cerrado.',
      assigned: 'Mia Brown',
    },
    {
      id: '15',
      date: new Date('2023-09-15 16:28:40'),
      message: 'Se ha iniciado una investigación adicional.',
      assigned: 'James Wilson',
    },
    {
      id: '16',
      date: new Date('2023-09-16 11:12:05'),
      message: 'Se ha programado una auditoría interna.',
      assigned: 'Sophia Rodriguez',
    },
    {
      id: '17',
      date: new Date('2023-09-17 14:35:30'),
      message: 'Solicitud de aprobación para una excepción.',
      assigned: 'Ethan Thomas',
    },
    {
      id: '18',
      date: new Date('2023-09-18 09:45:22'),
      message: 'Revisión de documentos pendiente.',
      assigned: 'Olivia Johnson',
    },
    {
      id: '19',
      date: new Date('2023-09-19 17:10:15'),
      message: 'El cliente ha realizado un pago parcial.',
      assigned: 'Lucas Martinez',
    },
    {
      id: '20',
      date: new Date('2023-09-20 14:55:40'),
      message: 'Se ha enviado una carta de agradecimiento al cliente.',
      assigned: 'Ava Davis',
    },
    {
      id: '21',
      date: new Date('2023-09-21 18:03:28'),
      message: 'Se ha completado una revisión de seguimiento.',
      assigned: 'William Smith',
    },
    {
      id: '22',
      date: new Date('2023-09-22 10:40:30'),
      message: 'Actualización de estado: expediente reabierto.',
      assigned: 'Emma White',
    },
    {
      id: '23',
      date: new Date('2023-09-23 12:15:50'),
      message: 'El cliente ha proporcionado documentación requerida.',
      assigned: 'Liam Johnson',
    },
    {
      id: '24',
      date: new Date('2023-09-24 15:30:40'),
      message: 'Se ha programado una reunión de revisión.',
      assigned: 'Mia Rodriguez',
    },
    {
      id: '25',
      date: new Date('2023-09-25 07:22:18'),
      message: 'Necesitamos confirmación del cliente para proceder.',
      assigned: 'Noah Davis',
    },
    {
      id: '26',
      date: new Date('2023-09-26 19:05:30'),
      message: 'El cliente ha solicitado una extensión de plazo adicional.',
      assigned: 'Ethan Brown',
    },
    {
      id: '27',
      date: new Date('2023-09-27 14:48:55'),
      message: 'Actualización de estado: expediente cerrado.',
      assigned: 'Olivia Lee',
    },
    {
      id: '28',
      date: new Date('2023-09-28 09:10:12'),
      message: 'Reunión con el equipo de trabajo programada para mañana.',
      assigned: 'Lucas Johnson',
    },
    {
      id: '29',
      date: new Date('2023-09-29 16:55:40'),
      message: 'El cliente ha proporcionado información actualizada.',
      assigned: 'Sophia Davis',
    },
    {
      id: '30',
      date: new Date('2023-09-30 13:25:30'),
      message: 'Se ha iniciado una revisión exhaustiva del expediente.',
      assigned: 'David Smith',
    },
  ]
  const columnsData = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      type: 'number',
      disableColumnMenu: true,
      renderHeader: () => <FormatListBulleted />,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Fecha',
      type: 'date',
      width: 200,
      editable: false,
    },
    {
      field: 'message',
      headerName: 'Mensaje',
      flex: 1,
      editable: false,
    },
    {
      field: 'assigned',
      headerName: 'Responsable',
      width: 200,
      editable: false,
    },
    {
      field: 'Options',
      headerName: 'Opciones',

      width: 60,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderHeader: () => '',
      renderCell: () => (
        <Tooltip
          title='Gestionar'
          arrow
        >
          <Button sx={{ minWidth: '50px' }}>
            <CallMissedOutgoing />
          </Button>
        </Tooltip>
      ),
    },
  ]
  const onCellClick = (row, e) => e.stopPropagation()
  const { getRowClassName } = useTableFunctions({})
  return (
    <Box>
      <DataGridPremium
        key='AlertModal'
        columns={columnsData}
        rows={provisionalRows}
        getRowClassName={getRowClassName}
        onCellClick={onCellClick}
        initialState={{
          pinnedColumns: {
            left: ['id'],
            right: ['Options'],
          },
        }}
      />
    </Box>
  )
}
export default AlertsInbox
