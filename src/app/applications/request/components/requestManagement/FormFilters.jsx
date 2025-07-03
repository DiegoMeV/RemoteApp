import { Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import {
  ChartContainer,
  ChooseInput,
  ClassicIconButton,
  ValueListGlobal,
  baseUrls,
  formatDateForTextfield,
  useInfoInputs,
} from '@/lib'
import { inputsFormRequestManagement, modalsOptions } from './funcs'
import { FormatClear } from '@mui/icons-material'

const FormFilters = ({ filteringData, setQueryParams, qry }) => {
  const { control, handleSubmit, setValue, reset } = useForm({})
  const lovAnalyst = useInfoInputs({
    qry: '/users',
    baseKey: 'urlUsers',
    qryParams: 'isActive=true',
    searchQry: 'querySearch',
  })
  const lovHierarchy = useInfoInputs({
    qry: '/hierarchy',
    baseKey: 'urlUsers',
    qryParams: 'isActive=true',
    searchQry: 'querySearch',
  })

  const inputsFormRequestManagements = inputsFormRequestManagement({ lovAnalyst, lovHierarchy })
  const onSubmit = (data) => {
    // Filter out entries with undefined or empty string values
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined && v !== '' && v !== null)
    )

    // If analyst exists, replace it with its id, otherwise leave it as is
    if (filteredData.idAnalyst) {
      filteredData.idAnalyst = filteredData.idAnalyst.id
    }
    if (filteredData.delegateApplicantEntity) {
      filteredData.delegateApplicantEntity = filteredData.delegateApplicantEntity.id
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

    // Construct query parameters string
    const queryParams =
      `processes-info/?wholeCompany=true&idGroup=${baseUrls['urlGroupReq']}&${qry}&` +
      new URLSearchParams(filteredData).toString()

    // Call filteringData with the constructed query parameters
    filteringData({ type: queryParams })
    setQueryParams(new URLSearchParams(filteredData).toString())
  }
  const paramsModals = {
    lovAnalyst,
    lovHierarchy,
    setValue,
  }
  const modalValueList = modalsOptions(paramsModals)
  return (
    <ChartContainer
      title='Filtros'
      minHeight='360px'
    >
      <Grid
        container
        spacing={3}
        padding={3}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputsFormRequestManagements.map((input, index) => {
          return (
            <ChooseInput
              key={index}
              item={input}
              control={control}
              setValue={setValue}
              index={index}
            />
          )
        })}
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
            Aplicar filtro
          </Button>
        </Grid>
      </Grid>
    </ChartContainer>
  )
}

export default FormFilters
