import { useGetAllParams, useMutationDynamicBaseUrl } from '@/lib'
import { useForm } from 'react-hook-form'
import ViewRegistryPays from '../../../lib/components/registryPays/ViewRegistryPays'
import { useColumnsTable } from './funcs'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'
import { useState } from 'react'

const RegistryContract = () => {
  const apiRef = useGridApiRef()
  const params = useGetAllParams()
  const [activeStep, setActiveStep] = useState(0)
  const [summaryInfo, setSummaryInfo] = useState()
  const idGroup = params?.idGroup ?? null
  const form = useForm()
  const { mutateAsync: createProcess, isPending: loadingCreateProcess } = useMutationDynamicBaseUrl(
    {
      url: '/processes',
      baseKey: 'urlProcess',
      isCompanyRequest: true,
      onSuccess: (e) => {
        form.reset()
        setSummaryInfo(e)
        setActiveStep(activeStep + 1)
      },
    }
  )
  const onSubmit = (data) => {
    if (data.rows.length === 0) {
      toast.error('Debe agregar mínimo un contrato.')
      return
    }
    const dataActivity = {
      idProcessType: data.typeProcess?.id,
      idOfficeOrigin: data.office?.id,
      processData: {
        contractData: data?.rows?.[0]?.contract,
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
    title: 'Registro de contratos',
    columnsTable,
    requiredOption: 'contract',
    infoProcess: summaryInfo,
    labelButton: 'Agregar contrato',
    loadingCreateProcess,
  }
  return <ViewRegistryPays {...props} />
}

export default RegistryContract
