import {
  ChartContainer,
  ChooseInput,
  ClassicIconButton,
  ValueListGlobal,
  baseUrls,
  formatDateForTextfield,
  useInfoInputs,
  useQueryDynamicApi,
} from '@/lib'
import { Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { modalsOptions } from './funcs'
import { FormatClear } from '@mui/icons-material'
import { useEffect, useState } from 'react'

const FormFiltersIndicators = ({ filteringData, setInfoCharts }) => {
  const { control, handleSubmit, setValue, reset } = useForm()
  const lovAnalyst = useInfoInputs({
    qry: '/users',
    baseKey: 'urlUsers',
    qryParams: 'isActive=true',
    searchQry: 'querySearch',
  })

  const lovHierarchy = useInfoInputs({
    qry: '/hierarchy',
    baseKey: 'urlUsers',
    searchQry: 'querySearch',
  })

  const lovUseInformation = useInfoInputs({
    qry: '/usoInformacion',
    baseKey: 'urlCgr',
  })
  const { data: infoProcess, isPending } = useQueryDynamicApi({
    url: `/process-types?idGroup=${baseUrls['urlGroupReq']}`,
    baseKey: 'urlProcess',
    isCompanyRequest: true,
  })
  const [optionsProcess, setOptionsProcess] = useState([
    { value: '', label: isPending ? 'Cargando...' : 'Ninguno' },
  ])

  useEffect(() => {
    if (!isPending && infoProcess) {
      const options = infoProcess?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      }))
      setOptionsProcess([{ value: '', label: 'Ninguno' }, ...options])
    } else if (isPending) {
      setOptionsProcess([{ value: '', label: 'Cargando...' }])
    }
  }, [infoProcess, isPending])

  const inputsFormIndicators = [
    { label: 'Fecha inicio', name: 'after', space: 6, type: 'date' },
    { label: 'Fecha fin', name: 'before', space: 6, type: 'date' },
    {
      label: 'Analista',
      name: 'idAnalyst',
      type: 'autoCompleteSelect',
      space: 6,
      data: lovAnalyst?.dataList?.data,
      openModal: lovAnalyst?.controlModal.handleShow,
      handleSearch: lovAnalyst?.controlSearch?.handleSearchText,
      getOptionLabel: (option) => `${option?.firstName} ${option?.lastName ?? ''}`,
      isLoading: lovAnalyst?.isLoading,
    },
    {
      label: 'Complejidad RTA',
      name: 'complexity',
      space: 6,
      type: 'select',
      options: [
        { value: '', label: 'Ninguno' },
        { value: 'NA', label: 'No aplica' },
        { value: 'LOW', label: 'Baja' },
        { value: 'MEDIUM', label: 'Media' },
        { value: 'HIGH', label: 'Alta' },
        { value: 'HIGH_2', label: 'Alta 2' },
        { value: 'HIGH_3', label: 'Alta 3' },
      ],
    },
    {
      label: 'Uso de la información',
      name: 'useInformation',
      type: 'autoCompleteSelect',
      space: 6,
      data: lovUseInformation?.dataList?.data,
      openModal: lovUseInformation?.controlModal.handleShow,
      handleSearch: lovUseInformation?.controlSearch?.handleSearchText,
      isLoading: lovUseInformation?.isLoading,
    },
    {
      label: 'Delegada / Entidad solicitante',
      name: 'delegateApplicantEntity',
      type: 'autoCompleteSelect',
      space: 6,
      data: lovHierarchy?.dataList?.data,
      openModal: lovHierarchy?.controlModal.handleShow,
      handleSearch: lovHierarchy?.controlSearch?.handleSearchText,
      isLoading: lovHierarchy?.isLoading,
    },
    {
      label: 'Tipo de requerimiento',
      name: 'idProcessType',
      type: 'select',
      space: 6,
      options: optionsProcess,
    },
  ]

  const onSubmit = (data) => {
    // Filter out entries with undefined or empty string values
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined && v !== '' && v !== null)
    )
    // If analyst exists, replace it with its id, otherwise leave it as is
    if (filteredData.idAnalyst) {
      filteredData.idAnalyst = filteredData.idAnalyst.id
    }
    if (filteredData.after) {
      filteredData.after.$isDayjsObject && !isNaN(Date.parse(filteredData.after.$d))
        ? (filteredData.after = formatDateForTextfield(filteredData.after))
        : delete filteredData.after
    }
    if (filteredData?.before) {
      filteredData.before.$isDayjsObject && !isNaN(Date.parse(filteredData.before.$d))
        ? (filteredData.before = formatDateForTextfield(filteredData.before))
        : delete filteredData.before
    }
    if (filteredData?.useInformation) {
      filteredData.useInformation = filteredData.useInformation.id
    }
    if (filteredData?.delegateApplicantEntity) {
      filteredData.delegateApplicantEntity = filteredData.delegateApplicantEntity.id
    }
    const queryParams = new URLSearchParams(filteredData).toString()
    filteringData({
      type: `processes-by-complexity`,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}&${queryParams}`,
      setValue: setInfoCharts,
    })
    filteringData({
      type: `processes-by-origin-office`,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}&${queryParams}`,
      setValue: setInfoCharts,
    })
    filteringData({
      type: `processes-by-use-info`,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}&${queryParams}`,
      setValue: setInfoCharts,
    })
    filteringData({
      type: `processes-by-req-type`,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}&${queryParams}`,
      setValue: setInfoCharts,
    })
    filteringData({
      type: `processes-by-analyst`,
      qryParam: `wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}&${queryParams}`,
      setValue: setInfoCharts,
    })
  }

  const paramsModals = {
    lovAnalyst,
    lovHierarchy,
    lovUseInformation,
    setValue,
  }
  const modalValueList = modalsOptions(paramsModals)

  return (
    <ChartContainer title='Filtros'>
      <Grid
        component='form'
        container
        spacing={3}
        padding={3}
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputsFormIndicators.map((input) => (
          <ChooseInput
            key={input.name}
            control={control}
            item={input}
            setValue={setValue}
          />
        ))}
        {modalValueList.map((modal, index) => (
          <ValueListGlobal
            key={index}
            title={modal?.title}
            openOptions={modal?.open}
            rows={modal?.rows}
            loading={modal?.loading}
            columns={modal?.columns}
            selectedOption={modal?.selectedOption}
            searchOptions={modal?.searchOptions}
          />
        ))}
        <Grid
          item
          container
          xs={12}
          justifyContent='flex-end'
        >
          <ClassicIconButton
            onClick={() => reset?.()}
            title='Limpiar'
          >
            <FormatClear />
          </ClassicIconButton>
          <Button
            variant='contained'
            type='submit'
          >
            Aplicar filtros
          </Button>
        </Grid>
      </Grid>
    </ChartContainer>
  )
}

export default FormFiltersIndicators
