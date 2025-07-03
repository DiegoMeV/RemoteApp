import { currentYear, useGetAnalytics } from '@/lib'

export const dataSummary = (activitiesValues) => [
  {
    number: activitiesValues?.criticalCount ?? '',
    title: 'Tareas prioritarias',
    bgTW: 'bg-gradient-to-r from-[#FFD6E7] to-[#EF1E69]',
  },
  {
    number: activitiesValues?.warningCount ?? '',
    title: 'Tareas a tiempo',
    bgTW: 'bg-gradient-to-r from-[#F8D5A1] to-[#FAB043]',
  },
  {
    number: activitiesValues?.pendingCount ?? '',
    title: 'Tareas pedientes',
    bgTW: 'bg-gradient-to-r from-[#B7F0BD] to-[#25C147]',
  },
]

export const optionsColumn = (dark, labels) => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: labels,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      innerHeight: '20%',
    },
  },
  theme: {
    mode: dark === 'dark' ? 'dark' : 'light',
    monochrome: {
      enabled: true,
      shadeTo: 'dark',
      shadeIntensity: 0.6,
    },
  },
  dataLabels: {
    enabled: false,
  },
})

export const optionsBar = (dark, labels) => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: labels,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  theme: {
    mode: dark === 'dark' ? 'dark' : 'light',
    monochrome: {
      enabled: true,
      shadeTo: 'dark',
      shadeIntensity: 0.6,
    },
  },
})

export const arrayProcecessInfo = (processesStatus, processesByMonth, dark) => {
  const labelsProcecessByStatus = processesStatus?.map((item) => item?.label ?? '') || []
  const seriesProcecessByStatus = processesStatus?.map((item) => item?.count ?? '') || []
  const labelsProcecessByMonth = processesByMonth?.map((item) => item?.[0] ?? '') || []
  const seriesProcecessByMonth = processesByMonth?.map((item) => item?.[1] ?? '') || []

  return [
    {
      title: 'Procesos por estado',
      options: optionsBar(dark, labelsProcecessByStatus),
      series: [
        {
          name: 'Procesos',
          data: seriesProcecessByStatus,
        },
      ],
    },
    {
      title: `Procesos registrados en el periodo ${currentYear ?? ''}`,
      options: optionsColumn(dark, labelsProcecessByMonth),
      series: [
        {
          name: 'Procesos',
          data: seriesProcecessByMonth,
          color: '#25C147',
        },
      ],
    },
  ]
}

export const useGetsPersonalInfo = (year) => {
  const {
    data: activitiesValues,
    isLoading: isLoadingActivities,
    isError: isErrorActivities,
  } = useGetAnalytics({ type: 'activities-by-priority' })

  const {
    data: processesStatus,
    isLoading: isloadingProcecessStatus,
    isError: isErrorProcecessStatus,
  } = useGetAnalytics({ type: 'processes-by-status' })

  const {
    data: processesByMonth,
    isLoading: isLoadingProcecessByMonth,
    isError: isErrorProcecessByMonth,
  } = useGetAnalytics({ type: `processes-by-created-month?createdAtYear=${year}` })

  const isLoading = isLoadingActivities || isloadingProcecessStatus || isLoadingProcecessByMonth
  const isErrorProcecess = isErrorProcecessStatus || isErrorProcecessByMonth

  return {
    activitiesValues,
    processesStatus,
    processesByMonth,
    isLoading,
    isErrorActivities,
    isErrorProcecess,
  }
}
