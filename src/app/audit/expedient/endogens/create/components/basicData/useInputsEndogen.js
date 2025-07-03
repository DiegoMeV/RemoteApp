import { useBoolean, useQueryDynamicApi, useSearch } from '@/lib'
import {
  RenderGroupBills,
  RenderGroupPeriods,
  RenderOptionBills,
  RenderOptionPeriods,
} from './components'
import { useEffect, useState } from 'react'

export const useInputsEndogen = ({ form, idInspectionPlan }) => {
  const modalRegisteredProcess = useBoolean()
  const modalCauses = useBoolean()
  const modalDebtSnaps = useBoolean()
  const modalStartTaxPeriods = useBoolean()
  const modalTaxPeriods = useBoolean()
  const modalBill = useBoolean()
  const searchBills = useSearch()
  const searchProcessType = useSearch()
  const searchCauses = useSearch()
  const searchDebtSnaps = useSearch()
  const searchStartTaxPeriods = useSearch()
  const searchTaxPeriods = useSearch()
  const taxType =
    form.watch('module') === 'I' ? 'INDUSTRIA' : form.watch('module') === 'P' ? 'PREDIAL' : ''
  const moduleSelected = form.watch('module')
  const { data: typeProcess, isFetching: loadingTypeProcess } = useQueryDynamicApi({
    url: searchProcessType?.searchText
      ? `/process-types?appIdentifier=FISCALIZACION&dataSourceType=INTERNAL&searchString=${
          searchProcessType.searchText
        }&taxType=${form.watch('module')}`
      : `/process-types?appIdentifier=FISCALIZACION&dataSourceType=INTERNAL&taxType=${form.watch(
          'module'
        )}`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
  })

  const { data: inspectionCauses, isFetching: loadingInspectionCauses } = useQueryDynamicApi({
    url: `/inspectionCauses`,
    baseKey: 'urlFiscalizacion',
  })

  const { data: debtSnaps, isFetching: loadingDebtSnaps } = useQueryDynamicApi({
    enabled: !!form.watch('module'),
    url: `/apps-specific/SIIFWEB/tax-system/get-debt-snaps/${form.watch('module')}`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
  })

  const { data: bills, isFetching: loadingBills } = useQueryDynamicApi({
    url: `/facturas`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
  })

  const { data: TaxPeriods, isFetching: loadingTaxPeriods } = useQueryDynamicApi({
    enabled: !!form.watch('module'),
    url: `/apps-specific/SIIFWEB/tax-system/get-tax-periods/${taxType}?periodo=${searchStartTaxPeriods.searchText}`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    delay: 500,
  })
  const [taxPeriodsIds, setTaxPeriodsIds] = useState([])
  useEffect(() => {
    const taxPeriods =
      TaxPeriods?.data?.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
      })) ?? []
    setTaxPeriodsIds(taxPeriods)
  }, [TaxPeriods])

  const inputEndogen = [
    {
      label: 'Consecutivo',
      name: 'identifier',
      type: 'text',
      disabled: true,
      space: 2,
    },
    {
      label: 'Módulo',
      name: 'module',
      type: 'select',
      required: true,
      options: [
        { value: 'I', label: 'Industria y Comercio' },
        { value: 'P', label: 'Impuesto Predial' },
        { value: 'O', label: 'Rentas varias' },
      ],
      space: moduleSelected === 'P' ? 3 : 8,
    },
    moduleSelected === 'P'
      ? {
          name: 'inspectionData.idBillingGroup',
          type: 'autocomplete',
          idField: 'facturacion',
          autocompleteProps: {
            options: bills?.data ?? [],
            loadingOptions: loadingBills,
            openModal: () => modalBill.handleShow(),
            onChange: (e, value) => {
              form.setValue('inspectionData.idBillingGroup', value?.facturacion ?? null)
            },
            getOptionLabel: (options) => options?.facturacion,
            isOptionEqualToValue: (option, value) => {
              return option?.facturacion === value?.facturacion
            },
          },
          size: 'medium',
          required: true,
          textFieldProps: {
            label: 'ID proceso Liquidación Oficial',
          },
          space: 5,
          groupBy: () => 'All Options',
          renderGroup: (params) => <RenderGroupBills params={params} />,
          renderOption: (props, option) => {
            return (
              <RenderOptionBills
                props={props}
                option={option}
              />
            )
          },
        }
      : null,
    {
      label: 'Fecha de inicio',
      name: 'startDate',
      defaultValue: new Date(),
      type: 'date',
      space: 2,
    },
    {
      label: 'Muestra',
      name: 'rowsCount',
      type: 'number',
      space: 2,
      disabled: true,
    },
    {
      label: 'Exp. generados',
      name: 'expedients',
      type: 'number',
      space: 3,
      disabled: true,
    },
    {
      name: 'idProcessType',
      type: 'autocomplete',
      autocompleteProps: {
        options: typeProcess?.data ?? [],
        loadingOptions: loadingTypeProcess,
        openModal: () => modalRegisteredProcess.handleShow(),
        onChange: (e, value) => form.setValue('idProcessType', value?.id ?? null),
      },
      size: 'medium',
      required: true,
      textFieldProps: {
        label: 'Tipo de proceso',
        onChange: (e) => searchProcessType.handleSearchText(e.target.value),
      },
      space: 7,
    },
    idInspectionPlan
      ? {
          label: 'Periodo de inicio',
          name: 'startPeriod',
          type: 'number',
          required: true,
          space: 6,
        }
      : {
          name: 'idStartPeriod',
          type: 'autocomplete',
          autocompleteProps: {
            options: taxPeriodsIds ?? [],
            loadingOptions: loadingTaxPeriods,
            openModal: () => modalStartTaxPeriods.handleShow(),
            disabled: !form.watch('module'),
            onChange: (e, value) => {
              form.setValue('idStartPeriod', value?.id ?? null)
              form.setValue('startPeriod', value?.periodo ?? null)
              form.setValue('startSubperiod', value?.subperiodo ?? null)
              form.setValue('startSubperiodCod', value?.codSubperiodo ?? null)
            },
          },
          size: 'medium',
          required: true,
          disabled: !form.watch('module'),
          textFieldProps: {
            label: 'Periodo de inicio',
            onChange: (e) => searchStartTaxPeriods.handleSearchText(e.target.value),
          },
          space: 6,
          groupBy: () => 'All Options',
          getOptionLabel: (options) => options?.periodo,
          renderGroup: (params) => <RenderGroupPeriods params={params} />,
          renderOption: (props, option) => {
            return (
              <RenderOptionPeriods
                props={props}
                option={option}
              />
            )
          },
        },
    idInspectionPlan
      ? {
          label: 'Periodo de finalización',
          name: 'period',
          type: 'number',
          required: true,
          space: 6,
        }
      : {
          name: 'idPeriod',
          type: 'autocomplete',
          autocompleteProps: {
            options: taxPeriodsIds ?? [],
            loadingOptions: loadingTaxPeriods,
            openModal: () => modalTaxPeriods.handleShow(),
            disabled: !form.watch('module'),
            onChange: (e, value) => {
              form.setValue('idPeriod', value?.id ?? null)
              form.setValue('period', value?.periodo ?? null)
              form.setValue('subperiod', value?.subperiodo ?? null)
              form.setValue('subperiodCod', value?.codSubperiodo ?? null)
            },
          },
          size: 'medium',
          required: true,
          disabled: !form.watch('module'),
          textFieldProps: {
            label: 'Periodo de finalización',
            onChange: (e) => searchTaxPeriods.handleSearchText(e.target.value),
          },
          space: 6,
          groupBy: () => 'All Options',
          getOptionLabel: (options) => options?.periodo,
          renderGroup: (params) => <RenderGroupPeriods params={params} />,
          renderOption: (props, option) => {
            return (
              <RenderOptionPeriods
                props={props}
                option={option}
              />
            )
          },
        },
    {
      name: 'idDebtSnapshot',
      type: 'autocomplete',
      idField: 'corteId',
      autocompleteProps: {
        options: debtSnaps?.data ?? [],
        loadingOptions: loadingDebtSnaps,
        openModal: () => modalDebtSnaps.handleShow(),
        onChange: (e, value) => form.setValue('idDebtSnapshot', value?.corteId ?? null),
        disabled: !form.watch('module'),
        getOptionLabel: (options) => options?.observacion,
        isOptionEqualToValue: (option, value) => {
          return option?.corteId === value.corteId
        },
      },
      size: 'medium',
      required: true,
      disabled: !form.watch('module'),
      textFieldProps: {
        label: 'Corte cartera',
        onChange: (e) => searchDebtSnaps.handleSearchText(e.target.value),
      },
      space: 8,
    },
    {
      label: 'Fecha corte informacion',
      name: 'limitDate',
      type: 'date',
      space: 2,
    },
    {
      label: 'Regimen',
      name: 'regime',
      type: 'select',
      defaultValue: 'N',
      options: [
        { value: 'S', label: 'Simplificado' },
        { value: 'C', label: 'Común' },
        { value: 'E', label: 'Reteica' },
        { value: 'N', label: 'No aplica' },
      ],
      space: 2,
    },
    {
      name: 'taxAuditCauseId',
      type: 'autocomplete',
      autocompleteProps: {
        options: inspectionCauses?.data ?? [],
        loadingOptions: loadingInspectionCauses,
        openModal: () => modalCauses.handleShow(),
        onChange: (e, value) => form.setValue('taxAuditCauseId', value?.id ?? null),
      },
      size: 'medium',
      required: true,
      textFieldProps: {
        label: 'Causa de fiscalización',
        onChange: (e) => searchCauses.handleSearchText(e.target.value),
      },
      space: 12,
    },
    {
      label: 'Observaciones',
      name: 'observation',
      type: 'multiline',
      minRows: 3,
      space: 12,
    },
  ].filter(Boolean)
  const columnsProcessTypes = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 200,
    },
  ]
  const columnsDebtSnaps = [
    {
      field: 'corteId',
      headerName: 'Corte cartera',
      width: 200,
    },
    {
      field: 'observacion',
      headerName: 'Observación',
      width: 200,
    },
  ]
  const columnsTaxPeriods = [
    {
      field: 'periodo',
      headerName: 'Periodo',
      width: 200,
    },
    {
      field: 'subperiodo',
      headerName: 'Subperiodo',
      width: 200,
    },
    {
      field: 'codSubperiodo',
      headerName: 'Código subperiodo',
      width: 200,
    },
    {
      field: 'modulo',
      headerName: 'Módulo',
      width: 200,
    },
  ]
  const columnsBills = [
    {
      field: 'facturacion',
      headerName: 'ID Proceso Liquidación Oficial',
      minWidth: 200,
    },
    {
      field: 'cantidadAforos',
      headerName: 'Cantidad respectivamente',
      minWidth: 200,
      align: 'right',
      valueGetter: (params) => {
        return params?.row?.cantidadAforos?.toLocaleString('en-US') ?? 0
      },
    },
    {
      field: 'periodo',
      headerName: 'Periodo',
      minWidth: 200,
    },
  ]
  const arrayModals = [
    {
      title: 'Tipo de proceso',
      openOptions: modalRegisteredProcess,
      rows: typeProcess?.data ?? [],
      columns: columnsProcessTypes,
      searchOptions: searchProcessType,
      //pagination: paginationOffices,
      loading: loadingTypeProcess,
      name: 'idProcessType',
    },
    {
      title: 'Causa de fiscalización',
      openOptions: modalCauses,
      rows: inspectionCauses?.data ?? [],
      columns: columnsProcessTypes,
      searchOptions: searchCauses,
      //pagination: paginationOffices,
      loading: loadingInspectionCauses,
      name: 'taxAuditCauseId',
    },
    {
      title: 'ID Proceso Liquidación Oficial',
      openOptions: modalBill,
      rows: bills?.data ?? [],
      columns: columnsBills,
      searchOptions: searchBills,
      //pagination: paginationOffices,
      loading: loadingBills,
      name: 'inspectionData.idBillingGroup',
      getRowId: (row) => row?.facturacion,
      selectedOption: (params) => {
        form?.setValue('inspectionData.idBillingGroup', params.row.facturacion)
      },
    },
    {
      title: 'Corte cartera',
      openOptions: modalDebtSnaps,
      rows: debtSnaps?.data ?? [],
      columns: columnsDebtSnaps,
      searchOptions: searchDebtSnaps,
      //pagination: paginationOffices,
      loading: loadingDebtSnaps,
      name: 'idDebtSnapshot',
      getRowId: (row) => row?.corteId,
      selectedOption: (params) => {
        form?.setValue('idDebtSnapshot', params.row.corteId)
      },
    },
    {
      title: 'Periodo de inicio',
      openOptions: modalStartTaxPeriods,
      rows: taxPeriodsIds,
      columns: columnsTaxPeriods,
      searchOptions: searchStartTaxPeriods,
      //pagination: paginationOffices,
      loading: loadingTaxPeriods,
      name: 'idStartPeriod',
      getRowId: (row) => row?.id,
      selectedOption: (params) => {
        form?.setValue('idStartPeriod', params.row.id)
        form?.setValue('startPeriod', params.row.periodo)
        form?.setValue('startSubperiod', params.row.subperiodo)
        form?.setValue('startSubperiodCod', params.row.codSubperiodo)
      },
    },
    {
      title: 'Periodo de finalización',
      openOptions: modalTaxPeriods,
      rows: taxPeriodsIds,
      columns: columnsTaxPeriods,
      searchOptions: searchTaxPeriods,
      //pagination: paginationOffices,
      loading: loadingTaxPeriods,
      name: 'idPeriod',
      getRowId: (row) => row?.id,
      selectedOption: (params) => {
        form?.setValue('idPeriod', params.row.id)
        form?.setValue('period', params.row.periodo)
        form?.setValue('subperiod', params.row.subperiodo)
        form?.setValue('subperiodCod', params.row.codSubperiodo)
      },
    },
  ]
  return { inputEndogen, arrayModals }
}
