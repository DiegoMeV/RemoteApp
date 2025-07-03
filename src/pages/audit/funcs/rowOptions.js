import { RowMenu } from '@/lib'
import { formatToLocaleDate } from '@/libV4'
import {
  DescriptionOutlined,
  FlipCameraAndroid,
  History,
  InfoOutlined,
  NoteAltOutlined,
} from '@mui/icons-material'
import { Typography } from '@mui/material'

const rowOptions = ({
  openModals,
  idProcess,
  setIdProcess,
  identifier,
  setIdentifier,
  navigate,
}) => {
  const { handleShowHistorical, handleShowCurrentDocs, handleShowBasicData, handleShowManagement } =
    openModals

  const handleClick = (otherFun) => {
    setIdProcess(idProcess)
    setIdentifier(identifier)
    otherFun?.()
  }

  const handleClickNotes = () => {
    navigate(`/audit/notes/${idProcess}`)
  }

  return [
    {
      text: 'Gestionar',
      onClick: () => handleClick(handleShowManagement),
      icon: <FlipCameraAndroid />,
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
  ]
}

export const columnsResults = ({ openModals, setIdProcess, navigate, setIdentifier }) => {
  const columns = [
    {
      field: 'identifier',
      headerName: 'Número',
    },
    {
      field: 'processTypeName',
      headerName: 'Tipo de proceso',
      renderCell: (data) => {
        return `${data?.processTypeName ?? data?.ProcessType.name ?? ''}`
      },
    },
    {
      field: 'code',
      headerName: 'Código',
      renderCell: (data) => {
        return `${data?.processData.taxPayerData.codigo ?? ''}`
      },
    },
    {
      field: 'contribuyente',
      headerName: 'Contribuyente',
      minWidth: 200,
      renderCell: (data) => {
        const newString = data?.processData?.taxPayerData?.nombreProp
          ? data.processData.taxPayerData.nombreProp.split(',').join(',\n')
          : ''
        return (
          <Typography
            component='div'
            style={{ whiteSpace: 'pre-line' }}
          >
            {newString}
          </Typography>
        )
      },
    },
    {
      field: 'lastActivityData',
      headerName: 'Ultima gestión realizada',
      minWidth: 150,
      renderCell: (data) => {
        const newString = `${formatToLocaleDate(data?.lastActivityData?.createdAt)}${
          data?.lastActivityData?.taskName ? ` - ${data?.lastActivityData?.taskName}` : ''
        }`
        return newString
      },
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
          identifier: data?.identifier,
          setIdentifier,
          setIdProcess,
          navigate,
        })
        return <RowMenu rowOptions={options} />
      },
    },
  ]

  return columns
}

export const updateState = (filterName, setValue, filter, select) => {
  if (filterName === 'status') {
    setValue(`${filter?.id ?? ''}.name`, select?.[0]?.value)
    return
  }
  setValue(`${filter?.id ?? ''}.name`, '')
}
