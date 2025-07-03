import { useGetAllParams, useMutationDynamicBaseUrl } from '@/lib'
import { useForm } from 'react-hook-form'
import ViewRegistryPays from '../../../lib/components/registryPays/ViewRegistryPays'
import { useColumnsTable } from './funcs'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import toast from 'react-hot-toast'
import { useState } from 'react'

const ContractualProcessPay = () => {
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
      idParentProcess: data?.rows?.[0]?.processParent?.id,
      idProcessType: data.typeProcess?.id,
      idOfficeOrigin: data.office?.id,
    }
    createProcess({ body: dataActivity })
  }

  const columnsTable = useColumnsTable({ apiRef })

  const props = {
    apiRef,
    activeStep,
    infoProcess: summaryInfo,
    form,
    onSubmit,
    idGroup,
    title: 'Pagos a contratos',
    columnsTable,
    requiredOption: 'processParent',
    labelButton: 'Asociar proceso',
    loadingCreateProcess,
  }
  return <ViewRegistryPays {...props} />
}

export default ContractualProcessPay
