import { useQueryDynamicApi } from '@/lib/api'
import { ChooseInput, ValueListGlobal, useBoolean } from '@/lib/ui'
import { useState } from 'react'
import { useSearch } from '../../searchTable'
import { columnsLawyers, optionsStepFive } from '../funcs'

const FormStepFive = ({ form, processInfo }) => {
  const idOffice = processInfo?.idOfficeOrigin
  const [requestType, setRequestType] = useState(
    processInfo?.processData?.additionalData?.requestType ?? 'remisiones'
  )
  // TODO : const [cursor, setCursor] = useState()
  // TODO : const [pageSize, setPageSize] = useState(50)
  const searchLawyers = useSearch()
  const modalLawyers = useBoolean()

  // TODO : const qry = buildQueryStringUserService(pageSize, cursor, searchLawyers.searchText)
  const {
    data: lawyers,
    isLoading,
    isError,
  } = useQueryDynamicApi({
    url: `/dependency/${idOffice}/roles/users?roleName=Rol Asignaci Tipo Solicitud&userName=${searchLawyers.searchText}`,
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    enabled: !!idOffice,
  })

  // TODO : const pagination = usePagination(lawyers, { setCursor, setPageSize }, isLoading)

  const handleChangeTypeRequest = (value) => {
    setRequestType(value)
    if (value === 'consultancy') {
      form.unregister('processData.additionalData.assignLawyer')
    }
  }

  const handleSetLawyer = (lawyerInfo, name) => {
    if (!lawyerInfo) {
      form.setValue(`processData.additionalData.${name ?? 'assignLawyer'}`, null)
      return
    }
    form.setValue(`processData.additionalData.${name ?? 'assignLawyer'}`, {
      id: lawyerInfo?.id,
      name: `${lawyerInfo?.firstName ?? ''} ${lawyerInfo?.lastName ?? ''}`,
    })
  }

  const lawyersOptions = { lawyers, searchLawyers, isLoading, isError, modalLawyers }

  const options = optionsStepFive(
    requestType,
    handleChangeTypeRequest,
    lawyersOptions,
    handleSetLawyer,
    processInfo
  )

  return (
    <>
      {options?.map((item, index) => (
        <ChooseInput
          key={index}
          item={item}
          control={form.control}
          setValue={form.setValue}
        />
      ))}

      <ValueListGlobal
        title='Abogados'
        openOptions={modalLawyers}
        searchOptions={searchLawyers}
        rows={lawyers?.data ?? []}
        loading={isLoading}
        selectedOption={(params) =>
          handleSetLawyer(
            params?.row,
            requestType === 'workshop' ? 'workshopManager' : 'assignLawyer'
          )
        }
        columns={columnsLawyers ?? []}
        // TODO : pagination={pagination}
      />
    </>
  )
}

export default FormStepFive
