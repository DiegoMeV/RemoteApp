import { inputsList } from './funcs'
import ViewFormComponent from '../ViewFormComponent'
import { useInfoInputs } from '@/lib'
import { useState } from 'react'

const PersonalInfoComponent = ({ control, setValue, idCompany, unregister, watch, isEditing }) => {
  const provinceSelectedDef = { id: watch('expeditionProvince') }
  const provinceBornSelectedDef = { id: watch('bornProvince') }
  const [provinceSelected, setProvinceSelected] = useState(provinceSelectedDef)
  const [provinceBornSelected, setProvinceBornSelected] = useState(provinceBornSelectedDef)
  const columnsModal = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      flex: 1,
    },
  ]
  const bornProvince = useInfoInputs({
    qry: '/generic-crud/departamentos',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    searchQry: 'nombre',
  })
  const expeditionDepartment = useInfoInputs({
    qry: '/generic-crud/departamentos',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    searchQry: 'nombre',
  })
  const expeditionCity = useInfoInputs({
    qry: '/generic-crud/municipios',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    qryParams: provinceSelected?.id ? `id_departamento=${provinceSelected?.id}` : null,
    searchQry: 'nombre',
  })
  const bornCity = useInfoInputs({
    qry: '/generic-crud/municipios',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    qryParams: provinceBornSelected?.id ? `id_departamento=${provinceBornSelected?.id}` : null,
    searchQry: `nombre`,
  })
  const inputList = inputsList({
    expeditionDepartment,
    expeditionCity,
    bornCity,
    bornProvince,
    setProvinceSelected,
    setProvinceBornSelected,
    unregister,
    setValue,
    watch,
    isEditing,
  })
  return (
    <ViewFormComponent
      columnsModal={columnsModal}
      inputList={inputList}
      setValue={setValue}
      control={control}
    />
  )
}

export default PersonalInfoComponent
