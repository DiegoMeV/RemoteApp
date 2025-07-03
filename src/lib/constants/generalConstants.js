export const idElementTypeTaskList = {
  idElementTypeCommon: '483050bf-059f-4ac8-904d-261a5d7cd84f',
  idElementTypeReview: 'a1d38351-c82a-49d0-9548-ac6b7fcf7cb6',
  idElementTypeClose: '8a87ab97-7df0-420c-8e1d-a03b5d7a19f4',
}

export const idTipoVista = {
  prevWorkFlow: 'prevWorkFlow',
  activatesWorkFlow: 'activateWorkFlow',
}

export const message = {
  noHaveElements: 'We have found no elements',
  taskClose: 'Al llegar a la actividad de cierre el proceso se dará por finalizado automaticamente',
}

export const tipoDocumento = {
  process: 'PROCESS',
  template: 'DOCUMENT_TEMPLATE',
}
export const basicUrl =
  import.meta.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://portal.dev.synchrox.com/'

export const optionsDonutIndicators = {
  series: [44, 55, 41, 17, 15, 30],
  chart: {
    width: 380,
    type: 'donut',
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
      donut: {
        labels: {
          show: true,
          total: {
            label: 'Solicitudes en total',
            show: true,
          },
        },
      },
    },
  },
  labels: [
    'Baja(1-2 días)',
    'Medio(6-8 días)',
    'Alta(9-15 días)',
    'Alta 2(16-24 días)',
    'Alta 3(+25 días)',
  ],
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: 'gradient',
  },
  legend: {
    formatter: function (val, opts) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
    },
    position: 'bottom',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}
