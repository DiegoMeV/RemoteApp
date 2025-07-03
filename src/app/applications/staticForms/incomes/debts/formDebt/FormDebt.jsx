import { useForm } from 'react-hook-form'
import { ViewFormDebt } from './views'
import { useQueryDynamicApi } from '@/libV4'
import { useLocation } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

const FormDebt = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location?.search)
  const codigo = queryParams.get('codigo')

  const { data: infoVehicles, isFetching } = useQueryDynamicApi({
    baseKey: 'urlPayments',
    url: `/vehicular?codigo=${codigo}`,
  })
  const dataForm = useMemo(() => infoVehicles?.data?.[0] || {}, [infoVehicles])
  const form = useForm()

  useEffect(() => {
    if (dataForm) {
      form.reset({
        ...dataForm,
      })
    }
  }, [dataForm, form])

  return (
    <ViewFormDebt
      form={form}
      dataForm={dataForm}
      isPendingQuery={isFetching}
    />
  )
}

export default FormDebt
