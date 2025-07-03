import { useSearch } from '@/lib'
import { ViewRegistryRethus } from './view'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useGenerateRethusGroup, useRethusData } from './hooks'

const RethusRegistry = () => {
  // state to store the data of the rethus processes
  const [rows, setRows] = useState([])
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [filterValue, setFilterValue] = useState(0)

  // Custom hooks to get the data and generate the rethus group
  const searchRethus = useSearch()
  const paramsData = ['pending=true', 'generated=true', 'sent=true']
  const { rethusDataProcess, loadingRethusData } = useRethusData(setRows)
  const { createRethus, isPending } = useGenerateRethusGroup({
    rethusDataProcess,
    paramsData,
    filterValue,
  })
  useEffect(() => {
    rethusDataProcess({
      qry: searchRethus?.searchText
        ? `?${paramsData[filterValue]}&querySearch=${searchRethus?.searchText}`
        : `?${paramsData[filterValue]}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRethus?.searchText])

  // Functions to handle the selection of the rows and the generation of the rethus group
  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel)
  }

  // Functions to handle the selection of the rows and the generation of the rethus group
  const addRethus = () => {
    if (!rowSelectionModel.length) {
      toast.error('Debe seleccionar al menos un proceso')
      return
    }
    createRethus({ body: { processIds: rowSelectionModel } })
  }

  // Function to view the batch
  const viewBatch = (params) => {
    const rowData = rows.find((row) => row.id === params?.rowNode?.children?.[0])
    createRethus({ qry: `/${rowData.idRethusRegistry}` })
  }

  // Function to handle the filter rethus data [pending, generated, sent]
  const handleChangeFilter = (event) => {
    setFilterValue(event.target.value)
    rethusDataProcess({
      qry: searchRethus?.searchText
        ? `?${paramsData[event.target.value]}&querySearch=${searchRethus?.searchText}`
        : `?${paramsData[event.target.value]}`,
    })
  }

  // Params to send to the view
  const params = {
    infoTable: {
      rowSelectionModel,
      isLoadingRethusProcess: loadingRethusData || isPending,
      rethusProcesses: rows,
      searchRethus,
      handleRowSelectionModelChange,
      addRethus,
      viewBatch,
      handleChangeFilter,
      filterValue,
      rethusDataProcess,
      paramsData,
    },
  }
  return <ViewRegistryRethus {...params} />
}

export default RethusRegistry
