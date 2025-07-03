import { useInfoInputs } from '@/lib'
import ViewFormComponent from '../ViewFormComponent'
import { inputsList } from './funcs'
import { useState } from 'react'

const ContactInfoComponent = ({
  control,
  setValue,
  idCompany,
  unregister,
  getValues,
  isEditing,
}) => {
  const columnsModal = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      flex: 1,
    },
  ] //TODO: Change to dynamic columns if it needIT
  const [provinceSelected, setProvinceSelected] = useState()
  const department = useInfoInputs({
    qry: '/generic-crud/departamentos',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    searchQry: 'nombre',
  })
  const city = useInfoInputs({
    qry: provinceSelected ? `/generic-crud/municipios` : '/generic-crud/municipios',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    qryParams: provinceSelected?.id ? `id_departamento=${provinceSelected?.id}` : null,
    searchQry: `nombre`,
  })
  const inputList = inputsList({
    department,
    city,
    setProvinceSelected,
    unregister,
    setValue,
    getValues,
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

export default ContactInfoComponent
