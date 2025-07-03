import React from 'react'
import { Typography, Grid, Divider } from '@mui/material'
import Chart from 'react-apexcharts'
const InfoInquiry = () => {
  const totalDias = 21
  const diasTranscurridos = 10
  const porcentaje = Math.round((diasTranscurridos / totalDias) * 100)

  const chartOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -10,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '60%' },
        track: {
          background: '#e0e0e0',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '20px',
            formatter: function () {
              return `${diasTranscurridos} / ${totalDias} días`
            },
          },
        },
      },
    },
    labels: ['Tiempo transcurrido'],
    colors: ['#2e7d32'],
  }

  const chartSeries = [porcentaje]
  const infoItems = [
    { label: 'Tipo de documento', value: 'Queja' },
    { label: 'Usuario', value: 'Anónimo' },
    { label: 'Estado', value: 'En trámite' },
    { label: 'Fecha radicado', value: '2025-05-15 14:43:17' },
    { label: 'Dirección', value: 'N/A' },
    { label: 'Asunto', value: 'Quiero que puedan realizar un' },
    { label: 'Municipio', value: 'N/A' },
  ]
  const groupedItems = []
  for (let i = 0; i < infoItems.length; i += 3) {
    groupedItems.push(infoItems.slice(i, i + 3))
  }

  return (
    // DATOS BASICOS DEL DOCUMENTO

    <div className='p-4 max-w-4xl mx-auto'>
      <Typography
        variant='customTitle'
        align='center'
      >
        Información del documento con número de radicado <strong>918291839</strong>
      </Typography>
      <div className='my-8'>
        {groupedItems.map((group, rowIndex) => (
          <Grid
            container
            key={rowIndex}
            className={rowIndex % 2 === 0 ? 'backgroundGray1' : 'bg-white'}
          >
            {group.map((item, index) => (
              <Grid
                item
                xs={4}
                key={index}
                p={1}
              >
                <Typography color='secondary'>
                  <strong>{item.label}:</strong> {item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
      <Divider sx={{ height: '2px', backgroundColor: 'gray', margin: '16px 0' }} />

      {/* LISTADO DE ANEXOS DEL DOCUMENTO */}

      <Typography
        variant='customTitle'
        align='center'
      >
        Listado de anexos
      </Typography>
      {/* table to display the attachments */}
      <Typography
        variant='body2'
        color='textSecondary'
        my={4}
      >
        No hay anexos disponibles para este documento.
      </Typography>
      <Divider sx={{ height: '2px', backgroundColor: 'gray', margin: '16px 0' }} />

      {/* ESTADO DEL DOCUMENTO */}

      <Typography
        variant='customTitle'
        align='center'
      >
        Estado del documento
      </Typography>
      <div className='flex justify-center mt-2'>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type='radialBar'
          width={250}
        />
      </div>
      <div className='flex justify-center text-sm text-gray-600 mt-2 space-x-4'>
        <div>
          <span className='inline-block w-3 h-3 bg-gray-400 mr-1'></span>Tiempo de trámite legal
        </div>
        <div>
          <span className='inline-block w-3 h-3 bg-green-700 mr-1'></span>Tiempo de trámite que
          lleva su proceso
        </div>
      </div>
    </div>
  )
}

export default InfoInquiry
