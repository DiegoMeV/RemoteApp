import { statusProcessServices } from '@/app/builder/[idProcessType]/hooks'
import { RowMenu } from '@/lib'
import { formatToLocaleDate } from '@/libV4'
import { DescriptionOutlined, History, InfoOutlined, NoteAltOutlined } from '@mui/icons-material'

const rowOptions = ({
  openModals,
  idProcess,
  setIdProcess,
  identifier,
  setIdentifier,
  navigate,
}) => {
  const { handleShowHistorical, handleShowCurrentDocs, handleShowBasicData } = openModals

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
  ]
}

export const columnsFilesFiscal = ({ openModals, setIdProcess, setIdentifier, navigate }) => {
  return [
    {
      field: 'identifier',
      headerName: 'Nro. de expediente',
      width: 200,
    },
    {
      field: 'processTypeName',
      headerName: 'Tipo de proceso',
      width: 200,
      renderCell: (data) => {
        return `${data?.processTypeName ?? ''}`
      },
    },
    {
      field: 'contribuyente',
      headerName: 'Contribuyente',
      width: 250,
      renderCell: (data) => {
        return `${data?.taxPayerData?.nombreProp ?? ''}`
      },
    },
    {
      field: 'lastActivityData',
      headerName: 'Ultima gestion realizada',
      width: 250,
      renderCell: (data) => {
        const createdAt = data?.lastActivityData?.createdAt
          ? `${formatToLocaleDate(data?.lastActivityData?.createdAt ?? '')} - `
          : ''

        return `${createdAt}${data?.lastActivityData?.taskName ?? ''}`
      },
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
          identifier: data?.identifier,
          setIdentifier,
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

export const inputsFilters = () => {
  return [
    {
      label: 'Tipo de proceso',
      name: 'idProcessType',
      type: 'autocompleteRequest',
      queryRequest: {
        querySearch: 'searchString',
        additionalQuery: '&appIdentifier=FISCALIZACION',
      },
      requestprops: {
        isCompanyRequest: true,
        baseKey: 'urlFiscalizacion',
        url: `/process-types`,
        requestOnInput: true,
        counter: 'count',
      },
      vlprops: {
        usePagination: true,
        hasQuerySearch: true,
        shouldClose: true,
        columns: [
          {
            dataIndex: 'name',
            title: 'Nombre',
          },
          {
            dataIndex: 'description',
            title: 'Descripción',
          },
        ],
      },
      autocompleteprops: {
        getOptionLabel: (option) => `${option?.name ?? ''}`,
      },
      validate: false,
      className: 'col-span-12',
    },
    {
      label: 'Estado de proceso',
      name: 'status',
      type: 'select',
      options: statusProcessServices?.fiscal ?? [],
      className: 'col-span-12',
    },
    {
      label: 'Identificador programa de fiscalización',
      name: 'inspectionPlanIdentifier',
      type: 'text',
      className: 'col-span-12',
    },
  ]
}
