import { ValueListGlobal, useBoolean, useSearch } from '@/lib'
import { useEffect, useState } from 'react'
import ViewRegions from './ViewRegions'
import { columnsRegions, tableFuncs, useApisRequestRegions, valueListRegions } from './funcs'
import { useGridApiRef } from '@mui/x-data-grid-premium'

const RegionAlerts = ({ infoAlert, isView }) => {
  const apiRef = useGridApiRef()
  const [rowModesModel, setRowModesModel] = useState({})
  const [newRow, setNewRow] = useState()
  const [regionAlertAccState, setRegionAlertAccState] = useState(false)
  const [rowParams, setRowParams] = useState()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const [idProvince, setIdProvince] = useState()

  const valueListCities = useBoolean()
  const valueListDepartments = useBoolean()
  const searchDepartments = useSearch()
  const searchCities = useSearch()
  const {
    cities,
    infoProvince,
    regions,
    loadingRows,
    errorRegion,
    createRegionAlert,
    updateRegionInAlert,
    loadingUpdate,
    loadingRegions,
  } = useApisRequestRegions({
    model,
    searchCities,
    searchDepartments,
    setNewRow,
    infoAlert,
    regionAlertAccState,
    idProvince,
    valueListCities,
    valueListDepartments,
  })

  const columns = columnsRegions({
    apiRef,
    valueListCities,
    cities,
    infoProvince,
    loadingRows,
    searchCities,
    valueListDepartments,
    searchDepartments,
    setRowParams,
    setIdProvince,
  })

  const { updateInfo, deleteRegion } = tableFuncs({
    infoAlert,
    createRegionAlert,
    updateRegionInAlert,
  })
  const handleOpenRegionAlertAcc = () => {
    setRegionAlertAccState(!regionAlertAccState)
  }

  useEffect(() => {
    setRowModesModel({})
    setNewRow(false)
  }, [regionAlertAccState])

  const handlePaginationModelChange = (model) => {
    setModel(model)
  }

  const modals = valueListRegions(
    apiRef,
    rowParams,
    valueListDepartments,
    searchDepartments,
    infoProvince,
    loadingRows,
    valueListCities,
    searchCities,
    cities,
    setIdProvince,
    model,
    handlePaginationModelChange
  )

  return (
    <>
      <ViewRegions
        apiRef={apiRef}
        regions={regions}
        updateInfo={updateInfo}
        loadingRegions={loadingRegions}
        errorRegion={errorRegion}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        delItem={deleteRegion}
        newRow={newRow}
        setNewRow={setNewRow}
        columns={columns}
        loadingUpdate={loadingUpdate}
        regionAlertAccState={regionAlertAccState}
        handleOpenRegionAlertAcc={handleOpenRegionAlertAcc}
        isView={isView}
      />
      {modals.map((modal, index) => (
        <ValueListGlobal
          key={index}
          title={modal.title}
          openOptions={modal.openOptions}
          searchOptions={modal.searchOptions}
          rows={modal.rows}
          loading={modal.loading}
          columns={modal.columns}
          selectedOption={modal.selectedOption}
          pagination={modal.pagination}
        />
      ))}
    </>
  )
}

export default RegionAlerts
