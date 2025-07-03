import { useForm } from 'react-hook-form'
import { MasterSection } from './components/Master'
import { DetailSection } from './components/Detail'
import { CommitmentSection } from './components'
import { useGetAllParams } from '@/libV4'
import { useGlobalVaribles } from '@/lib'
import { useFormSubmitters, usePushDataForm, useTipoCompptalQuery } from './hooks'
import { masterFormFields } from './funcs'
import { useState } from 'react'

const ComprobantePPTAL = () => {
  const { compptalType, nrodoc_orden, prefijo_orden } = useGetAllParams()
  const [newPptal, setNewPptal] = useState(false)
  const { control, setValue, trigger, getValues } = useForm()

  const blockMaster = 'comprobantepptal_w'
  const formComponent = 'COMP_64'

  const getGlobalVariables = useGlobalVaribles()
  const { nit_compania, ...globalVariables } = getGlobalVariables({})
  const inputs = masterFormFields(setValue, nit_compania, compptalType)

  const division = globalVariables?.additionalUserInfo?.division

  const { responseQuery: dataComprobantepptal_w, isPendingQuery } = useTipoCompptalQuery({
    prefijo_orden,
    compptalType,
    nit_compania,
    nrodoc_orden,
    setValue,
    setNewPptal,
    division,
  })

  const { pushDataForm, isPendingPushDataForm } = usePushDataForm({ formComponent })
  const { onSubmitedMasterSection } = useFormSubmitters({
    trigger,
    getValues,
    setValue,
    blockMaster,
    inputs,
    pushDataForm,
    nit_compania,
    newPptal,
    setNewPptal,
    compptalType,
  })

  return (
    <div className='flex flex-col bg-backgroundGray1-light max-h-[calc(100vh-100px)] overflow-auto pb-2'>
      <MasterSection
        onSubmitedMasterSection={onSubmitedMasterSection}
        inputs={inputs}
        control={control}
        isPendingQuery={isPendingQuery}
        isPendingPushDataForm={isPendingPushDataForm}
      />
      <CommitmentSection
        nit_compania={nit_compania}
        getValues={getValues}
        pushDataForm={pushDataForm}
        newPptal={newPptal}
        isPendingPushDataForm={isPendingPushDataForm}
        formComponent={formComponent}
      />
      <DetailSection
        nit_compania={nit_compania}
        compptalType={compptalType}
        getValues={getValues}
        pushDataForm={pushDataForm}
        dataComprobantepptal_w={dataComprobantepptal_w}
        newPptal={newPptal}
        isPendingPushDataForm={isPendingPushDataForm}
        formComponent={formComponent}
      />
    </div>
  )
}

export default ComprobantePPTAL
