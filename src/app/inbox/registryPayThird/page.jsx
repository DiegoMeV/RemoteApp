import { useGetAllParams, useMutationDynamicBaseUrl } from '@/lib'
import { useForm } from 'react-hook-form'
import ViewRegistryPays from '../../../lib/components/registryPays/ViewRegistryPays'
import { useColumnsTable } from './funcs'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'
import { useState } from 'react'

const RegistryPayThird = () => {
  const apiRef = useGridApiRef()
  const params = useGetAllParams()
  const [activeStep, setActiveStep] = useState(0)
  const [summaryInfo, setSummaryInfo] = useState()
  const idGroup = params?.idGroup ?? null
  const form = useForm()
  const { mutateAsync: createProcess } = useMutationDynamicBaseUrl({
    url: '/processes',
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    onSuccess: (e) => {
      form.reset()
      setSummaryInfo(e)
      setActiveStep(activeStep + 1)
    },
  })
  const onSubmit = (data) => {
    if (data.rows.length === 0) {
      toast.error('Debe agregar mínimo un tercero.')
      return
    }
    const dataActivity = {
      idProcessType: data.typeProcess?.id,
      idOfficeOrigin: data.office?.id,
      processData: {
        thirdData: data?.rows?.[0]?.third,
      },
    }
    createProcess({ body: dataActivity })
  }
  const columnsTable = useColumnsTable({ form, apiRef })
  const props = {
    apiRef,
    activeStep,
    form,
    onSubmit,
    idGroup,
    title: 'Registro de terceros',
    columnsTable,
    requiredOption: 'third',
    infoProcess: summaryInfo,
    labelButton: 'Agregar tercero',
  }
  return <ViewRegistryPays {...props} />
}

export default RegistryPayThird
