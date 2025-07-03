import { useInfoInputs } from '@/lib'
import { inputsFormFilter } from './funcs'
import { useEffect } from 'react'
import ViewFilters from '../../../ViewFilters'

const Filters = ({ setCenter, setZoom, form, onSubmit, loading }) => {
  const provinceSelected = form.watch('departamento')
  const citiesSelected = form.watch('municipio')
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
  const province = useInfoInputs({ qry: '/departamento', baseKey: 'urlCgr' })
  const cities = useInfoInputs({
    qry: `/municipios`,
    baseKey: 'urlCgr',
    qryParams: provinceSelected ? `departamento_id=${provinceSelected.id}` : '',
  })
  const coordinator = useInfoInputs({
    qry: '/miembrosEquiposUri',
    baseKey: 'urlCgr',
    qryParams: 'tipo=COORDINADOR',
  })
  const entities = useInfoInputs({
    qry: '/analytics/entidadLov',
    baseKey: 'urlCgr',
  })
  const inputList = inputsFormFilter({
    ari,
    province,
    cities,
    coordinator,
    entities,
  })

  const props = {
    form,
    inputList,
    onSubmit,
    loadingExecutiveInfo: loading,
  }
  return <ViewFilters {...props} />
}

export default Filters
