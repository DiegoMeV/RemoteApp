import {
  BackdropLoading,
  MagicString,
  NoAccessCard,
  buildQueryStringUserService,
  getValue,
  useBoolean,
  usePagination,
  useSearch,
  useSearchHierarchy,
  useSubmitRetenciones,
} from '@/lib'
import { ViewRetenciones } from './Views'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  columnsDocumentType,
  formsForRetenciones,
  retencionColumns,
  seriesAndSubseriesColumns,
} from './funcs'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useGetDetail } from './hooks'
import { AccessControl } from '@/libV4'

const Retenciones = () => {
  const queryClient = useQueryClient()
  const formsRetenciones = formsForRetenciones()
  const { control, handleSubmit, setValue, reset } = useForm()

  const [rowParams, setRowParams] = useState()
  const [cursor, setCursor] = useState()
  const [pageSize, setPageSize] = useState(50)

  const searchOffices = useSearch()
  const modalOptions = useBoolean()

  const qry = buildQueryStringUserService(pageSize, cursor, searchOffices.searchText)

  const containsSubserie = (row) => {
    return row?.especificaciones?.retGestion ||
      row?.especificaciones?.retArchivoCentral ||
      row?.consecutivoInicial ||
      row?.especificaciones?.procedimiento
      ? false
      : true
  }

  useEffect(() => {
    if (rowParams && !rowParams.isNew) {
      reset()
      formsRetenciones?.[rowParams.type]?.forEach((element) => {
        const valor = getValue(rowParams, element.name)

        if (element.name.includes('.')) {
          if (
            element.name === 'especificaciones.disposicionFinal' &&
            !Array.isArray(valor) &&
            valor
          ) {
            setValue(element.name, [valor])
            return
          }
          setValue(element.name, valor)
        } else {
          setValue(element.name, rowParams[element.name])
        }
      })
      if (rowParams?.type === 'serie') {
        formsRetenciones?.['aditionalDataSerie']?.forEach((element) => {
          if (element.name.includes('.')) {
            const valor = getValue(rowParams, element.name)
            if (
              element.name === 'especificaciones.disposicionFinal' &&
              !Array.isArray(valor) &&
              valor
            ) {
              setValue(element.name, [valor])
              return
            }
            setValue(element.name, valor)
          } else {
            setValue(element.name, rowParams[element.name])
          }
        })
      }
    } else if (rowParams?.isNew) {
      reset()
    }
    // For eslint is necessary formRetenciones dependency, but this generates an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, rowParams, setValue])

  const {
    data: dependencias,
    isFetching: isLoading,
    isError,
    refetch: refetchDependencias,
    isRefetching,
  } = useSearchHierarchy({
    qry: qry,
  })

  const filterDependencias = dependencias?.data?.filter((dep) => dep.TRDcode)

  const paramsFilter = {
    setCursor,
    setPageSize,
  }

  const pagination = usePagination(dependencias, paramsFilter, isLoading)

  const columns = retencionColumns({
    openModal: (rowData) => {
      modalOptions.handleShow(), setRowParams(rowData)
    },
  })

  const columnsDocType = columnsDocumentType({
    openModal: (rowData) => {
      modalOptions?.handleShow(), setRowParams(rowData)
    },
  })

  const getDetailPanelContentSubSerie = useGetDetail({
    funProps: (row) => {
      const qry = `tablaRetencionTipoDocumento?idTablaRetencion=${row.id}`
      const columns = columnsDocType
      const pl = '200px'
      return { qry, columns, pl }
    },
  })

  const columnsSubseries = seriesAndSubseriesColumns({
    openModal: (rowData) => {
      modalOptions?.handleShow(), setRowParams(rowData)
    },
  })

  const getDetailPanelContentSerie = useGetDetail({
    funProps: (row) => {
      const qry = containsSubserie(row)
        ? `tablaRetencion?idDependencia=${row.idDependencia}&idPadre=${row.id}`
        : `tablaRetencionTipoDocumento?idTablaRetencion=${row.id}`
      const columns = containsSubserie(row) ? columnsSubseries : columnsDocType
      const pl = '100px'
      const getDetailPanelContentChildren = getDetailPanelContentSubSerie?.getDetailPanelContent
      return { qry, columns, pl, getDetailPanelContentChildren }
    },
  })

  // These are the dependencias details
  const columnsSeries = seriesAndSubseriesColumns({
    openModal: (rowData) => {
      modalOptions?.handleShow(), setRowParams(rowData)
    },
    serie: true,
  })

  const getDetailPanelContentDependencia = useGetDetail({
    funProps: (row) => {
      const qry = `tablaRetencion?idDependencia=${row.id}`
      const columns = columnsSeries
      const pl = '50px'
      const getDetailPanelContentChildren = getDetailPanelContentSerie?.getDetailPanelContent
      return { qry, columns, pl, getDetailPanelContentChildren }
    },
  })

  const { mutateAsync: createRetencion, isPending: loadingCreateRetencion } = useSubmitRetenciones({
    onSuccess: () => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      modalOptions.handleShow()
      refetchDependencias()
      queryClient.invalidateQueries([`/tablaRetencion`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const { mutateAsync: editRetencion, isPending: loadingEditRetencion } = useSubmitRetenciones({
    method: 'put',
    onSuccess: () => {
      toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
      modalOptions.handleShow()
      refetchDependencias()
      queryClient.invalidateQueries([`/tablaRetencion`])
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
    },
  })

  const { mutateAsync: createDocumentType, isPending: loadingCreateDocType } = useSubmitRetenciones(
    {
      qry: 'TipoDocumento',
      onSuccess: () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        modalOptions.handleShow()
        queryClient.invalidateQueries([`/tablaRetencionTipoDocumento`])
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      },
    }
  ) //Este

  const { mutateAsync: editDocumentType, isPending: loadingEditDocumentType } =
    useSubmitRetenciones({
      qry: 'TipoDocumento',
      method: 'put',
      onSuccess: () => {
        toast.success(MagicString.GENERAL.SUCCESS_MESSAGE)
        modalOptions.handleShow()
        queryClient.invalidateQueries([`/tablaRetencionTipoDocumento`])
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? MagicString.GENERAL.ERROR_MESSAGE)
      },
    })

  const onSubmit = (data) => {
    switch (rowParams?.form) {
      case 'addSerie':
        createRetencion({
          body: {
            ...data,
            idDependencia: rowParams?.id,
            codigoTrdDependencia: rowParams?.TRDcode,
          },
        })
        break
      case 'addSubSerie':
        createRetencion({
          body: {
            ...data,
            idDependencia: rowParams?.idDependencia,
            idTablaRetPadre: rowParams?.id,
            codigoTrdDependencia: rowParams?.codigoTrdDependencia,
          },
        })
        break
      case 'editSerie':
        editRetencion({
          body: { ...data, codigoTrdDependencia: rowParams?.TRDcode },
          bodyQry: `/${rowParams?.id}`,
        })
        break
      case 'editSubSerie':
        editRetencion({
          body: {
            ...data,
            codigoTrdDependencia: rowParams?.codigoTrdDependencia,
          },
          bodyQry: `/${rowParams?.id}`,
        })
        break
      case 'createDocumentType':
        createDocumentType({
          body: {
            ...data,
            idTablaRetencion: rowParams?.id,
            codigoTrdDependencia: rowParams?.codigoTrdDependencia,
          },
        })
        break
      case 'editDocumentType':
        editDocumentType({
          body: {
            ...data,
            codigoTrdDependencia: rowParams?.codigoTrdDependencia,
          },
          bodyQry: `/${rowParams?.id}`,
        })
        break
      default:
        break
    }
  }

  return (
    <AccessControl
      privilege='documentos.retenciones.listar'
      nodeContent={<NoAccessCard />}
    >
      <BackdropLoading
        loading={
          loadingCreateRetencion ||
          loadingEditRetencion ||
          loadingCreateDocType ||
          loadingEditDocumentType
        }
      />
      <ViewRetenciones
        dataOptions={{
          dependencias: filterDependencias ?? [],
          columns,
          getDetailPanelContentDependencia: getDetailPanelContentDependencia?.getDetailPanelContent,
          rowParams,
          pagination,
          searchOffices,
        }}
        modalOptions={modalOptions}
        isLoading={isLoading || isRefetching}
        isError={isError}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
      />
    </AccessControl>
  )
}

export default Retenciones
