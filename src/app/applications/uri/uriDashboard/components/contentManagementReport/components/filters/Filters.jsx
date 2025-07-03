import { useInfoInputs } from '@/lib'
import { inputsFormFilter } from './funcs'

import { useEffect } from 'react'
import ViewFilters from '../../../ViewFilters'

const Filters = ({ setCenter, setZoom, form, onSubmit, loadingExecutiveInfo }) => {
  const regionSelected = form.watch('region')
  const provinceSelected = form.watch('departamento')
  const citiesSelected = form.watch('municipio')
  useEffect(() => {
    form.setValue('departamento', null)
    form.setValue('municipio', null)
  }, [regionSelected, form])
  useEffect(() => {
    form.setValue('municipio', null)
  }, [provinceSelected, form])
  useEffect(() => {
    if (citiesSelected) {
      setCenter([citiesSelected.latitud, citiesSelected.longitud])
      setZoom(12)
    } else if (provinceSelected) {
      setCenter([provinceSelected.latitud, provinceSelected.longitud])
      setZoom(8)
    }
  }, [provinceSelected, citiesSelected, setCenter, setZoom])

  const ari = useInfoInputs({ qry: '/registroAri', baseKey: 'urlCgr' })
  const region = useInfoInputs({ qry: '/equiposUri', baseKey: 'urlCgr' })
  const province = useInfoInputs({
    qry: '/departamento',
    baseKey: 'urlCgr',
    qryParams: regionSelected ? `region_id=${regionSelected.id}` : '',
  })
  const cities = useInfoInputs({
    qry: `/municipios`,
    baseKey: 'urlCgr',
    qryParams: provinceSelected ? `departamento_id=${provinceSelected.id}` : '',
  })
  const contractor = useInfoInputs({
    qry: `/analytics/contratanteEjecLov`,
    baseKey: 'urlCgr',
    qryParams: provinceSelected ? `departamento_id=${provinceSelected.id}` : '',
  })

  const inputList = inputsFormFilter({
    ari,
    province,
    cities,
    region,
    contractor,
  })
  const props = {
    form,
    inputList,
    onSubmit,
    loadingExecutiveInfo,
  }
  return <ViewFilters {...props} />
}

export default Filters
