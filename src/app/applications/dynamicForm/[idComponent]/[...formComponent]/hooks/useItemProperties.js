import { useMutationDynamicBaseUrl } from '@/lib'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleDownloadReport } from '../funcs'
import { useStoreActions } from 'easy-peasy'

const useItemProperties = ({ setDataBlockEdit, form, setNewAllParams, setNewGlobalVariables }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = (block) => {
    setModalOpen((prevDataBlock) => {
      return { ...prevDataBlock, [block]: true }
    })
  }

  const handleCloseModal = (block) => {
    setModalOpen((prevDataBlock) => {
      return { ...prevDataBlock, [block]: false }
    })
  }

  const { mutateAsync: callOracleReport } = useMutationDynamicBaseUrl({
    url: `/app-specific/siif-web/call-oracle-report`,
    baseKey: 'urlApps',
    method: 'get',
    isCompanyRequest: true,
    onSuccess: () => {
      toast.success('Reporte generado con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al generar el reporte')
    },
  })

  const { mutateAsync: executeQuery } = useMutationDynamicBaseUrl({
    url: `/oracle/executeQuery`,
    isCompanyRequest: true,
    baseKey: 'urlOracleApi',
    method: 'post',
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { mutateAsync: executeProcedure } = useMutationDynamicBaseUrl({
    url: `/oracle/execute-procedure`,
    isCompanyRequest: true,
    baseKey: 'urlOracleApi',
    method: 'post',
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const getQueryResult = useMemo(() => {
    return async (query) => {
      const outputStringQuery = query.replace(/[\n\t\s]+/g, ' ')
      try {
        const response = await executeQuery({ body: { queryStatement: outputStringQuery } })
        if (!response?.success) {
          toast.error(`${response?.data?.error}: ${outputStringQuery}`)
          return response
        }
        return response
      } catch (error) {
        toast.error(error?.message ?? `Error al ejecutar la consulta: ${outputStringQuery}`)
        return error?.response?.data
      }
    }
  }, [executeQuery])

  const getProcedureResult = useMemo(() => {
    return async (body) => {
      const queryStamentString = body?.statement?.replace(/[\n\t\s]+/g, ' ')
      try {
        const response = await executeProcedure({
          body: { ...body, statement: queryStamentString },
        })
        if (!response?.success) {
          toast.error(`${response?.data?.error}: ${queryStamentString}`)
          return response
        }
        return response
      } catch (error) {
        toast.error(error?.message ?? `Error al ejecutar la consulta: ${queryStamentString}`)
        return error?.response?.data
      }
    }
  }, [executeProcedure])

  const updateParameters = useMemo(() => {
    return (parameter, value) => {
      setNewAllParams((prevDataParameters) => {
        if (parameter === undefined || value === undefined) {
          return prevDataParameters
        }
        const updatedDataBlock = { ...prevDataParameters }

        updatedDataBlock[parameter] = value

        return updatedDataBlock
      })
    }
  }, [setNewAllParams])

  const updateGlobalVariables = useMemo(() => {
    return (parameter, value) => {
      setNewGlobalVariables((prevDataVariables) => {
        if (parameter === undefined || value === undefined) {
          return prevDataVariables
        }
        const updatedDataBlock = { ...prevDataVariables }

        updatedDataBlock[parameter] = value

        return updatedDataBlock
      })
    }
  }, [setNewGlobalVariables])

  const setBlockProperty = useMemo(() => {
    return (blockId, parameter) => {
      setDataBlockEdit((prevDataBlock) =>
        prevDataBlock.map((block) => {
          const parameterValue = parameter ?? 'isReadOnly'
          if (!blockId) {
            return { ...block, [parameterValue]: true }
          }

          return block?.blockId === blockId ? { ...block, [parameterValue]: true } : block
        })
      )
    }
  }, [setDataBlockEdit])

  const onRowDoubleClick = useMemo(() => {
    return (params) => {
      return params
    }
  }, [])

  const disableBlocks = useMemo(() => {
    return () => {
      setDataBlockEdit((prevDataBlock) =>
        prevDataBlock.map((block) => {
          return { ...block, isReadOnly: true }
        })
      )
    }
  }, [setDataBlockEdit])

  const formatDate = useMemo(() => {
    return (date, format) => {
      const updatedDate = date ?? new Date()
      return format ? dayjs(updatedDate).format(format) : dayjs(updatedDate)
    }
  }, [])

  const setItemProperty = useMemo(() => {
    return (blockId, inputId, property, valueProperty) => {
      setDataBlockEdit((prevDataBlock) =>
        prevDataBlock.map((block) =>
          block?.blockId === blockId
            ? {
                ...block,
                items: block.items.map((item) =>
                  item?.id === inputId ? { ...item, [property]: valueProperty } : item
                ),
              }
            : block
        )
      )
    }
  }, [setDataBlockEdit])

  const getValueItem = useMemo(() => {
    return (blockId, inputId) => {
      const value = form.watch(inputId ? `${blockId}.${inputId}` : blockId)

      return value
    }
  }, [form])

  const alertMessage = (message, type) => {
    const newType = type ?? 'info'
    if (toast[newType]) {
      toast[newType](message)
    } else {
      toast(message)
    }
  }

  const setValueItem = useMemo(() => {
    return (blockId, inputId, value) => {
      form.setValue(`${blockId}.${inputId}`, value)
    }
  }, [form])

  const handleAddQueryParams = (queryParams) => {
    if (queryParams) {
      navigate(pathname + queryParams)
    }
  }

  const handleCallOracleReport = (reportName, queryParams, nameShowModal) => {
    if (reportName && queryParams) {
      handleDownloadReport(setPreviewer, callOracleReport, reportName, queryParams, nameShowModal)
    }
  }

  return {
    handleOpenModal,
    modalOpen,
    handleCloseModal,
    setItemProperty,
    getValueItem,
    setValueItem,
    updateParameters,
    setBlockProperty,
    getQueryResult,
    getProcedureResult,
    disableBlocks,
    alertMessage,
    updateGlobalVariables,
    formatDate,
    onRowDoubleClick,
    handleAddQueryParams,
    handleCallOracleReport,
  }
}

export default useItemProperties
