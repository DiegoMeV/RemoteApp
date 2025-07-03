import { useEffect, useState } from 'react'
import {
  columnsRegions,
  modalsRegions,
  selectAutocompleteCitie,
  selectAutocompleteProvince,
  useRequestsRegions,
} from '../../../funcs'
import GenericAccordion from '../GenericAccordion'
import {
  BackdropLoading,
  ValueListGlobal,
  useBoolean,
  useGetRegionsByContract,
  useListCities,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { createQuery } from '@/app/applications/funcs'

const Regions = ({ idContract, openAccordion, handleOpenAccordion }) => {
  const apiRef = useGridApiRef()
  const [rowModesModel, setRowModesModel] = useState({})
  const [rowSelected, setRowSelected] = useState({})
  const [rowParams, setRowParams] = useState()
  const [newRow, setNewRow] = useState()
  const [idProvince, setIdProvince] = useState()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })

  useEffect(() => {
    setRowModesModel({})
    setNewRow(false)
  }, [openAccordion])

  const {
    data: Regions,
    isFetching: loadingInfo,
    isError,
    refetch: refetchRegion,
    isRefetching,
  } = useGetRegionsByContract({
    qry: `?contratoId=${idContract}&aumentarInfo=true&esBorrado=false`,
    enabled: openAccordion && idContract !== 'new',
  })

  const { createRegionByContract, editRegionByContract, loadingRequest } = useRequestsRegions({
    setRowModesModel,
    rowSelected,
    refetchRegion,
    setNewRow,
  })
  const searchCitie = useSearch()
  const searchPrivinces = useSearch()

  const modalCities = useBoolean()
  const modalProvinces = useBoolean()

  const qryLocations = (searchText) => {
    if (searchText) {
      return `?pageSize=10&palabraClave=${searchText}`
    }
    return `?pageSize=10`
  }
  const qry = createQuery({ search: searchCitie, model })

  const { data: cities, isLoading: loadingCities } = useListCities({
    qry: `${qry}${idProvince ? `&departamento_id=${idProvince}` : ''}`,
  })

  const { data: provinces, isLoading: loadingProvinces } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/departamento${qryLocations(searchPrivinces?.searchText)}&aumentarInfo=true`,
  })

  const columns = columnsRegions({
    cities: cities?.data ?? [],
    handleSearchText: searchCitie.handleSearchText,
    loadingCities,
    selectAutocompleteCitie,
    modalCities,
    provinces: provinces?.data ?? [],
    handleSearchTextProvince: searchPrivinces.handleSearchText,
    loadingProvinces,
    selectAutocompleteProvince,
    modalProvinces,
    setRowParams,
    apiRef,
    idProvince,
    setIdProvince,
  })

  const updateInfo = (data) => {
    setRowSelected(data)
    const adaptData = {
      id: data?.id,
      contrato_id: idContract,
      departamento_id: data?.departamentoInfo?.id,
      municipio_id: data?.municipioInfo?.id,
    }
    if (data?.isNew) {
      createRegionByContract(adaptData)
      return
    }
    editRegionByContract(adaptData)
  }

  const modals = modalsRegions({
    model,
    modalCities,
    cities,
    searchCitie,
    loadingCities,
    modalProvinces,
    provinces,
    searchPrivinces,
    loadingProvinces,
    setIdProvince,
    setModel,
  })

  return (
    <>
      <BackdropLoading loading={loadingRequest} />
      <GenericAccordion
        expandAccordion={openAccordion}
        handleOpenAccordion={handleOpenAccordion}
        apiRefDatagrid={apiRef}
        editable={false}
        title='Regiones'
        labelButton='Agregar región'
        columns={columns}
        infoRows={Regions?.data ?? []}
        updateInfo={updateInfo}
        loadingInfo={loadingInfo || isRefetching}
        isError={isError}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        newRow={newRow}
        setNewRow={setNewRow}
        delItem={(id) => {
          editRegionByContract({ id, esBorrado: true })
        }}
      />
      {modals.map((modal) => (
        <ValueListGlobal
          key={modal.title}
          title={modal.title}
          openOptions={modal.openOptions}
          columns={modal.columns}
          rows={modal.data}
          loading={modal.loading}
          searchOptions={modal.searchOptions}
          selectedOption={(params) => {
            modal.selectAutocomplete(apiRef, rowParams, params.row)
            modal?.setId?.(params.row.id)
          }}
          pagination={modal?.pagination}
        />
      ))}
    </>
  )
}

export default Regions
