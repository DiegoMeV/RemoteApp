// DELETE IN NEXT PR
import { useState, useEffect, useCallback } from 'react'
import { useDocumentsSignTemplates, usePaginationGlobal } from '@/lib'
import { chooseUrlModal } from './funcs'
import { useStoreState } from 'easy-peasy'
import { templateQryBuilder } from './templateQryBuilder'

const useDocumentActionModal = (actionType, open) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idCompany = companyData?.companyId
  const [cursor, setCursor] = useState()
  const [pageSize, setPageSize] = useState(10)
  const [filteredRows, setFilteredRows] = useState([])
  const [completeRows, setCompleteRows] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const paramsFilter = {
    setCursor: setCursor,
    setPageSize: setPageSize,
  }

  const qryParams = templateQryBuilder(cursor, pageSize, searchText)
  const {
    data: infoRows,
    isFetching,
    refetch,
  } = useDocumentsSignTemplates({
    url: chooseUrlModal({ url: actionType, idCompany, idProcessType, qryParams, variationParams }),
  })

  const { handlePaginationModelChange, rowCountState, paginationModel } = usePaginationGlobal(
    infoRows,
    paramsFilter,
    isFetching,
    'cantidadPlantillas'
  )

  const requestSearch = useCallback((value) => {
    setSearchText(value)
  }, [])

  const escapeRegExp = useCallback((value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }, [])

  const structureGenerate = (document) => {
    return {
      id: document?.id,
      templateName: document?.nombre,
      descripcion: document?.descripcion ?? '',
    }
  }

  const structureSignAndReview = (document) => {
    return {
      id: document?.id,
      stage: document?.nameStage ?? 'No cuenta con la etapa',
      activity: document?.nameActivity ?? '',
      action: document?.nameAction ?? '',
      documentName: document?.name ?? '',
      idTask: document?.idActivity ?? '',
      idTaskAction: document?.idAction ?? '',
    }
  }

  const structureRoles = (rol) => {
    return {
      id: rol?.id,
      roleName: rol?.name ?? '',
      description: rol?.description ?? '',
    }
  }

  const structureActivities = (activity) => {
    return {
      id: activity?.id,
      stage: activity?.ParentTask.name ?? '',
      activity: activity?.name ?? '',
      description: activity?.description ?? '',
    }
  }
  const structureActorType = (activity) => {
    return {
      id: activity?.id,
      nameActorType: activity?.name ?? '',
      descriptionActorType: activity?.description ?? '',
      idActorType: activity?.id,
    }
  }

  const convertInfoRows = useCallback(() => {
    // TO-DO: Usar un objeto
    const mappedRows = infoRows?.data?.map((row) => {
      if (actionType === 'GENERATE') {
        return structureGenerate(row)
      } else if (actionType === 'ROLE') {
        return structureRoles(row)
      } else if (actionType === 'ASSIGNMENT') {
        return structureActivities(row)
      } else if (actionType === 'ASSIGNMENT_ACTORTYPE') {
        return structureActorType(row)
      } else {
        return structureSignAndReview(row)
      }
    })

    setCompleteRows(mappedRows ?? [])
    setFilteredRows(mappedRows ?? [])
  }, [infoRows, actionType])

  useEffect(() => {
    if (infoRows) {
      convertInfoRows()
    }
  }, [infoRows, convertInfoRows])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  useEffect(() => {
    if (actionType === 'GENERATE') return

    if (completeRows) {
      const searchRegex = new RegExp(escapeRegExp(searchText), 'i')
      const searchedRows = completeRows.filter((row) => {
        return Object.keys(row).some((field) => {
          if (typeof row[field] === 'number' || typeof row[field] === 'string') {
            return searchRegex.test(row[field].toString())
          }
        })
      })
      setFilteredRows(searchedRows)
    }
  }, [actionType, searchText, completeRows, escapeRegExp])

  useEffect(() => {
    if (open) {
      refetch()
    }
  }, [open, refetch])

  return {
    loading,
    searchText,
    requestSearch,
    filteredRows,
    refetch,
    handlePaginationModelChange,
    rowCountState,
    paginationModel,
  }
}

export default useDocumentActionModal
