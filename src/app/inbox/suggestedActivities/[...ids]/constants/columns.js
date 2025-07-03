import { formatToLocaleDate } from '@/lib'
export const columnsSuggestedActivities = [
  {
    field: 'nameStage',
    headerName: 'Nombre de la etapa',
    minWidth: 300,
    valueGetter: (params) => {
      return `${params?.row?.ParentTask?.name ?? ''}`
    },
  },
  {
    field: 'name',
    headerName: 'Nombre de la actividad',
    minWidth: 300,
    valueGetter: (params) => `${params.value}`,
  },
  {
    field: 'user',
    headerName: 'Usuario responsable',
    minWidth: 300,
    valueGetter: (params) => `${params.value}`,
  },
]

export const columnsNextActivities = [
  {
    field: 'nameStage',
    headerName: 'Nombre de la etapa',
    minWidth: 400,
    valueGetter: (params) => {
      return `${params?.row?.ParentTask?.name ?? ''}`
    },
  },
  {
    field: 'name',
    headerName: 'Nombre de la actividad',
    minWidth: 400,
    valueGetter: (params) => `${params.value}`,
  },
  {
    field: 'user',
    headerName: 'Usuario responsable',
    minWidth: 300,
    valueGetter: (params) => {
      return `${params?.row?.lastActivity?.assignedToData?.firstName ?? ''} ${
        params?.row?.lastActivity?.assignedToData?.lastName ?? ''
      }`
    },
  },
  // { TODO
  //   field: 'typeActivity',
  //   headerName: 'Tipo de actividad',
  //   minWidth: 300,
  //   valueGetter: (params) => `${params.value}`,
  // },
]

export const columnsManagedActivities = [
  {
    field: 'nameStage',
    headerName: 'Nombre de la etapa',
    width: 300,
    valueGetter: (params) => {
      return `${params?.row?.ParentTask?.name ?? ''}`
    },
  },
  {
    field: 'name',
    headerName: 'Nombre de la actividad',
    width: 300,
    valueGetter: (params) => `${params.value ?? ''}`,
  },
  {
    field: 'user',
    headerName: 'Usuario responsable ',
    width: 300,
    valueGetter: (params) => {
      return `${params?.row?.lastActivity?.assignedToData?.firstName ?? ''} ${
        params?.row?.lastActivity?.assignedToData?.lastName ?? ''
      }`
    },
  },
  // { TODO
  //   field: 'typeActivity',
  //   headerName: 'Tipo de actividad',
  //   minWidth: 300,
  //   valueGetter: (params) =>`${params.value}`,
  // },
  {
    field: 'lastManagementDate',
    headerName: 'Fecha de última gestión',
    width: 300,
    valueGetter: (params) => `${formatToLocaleDate(params?.row?.lastActivity?.completedAt)}`,
  },
]
