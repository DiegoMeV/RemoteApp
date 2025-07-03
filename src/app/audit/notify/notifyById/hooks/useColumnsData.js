import { formatToLocaleDate, RowMenu, useBoolean } from '@/lib'
import { AuditManagement } from '@/pages'
import { BasicDataInbox, CurrentDocumentsInbox, HistoricalTaskList } from '@/pages/audit/components'
import {
  DescriptionOutlined,
  FlipCameraAndroid,
  History,
  InfoOutlined,
  NoteAltOutlined,
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useColumnsData = () => {
  const historicalStates = useBoolean()
  const basicDataStates = useBoolean()
  const currentDocsStates = useBoolean()
  const management = useBoolean()
  const [idProcess, setIdProcess] = useState()
  const navigate = useNavigate()
  const rowOptions = ({ idProcess }) => {
    const handleClick = (otherFun) => {
      setIdProcess(idProcess)
      otherFun?.()
    }

    const handleClickNotes = () => {
      navigate(`/audit/notes/${idProcess}`)
    }

    return [
      {
        text: 'Gestionar',
        onClick: () => handleClick(management?.handleShow),
        icon: <FlipCameraAndroid />,
      },
      {
        onClick: () => handleClick(historicalStates.handleShow),
        icon: <History />,
        text: 'Histórico',
        privilege: 'procesos.proceso.visualizar_historico',
      },
      {
        onClick: () => handleClick(currentDocsStates.handleShow),
        icon: <DescriptionOutlined />,
        text: 'Documentos Vigentes',
        privilege: 'procesos.proceso.visualizar_documentos_vigentes',
      },
      {
        onClick: () => handleClick(basicDataStates.handleShow),
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
  const modals = [
    {
      title: 'Histórico',
      open: historicalStates.show,
      handleClose: historicalStates.handleShow,
      children: <HistoricalTaskList idProcess={idProcess} />,
    },
    {
      title: 'Datos básicos',
      open: basicDataStates.show,
      handleClose: basicDataStates.handleShow,
      children: <BasicDataInbox idProcess={idProcess} />,
    },
    {
      title: 'Documentos Vigentes',
      open: currentDocsStates.show,
      handleClose: currentDocsStates.handleShow,
      children: <CurrentDocumentsInbox idProcess={idProcess} />,
    },
    {
      title: 'Gestión',
      open: management.show,
      handleClose: management.handleShow,
      children: (
        <AuditManagement
          idProcessModal={idProcess}
          onSuccFinMan={management.handleShow}
        />
      ),
    },
  ]

  const columns = [
    {
      field: 'identifier',
      headerName: 'Número',
      minWidth: 150,
      renderCell: (params) => {
        return `${params?.process?.identifier ?? ''}`
      },
    },
    {
      field: 'processTypeName',
      headerName: 'Tipo de proceso',
      minWidth: 150,
      renderCell: (params) => {
        return `${params?.process?.ProcessType?.name ?? ''}`
      },
    },
    {
      field: 'code',
      headerName: 'Código',
      minWidth: 150,
      renderCell: (params) => {
        return `${params?.process?.processData.taxPayerData.codigo ?? ''}`
      },
    },
    {
      field: 'contribuyente',
      headerName: 'Contribuyente',
      minWidth: 200,
      renderCell: (params) => {
        const newString = params?.process?.processData?.taxPayerData?.nombreProp
          ? params?.process?.processData?.taxPayerData?.nombreProp.split(',').join(',\n')
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
      renderCell: (params) => {
        const newString = `${formatToLocaleDate(params?.process?.lastActivityData?.createdAt)}${
          params?.process?.lastActivityData?.taskName ?? ''
            ? ` - ${params?.process?.lastActivityData?.taskName ?? ''}`
            : ''
        }`
        return newString
      },
    },
    {
      field: 'options',
      headerName: '',
      pinned: 'right',
      width: 60,
      renderCell: (params) => {
        const options = rowOptions({
          idProcess: params?.process?.id,
        })
        return <RowMenu rowOptions={options} />
      },
    },
  ]
  return { columns, modals }
}

export const updateState = (filterName, setValue, filter, select) => {
  if (filterName === 'status') {
    setValue(`${filter?.id ?? ''}.name`, select?.[0]?.value)
    return
  }
  setValue(`${filter?.id ?? ''}.name`, '')
}
