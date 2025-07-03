import { RowMenu } from '@/lib'
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
import { List, ListItem, ListItemText } from '@mui/material'

const rowOptions = ({
  openModals,
  idProcess,
  setIdProcess,
  identifier,
  setIdentifier,
  rows,
  userData,
  selectedOption,
  infoMenu,
  navigate,
}) => {
  const { id, idProcessParent } = rows
  const companyId = userData?.companies?.[0].companyId

  const filingForm = infoMenu?.filingForm

  const {
    handleShowHistorical,
    handleShowCurrentDocs,
    handleShowBasicData,
    handleShowChangeStatus,
  } = openModals

  const handleClick = (otherFun) => {
    setIdProcess(idProcess)
    setIdentifier(identifier)
    otherFun?.()
  }

  const handleClickForm = () => {
    navigate(`inbox/${idProcess}/${id}`)
  }

  const handleClickNotes = () => {
    navigate(`/inbox/notes/${idProcess}`)
  }

  const handleActors = () => {
    navigate(`/inbox/actors/${idProcess}`)
  }

  const editForm = {
    familyServices: () =>
      navigate(
        `/inbox/familyServices?idGroup=${selectedOption}&idProcess=${idProcess}&idProcessParent=${idProcessParent}&edition=true`
      ),
    rethus: () => navigate(`/rethus/${companyId}/${idProcess}`),
    RegistryIncomingCorrespondence: () =>
      navigate(`/inbox/RegistryIncomingCorrespondence?idProcess=${idProcess}`),
    RegistryOutgoingCorrespondence: () =>
      navigate(`/inbox/RegistryOutgoingCorrespondence?idProcess=${idProcess}`),
    RegistryInternalCorrespondence: () =>
      navigate(`/inbox/RegistryInternalCorrespondence?idProcess=${idProcess}`),
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
    filingForm === 'sendsAlerts'

  return [
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
      onClick: () => handleClick(handleShowHistorical),
      icon: <History />,
      text: 'Histórico',
      privilege: 'procesos.proceso.visualizar_historico',
    },
    {
      onClick: () => handleClick(handleShowCurrentDocs),
      icon: <DescriptionOutlined />,
      text: 'Documentos Vigentes',
      privilege: 'procesos.proceso.visualizar_documentos_vigentes',
    },
    {
      onClick: () => handleClick(handleShowBasicData),
      icon: <InfoOutlined />,
      text: 'Datos Básicos',
      privilege: 'procesos.proceso.visualizar_datos_basicos',
    },
    {
      onClick: () => handleClick(handleClickNotes),
      icon: <NoteAltOutlined />,
      text: 'Notas',
    },
    {
      onClick: () => handleClick(handleShowChangeStatus),
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
  ]
}

export const columnsResults = ({
  openModals,
  setIdentifier,
  setIdProcess,
  rows,
  userData,
  selectedOption,
  infoMenu,
  navigate,
}) => {
  const columns = [
    {
      field: 'identifier',
      headerName: 'Número',
      width: 150,
      cellClassName: 'align_cell_start',
      valueGetter: (params) => `${params?.value ?? ''}`,
    },
    {
      field: 'processTypeName',
      headerName: 'Tipo de proceso',
      width: 200,
      cellClassName: 'align_cell_start',
    },
    {
      field: 'statusSpanish',
      headerName: 'Estado',
      width: 200,
      cellClassName: 'align_cell_start',
    },
    {
      field: 'officeName',
      headerName: 'Dependencia',
      width: 250,
      cellClassName: 'align_cell_start',
      valueGetter: (params) => {
        return `${params?.row?.officeOriginData?.name ?? ''}`
      },
    },
    {
      field: 'options',
      headerName: '',
      width: 60,
      renderCell: (params) => {
        const options = rowOptions({
          openModals,
          idProcess: params?.row?.id,
          setIdProcess,
          identifier: params?.row?.identifier,
          setIdentifier,
          rows,
          userData,
          selectedOption,
          infoMenu,
          navigate,
        })
        return <RowMenu rowOptions={options} />
      },
    },
  ]

  const hasContractors = rows?.some((row) => row?.processActorsList?.length > 0)

  if (hasContractors) {
    columns.push({
      field: 'processActors',
      headerName: 'Actores por proceso',
      width: 300,
      renderCell: (params) => {
        return (
          <List sx={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
            {params?.row?.processActorsList?.map((item, index) => {
              return (
                <ListItem key={index}>
                  {item?.idUserActor ? (
                    <ListItemText
                      primary={`${item?.userActorData?.documentType ?? ''} - ${
                        item?.userActorData?.documentId ?? ''
                      } - ${item?.userActorData?.firstName ?? ''} ${
                        item?.userActorData?.lastName ?? ''
                      } - ${item?.ActorType?.name ?? ''}`}
                    />
                  ) : (
                    item?.storedActorData && (
                      <ListItemText
                        primary={`${
                          item?.storedActorData?.documentType ||
                          item?.storedActorData?.document_type ||
                          ''
                        } - ${
                          item?.storedActorData?.documentNumber ||
                          item?.storedActorData?.identification ||
                          ''
                        } - ${
                          item?.storedActorData?.name || item?.storedActorData?.firstName || ''
                        } ${
                          item?.storedActorData?.lastName ||
                          item?.storedActorData?.lastNameOne ||
                          ''
                        } ${item?.storedActorData?.lastNameTwo || ''} - ${
                          item?.ActorType?.name ?? ''
                        }`}
                      />
                    )
                  )}
                </ListItem>
              )
            })}
          </List>
        )
      },
    })
  }

  return columns
}

export const updateState = (filterName, setValue, filter, select) => {
  if (filterName === 'status') {
    setValue(`${filter?.id ?? ''}.name`, select?.[0]?.value)
    return
  }
  setValue(`${filter?.id ?? ''}.name`, '')
}
