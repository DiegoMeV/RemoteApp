import { RowMenu } from '@/lib'
import {
  DescriptionOutlined,
  FlipCameraAndroid,
  History,
  InfoOutlined,
  NoteAltOutlined,
} from '@mui/icons-material'

const rowOptions = ({ openModals, idProcess, setIdProcess, navigate }) => {
  const {
    handleShowHistorical,
    handleShowCurrentDocs,
    handleShowBasicData,
    handleShowChangeStatus,
  } = openModals

  const handleClick = (otherFun) => {
    setIdProcess(idProcess)
    otherFun?.()
  }

  const handleClickNotes = () => {
    navigate(`/inbox/notes/${idProcess}`)
  }

  return [
    {
      onClick: () => handleClick(handleShowHistorical),
      icon: <History />,
      text: 'Histórico',
      // privilege: 'procesos.proceso.visualizar_historico',
    },
    {
      onClick: () => handleClick(handleShowCurrentDocs),
      icon: <DescriptionOutlined />,
      text: 'Documentos Vigentes',
      // privilege: 'procesos.proceso.visualizar_documentos_vigentes',
    },
    {
      onClick: () => handleClick(handleShowBasicData),
      icon: <InfoOutlined />,
      text: 'Datos Básicos',
      // privilege: 'procesos.proceso.visualizar_datos_basicos',
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
      // privilege: 'procesos.opciones_especiales.actualizar_status',
    },
  ]
}

export const columnsProcessResults = ({ openModals, setIdProcess, navigate }) => {
  return [
    {
      field: 'identifier',
      headerName: 'Nro. de proceso',
      width: 130,
    },
    {
      field: 'processTypeName',
      headerName: 'Tipo de proceso',
      width: 200,
      renderCell: (data) => `${data?.processType?.name ?? ''}`,
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 200,
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      width: 60,
      renderCell: (data) => {
        const options = rowOptions({
          openModals,
          idProcess: data?.id,
          setIdProcess,
          navigate,
        })
        return <RowMenu rowOptions={options} />
      },
    },
  ]
}

export const columnsProcessTypes = [
  {
    field: 'name',
    headerName: 'Nombre',
    width: 200,
  },
  {
    field: 'description',
    headerName: 'Descripción',
    width: 200,
  },
]
