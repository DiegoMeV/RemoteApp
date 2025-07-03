import { formatMoney, formatToUTCDate } from '@/libV4'

export const columnsDetailPUAtoliq = [
  {
    field: 'secuencia',
    headerName: 'Secuencia',
    pinned: 'left',
    width: 100,
  },
  {
    field: 'identificacion',
    headerName: 'Cédula',
    pinned: 'left',
    width: 100,
  },
  {
    field: 'nomempleado',
    headerName: 'Nombre',
    pinned: 'left',
    width: 200,
  },
  {
    field: 'ing',
    headerName: 'Ing',
    width: 50,
    align: 'center',
  },
  {
    field: 'ret',
    headerName: 'Ret',
    width: 50,
    align: 'center',
  },
  {
    field: 'tde',
    headerName: 'Tde',
    width: 50,
    align: 'center',
  },
  {
    field: 'tae',
    headerName: 'Tae',
    width: 50,
    align: 'center',
  },
  {
    field: 'tdp',
    headerName: 'Tdp',
    width: 50,
    align: 'center',
  },
  {
    field: 'tap',
    headerName: 'Tap',
    width: 50,
    align: 'center',
  },
  {
    field: 'vsp',
    headerName: 'Vsp',
    width: 50,
    align: 'center',
  },
  {
    field: 'vte',
    headerName: 'Vte',
    width: 50,
    align: 'center',
  },
  {
    field: 'vst',
    headerName: 'Vst',
    width: 50,
    align: 'center',
  },
  {
    field: 'sin',
    headerName: 'Sin',
    width: 50,
    align: 'center',
  },
  {
    field: 'lge',
    headerName: 'Lge',
    width: 50,
    align: 'center',
  },
  {
    field: 'lma',
    headerName: 'Lma',
    width: 50,
    align: 'center',
  },
  {
    field: 'vac',
    headerName: 'Vac',
    width: 50,
    align: 'center',
  },
  {
    field: 'avp',
    headerName: 'Avp',
    width: 50,
    align: 'center',
  },
  {
    field: 'vct',
    headerName: 'Vct',
    width: 50,
    align: 'center',
  },
  {
    field: 'irp',
    headerName: 'D. IRP',
    width: 200,
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aportepen',
    headerName: 'AP. Pensión',
    align: 'right',
    width: 200,
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aportevolpenemp',
    headerName: 'AP. Vol Emp',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aportevolpenpat',
    headerName: 'Cot. Vol Pat',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'totaportepen',
    headerName: 'Tot. Ap Pensión',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aportefsp',
    headerName: 'Aportes fsp Solidaria',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aportefsp2',
    headerName: 'Aportes fsp Subsist > 4',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'fsp2',
    headerName: 'Aportes fsp Subsist > 10',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aporteeps',
    headerName: 'Aportes salud',
    align: 'right',
    width: 200,
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'upcadicional',
    headerName: 'UPC adicional',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'valorieg',
    headerName: 'Val. INC. EGM',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'valorlm',
    headerName: 'Valor licencia maternidad',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aportearp',
    headerName: 'Cot. Arp',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aporteccf',
    headerName: 'Aporte CCF',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aportesena',
    headerName: 'Aporte SENA',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aporteicbf',
    headerName: 'Aporte ICBF',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aporteesap',
    headerName: 'Aporte ESAP',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'aporteits',
    headerName: 'Aporte ITS',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'fecha_ing',
    headerName: 'F. Ing',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ret',
    headerName: 'F. Ret',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_vsp',
    headerName: 'F. Inicio Vsp',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_sln',
    headerName: 'F. Inicio Sln',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_fin_sln',
    headerName: 'F. Fin Sln',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_ige',
    headerName: 'F. Inicio Ige',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_fin_ige',
    headerName: 'F. Fin Ige',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_lma',
    headerName: 'F. Inicio Lma',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_fin_lma',
    headerName: 'F. Fin Lma',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_vac',
    headerName: 'F. Inicio Vac',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_fin_vac',
    headerName: 'F. Fin Vac',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_lr',
    headerName: 'F. Inicio Lr',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_fin_lr',
    headerName: 'F. Fin Lr',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_vct',
    headerName: 'F. Inicio Vct',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_fin_vct',
    headerName: 'F. Fin Vct',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_ini_irl',
    headerName: 'F. Inicio Irl',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'fecha_fin_irl',
    headerName: 'F. Fin Irl',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
  {
    field: 'num_horas_lab',
    headerName: 'Horas Lab',
    width: 200,
  },
  {
    field: 'val_mesada',
    headerName: 'Valor Mesada',
    width: 200,
    align: 'right',
    renderCell: (_, data) => {
      return formatMoney(data)
    },
  },
  {
    field: 'fecha_rad_ext',
    headerName: 'F. Rad Ext',
    width: 200,
    renderCell: (_, data) => {
      return formatToUTCDate(data)
    },
  },
]
