import {
  CallMissedOutgoing,
  DescriptionOutlined,
  FeedOutlined,
  FlipCameraAndroid,
  History,
  InfoOutlined,
  NoteAltOutlined,
  RecentActorsOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { RowMenu, SquareIconButton } from '@/lib'
import { Box } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { MWProcessModals } from '../funcs'

const InboxinRowMenu = ({
  row,
  handleOpenModal,
  setIdProcess,
  setIdActivity,
  filingForm,
  setIdentifier,
}) => {
  const { id, idProcess, Process } = row
  const idProcessParent = row.Task?.ParentTask?.id

  const selectedOption = useStoreState((state) => state.menu.selectedOption)
  const userData = useStoreState((state) => state.user.userData)
  const companyId = userData?.companies?.[0].companyId

  const navigate = useNavigate()

  const handleClickForm = () => {
    navigate(`${idProcess}/${id}`)
  }

  const handleClickNotes = () => {
    navigate(`/inbox/notes/${idProcess}`)
  }

  const handleActors = () => {
    navigate(`/inbox/actors/${idProcess}`)
  }

  const handleClick = (otherFun) => {
    setIdProcess(idProcess)
    setIdActivity(id)
    setIdentifier(Process.identifier)
    otherFun?.()
  }

  const editForm = {
    familyServices: () =>
      navigate(
        `/inbox/familyServices?idGroup=${selectedOption}&idProcess=${idProcess}&idProcessParent=${idProcessParent}&edition=true`
      ),
    rethus: () => navigate(`/rethus/${companyId}/${idProcess}`),
    RegistryIncomingCorrespondence: () =>
      navigate(`/inbox/registryIncomingCorrespondence?idProcess=${idProcess}`),
    RegistryOutgoingCorrespondence: () =>
      navigate(`/inbox/registryOutgoingCorrespondence?idProcess=${idProcess}`),
    RegistryInternalCorrespondence: () =>
      navigate(`/inbox/registryInternalCorrespondence?idProcess=${idProcess}`),
    alertSubmission: () =>
      navigate(`/inbox/alertSubmission/${selectedOption}/?idProcess=${idProcess}&isEdition=true`),
    default: () =>
      navigate(`/inbox/${filingForm}?idGroup=${selectedOption}&idProcess=${idProcess}`),
  }

  const handleEditForm = () => {
    if (filingForm) {
      const action = editForm?.[filingForm] || editForm?.default
      // TODO: The default form cannot be edited || (() => navigate(`/inbox/${idProcess}/${id}`))
      action()
    }
  }

  const renderEditForm =
    filingForm === 'familyServices' ||
    filingForm === 'rethus' ||
    filingForm === 'alertSubmission' ||
    filingForm === 'sendsAlerts' ||
    filingForm === 'RegistryIncomingCorrespondence' ||
    filingForm === 'RegistryOutgoingCorrespondence' ||
    filingForm === 'RegistryInternalCorrespondence'

  const menuItems = [
    {
      sx: { gap: '5px', color: '#333333', display: { xs: 'flex', md: 'none' } },
      onClick: () => handleClick(handleClickForm),
      icon: <CallMissedOutgoing />,
      text: 'Gestionar',
    },
    {
      sx: { gap: '5px', color: '#333333' },
      onClick: handleEditForm,
      icon: <FeedOutlined />,
      text: 'Editar formulario',
      render: renderEditForm,
    },
    {
      onClick: () => {
        handleOpenModal(MWProcessModals.HISTORICAL)
        handleClick()
      },
      icon: <History />,
      text: 'Histórico',
      privilege: 'procesos.proceso.visualizar_historico',
    },
    {
      onClick: () => {
        handleClick()
        handleOpenModal(MWProcessModals.CURRENT_DOCS)
      },
      icon: <DescriptionOutlined />,
      text: 'Documentos Vigentes',
      privilege: 'procesos.proceso.visualizar_documentos_vigentes',
    },
    {
      onClick: () => {
        handleClick()
        handleOpenModal(MWProcessModals.BASIC_DATA)
      },
      icon: <InfoOutlined />,
      text: 'Datos Básicos',
      privilege: 'procesos.proceso.visualizar_datos_basicos',
    },
    // TODO : {
    //   onClick: () => handleClick(handleShowAlerts),
    //   icon: <WarningAmberOutlined />,
    //   text: 'Alertas',
    // },
    {
      onClick: () => handleClick(handleClickNotes),
      icon: <NoteAltOutlined />,
      text: 'Notas',
      privilege: 'procesos.bandeja.notas',
    },
    {
      onClick: () => {
        handleClick()
        handleOpenModal(MWProcessModals.CHANGE_STATUS)
      },
      icon: <FlipCameraAndroid />,
      text: 'Cambiar estado',
      privilege: 'procesos.opciones_especiales.actualizar_status',
    },
    {
      onClick: () => handleActors(),
      icon: <RecentActorsOutlined />,
      text: 'Gestión de actores',
      privilege: 'procesos.actores.listar',
    },
    // TO DO: hide options for now
    // {
    //   onClick: () => handleClick(handleEditActivity),
    //   icon: <Edit />,
    //   text: 'Editar actividad',
    //   privilege: 'procesos.opciones_especiales.actualizar_datos_actividad',
    // },
    // {
    //   onClick: () => handleClick(handleDeleteNotification),
    //   icon: <Delete />,
    //   text: 'Eliminar notificación',
    //   privilege: 'procesos.opciones_especiales.actualizar_datos_actividad',
    // },
  ]

  return (
    <Box
      display='flex'
      justifyContent='center'
      width='100%'
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SquareIconButton
          tooltip='Gestionar'
          IconComponent={<CallMissedOutgoing />}
          variant='text'
          onClick={handleClickForm}
        />
      </Box>
      <RowMenu rowOptions={menuItems} />
    </Box>
  )
}

export default InboxinRowMenu
