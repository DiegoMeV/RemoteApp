import { useInfoInputs } from '@/lib'
import { ViewFilterModelReport } from './view'
// import { useInfoInputs } from './funcs'
import { Typography } from '@mui/material'
import { useEffect } from 'react'

export const FilterModelReport = ({ form, onSubmit }) => {
  const regionSelected = form.watch('region')
  const provinceSelected = form.watch('departamento')
  const model = useInfoInputs({ qry: '/modelosAlertas', baseKey: 'urlCgr' })
  const contractor = useInfoInputs({ qry: '/terceros', baseKey: 'urlCgr' })
  const alerts = useInfoInputs({ qry: '/alertas', baseKey: 'urlCgr' })
  const addressee = useInfoInputs({ qry: '/hierarchy?rowsPerPage=10', baseKey: 'urlUsers' })
  const category = useInfoInputs({ qry: '/categoriaModelo', baseKey: 'urlCgr' })
  const subContractor = useInfoInputs({ qry: '/terceros', baseKey: 'urlCgr' })
  const regions = useInfoInputs({ qry: '/region', baseKey: 'urlCgr' })
  const provience = useInfoInputs({
    qry: '/departamento',
    baseKey: 'urlCgr',
    qryParams: regionSelected ? `region_id=${regionSelected.id}` : '',
  })
  const citie = useInfoInputs({
    qry: '/municipios',
    baseKey: 'urlCgr',
    qryParams: provinceSelected ? `departamento_id=${provinceSelected.id}` : '',
  })
  const criterionRisk = useInfoInputs({ qry: '/criterios', baseKey: 'urlCgr' })
  const controlSubject = useInfoInputs({ qry: '/entes', baseKey: 'urlCgr' })
  useEffect(() => {
    form.setValue('departamento', null)
    form.setValue('municipio', null)
  }, [form, regionSelected])
  useEffect(() => {
    form.setValue('municipio', null)
  }, [form, provinceSelected])

  const columnsModal = [
    {
      title: 'Nombre',
      field: 'nombre',
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.nombre ? (
            <Typography>{params.row.nombre}</Typography>
          ) : (
            <Typography>{`${params.row.nombre_1 ?? ''} ${params.row.apellido_1 ?? ''}  ${
              params.row.identificador ?? ''
            } `}</Typography>
          )}
        </>
      ),
    },
  ]
  return (
    <ViewFilterModelReport
      control={form.control}
      handleSubmit={form.handleSubmit}
      setValue={form.setValue}
      reset={form.reset}
      onSubmit={onSubmit}
      columnsModal={columnsModal}
      model={model}
      contractor={contractor}
      subContractor={subContractor}
      alerts={alerts}
      addressee={addressee}
      category={category}
      criterionRisk={criterionRisk}
      regions={regions}
      province={provience}
      citie={citie}
      controlSubject={controlSubject}
    />
  )
}
