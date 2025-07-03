import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

// Loading, useGlobalVariables
import { titleBlock } from './constants'
import { MasterSection, DetailSection } from './components'
import { BackdropLoading, BasicTitle, useQueryDynamicApi } from '@/libV4'

const EditAgreements = () => {
  // const getGlobalVariables = useGlobalVariables()
  // const { nit_compania, ...globalVariables } = getGlobalVariables({})

  const location = useLocation()

  const queryParams = new URLSearchParams(location?.search)

  const paramsModule = queryParams.get('module')
  const idAgreement = queryParams.get('agreement')
  const isNew = queryParams.get('isNew')

  // keyform para guardar los datos del formulario
  // const keyForm = 'acuerdos_pagos_vehicular'

  const {
    data: agreement,
    isFetching: loading,
    refetch,
  } = useQueryDynamicApi({
    baseKey: 'urlRentasApi',
    isCompanyRequest: true,
    enabled: !!idAgreement && !isNew,
    url: `/convenios/info-convenio/${idAgreement}`,
  })

  const form = useForm({})

  const [valueTab, setValueTab] = useState(0)

  const handleChangeTab = (_, newValue) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    if (!!idAgreement && !isNew) {
      const data = agreement?.data?.[0] ?? {}
      form?.reset(data)
    }
  }, [agreement])

  if (!isNew && !idAgreement) return <></>

  return (
    <article className='flex flex-col overflow-auto pb-2'>
      <BasicTitle
        backpath={`/applications/staticForms/agreements/listAgreements?module=${paramsModule}`}
        title={titleBlock[paramsModule] ?? titleBlock.default}
      />
      <div className='backgroundGray1 overflow-auto flex flex-col gap-4 p-4'>
        <BackdropLoading loading={loading} />
        {/* {true && <TextAgreement />} */}
        <MasterSection
          form={form}
          module={paramsModule}
          agreement={agreement}
          refetch={refetch}
          isNew={isNew}
        />
        {idAgreement && (
          <DetailSection
            valueTab={valueTab}
            idAgreement={idAgreement}
            handleChangeTab={handleChangeTab}
          />
        )}
      </div>
    </article>
  )
}

export default EditAgreements
