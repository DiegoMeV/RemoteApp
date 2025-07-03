import { useInfoInputs, useMutationDynamicBaseUrl } from '@/lib'
import ViewFormComponent from '../ViewFormComponent'
import { inputsList } from './funcs'
import { useCallback, useEffect, useState } from 'react'

const AcademicInfoComponent = ({ control, setValue, unregister, watch, idCompany }) => {
  const defaultSchool = watch('school')
  const [titleSelect, setTitleSelect] = useState()
  const [schoolSelected, setSchoolSelected] = useState({ id: defaultSchool })

  const school = useInfoInputs({
    qry: '/generic-crud/instituciones_educativas',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    searchQry: 'nombre',
  })
  let career = useInfoInputs({
    qry: '/generic-crud/titulos_educativos',
    baseKey: 'urlApps',
    idCompanyUrl: idCompany,
    qryParams: schoolSelected?.id ? `id_institucion_educativa=${schoolSelected?.id}` : null,
    searchQry: `nombre`,
    enabled: schoolSelected?.id ? true : false,
  })

  const [careerWithCity, setCareerWithCity] = useState()

  const { mutateAsync: getCities } = useMutationDynamicBaseUrl({
    url: `/generic-crud/municipios`,
    isCompanyRequest: true,
    idCompany: idCompany,
    baseKey: 'urlApps',
    method: 'get',
    companyId: idCompany,
  })
  const getCitiesByCareer = useCallback(async () => {
    if (!career?.dataList?.data) return
    const cities = await Promise.all(
      career?.dataList?.data?.map(async (element) => {
        const response = await getCities({ qry: `/${element.municipio}` })
        return { ...element, nombreMunicipio: response?.data?.[0]?.nombre ?? '' }
      })
    )

    setCareerWithCity(cities)
  }, [career?.dataList?.data, getCities])

  useEffect(() => {
    getCitiesByCareer()
  }, [career.dataList, getCitiesByCareer])

  const inputList = inputsList({
    school,
    career: { ...career, dataList: { data: careerWithCity } },
    setSchoolSelected,
    setValue,
    unregister,
    setTitleSelect,
    titleSelect,
    schoolSelected,
    getCities,
  })
  return (
    <ViewFormComponent
      inputList={inputList}
      setValue={setValue}
      control={control}
    />
  )
}

export default AcademicInfoComponent
