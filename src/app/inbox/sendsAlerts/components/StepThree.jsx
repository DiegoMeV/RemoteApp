import {
  BackdropLoading,
  CustomModal,
  GenericForm,
  ValueListGlobal,
  buildQueryWithPagination,
  useBoolean,
  useGetOffices,
  useMutationDynamicBaseUrl,
  usePaginationGlobal,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { buildArrayOfModalsSigedoc, inputsStepThree } from '../funcs'
import { selectVL } from '../funcs/selectVL'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { inputForFolderCreation } from '@/lib/components/SIGEDOC/funcs'
import { Grid } from '@mui/material'

const StepThree = ({ form, modalFolder, formFolder }) => {
  const destinyOfficeForm = form?.watch('additionalData.officeDestination')
  const originOffice = form?.watch('office')
  const seriesForm = form?.watch('serie')

  const modalSeries = useBoolean()
  const modalCarpetas = useBoolean()
  const modalTipoDocumentales = useBoolean()
  const modalTipoDocumento = useBoolean()

  const [cursorOffices, setCursorOffices] = useState()
  const [pageSizeOffices, setPageSizeOffices] = useState(50)
  const modalOfficesDestination = useBoolean()
  const searchDestinyOffice = useSearch()
  const qryDO = buildQueryWithPagination(
    pageSizeOffices,
    cursorOffices,
    searchDestinyOffice?.searchText
  )
  const { data: officesDestination, isLoading: loadingOfficesDestination } = useGetOffices({
    qry: qryDO,
  })

  const { data: series, isLoading: loadingSeries } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    enabled: !!originOffice?.TRDcode,
    url: `/SIGEDOC/dependencia/${originOffice?.TRDcode}/series-documentales`,
  })

  const { data: tipoDocumentales, isLoading: loadingTipoDocumentales } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    url: `/SIGEDOC/serie/${seriesForm?.id}/tipologias-documentales`,
    enabled: !!seriesForm?.id,
  })

  const { data: tipoDocumento, isLoading: loadingTipoDocumento } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `/SIGEDOC/tiposDocumento`,
    enabled: !!originOffice,
  })

  const {
    data: carpetas,
    isFetching: loadingCarpetas,
    refetch: refetchFolders,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    url: `/SIGEDOC/consultar-carpetas/${seriesForm?.codigo}`,
    enabled: !!seriesForm?.codigo,
  })

  const { data: users, isLoading: loadingUsers } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    enabled: !!destinyOfficeForm?.TRDcode,
    url: `/SIGEDOC/dependencia/${destinyOfficeForm?.TRDcode}/usuarios`,
  })

  const modalUser = useBoolean()

  useEffect(() => {
    if (!loadingSeries && !series?.success) {
      toast.error(series?.error ?? 'Ha sucedido un error al obtener las series')
    }
  }, [series, loadingSeries])

  useEffect(() => {
    form?.setValue('usuarioDestino', { firstName: '', lastName: '' })
  }, [destinyOfficeForm])

  // Clean inputs
  useEffect(() => {
    form?.setValue('tipoDocumentales', '')
    form?.setValue('carpeta', '')
  }, [seriesForm])

  const selectAutocompleteValue = (name, newValue) => {
    form?.setValue(name, newValue)
  }

  const paramsFilterOffices = {
    search: searchDestinyOffice,
    setCursor: setCursorOffices,
    setPageSize: setPageSizeOffices,
  }

  const { handlePaginationModelChange, rowCountState, paginationModel } = usePaginationGlobal(
    officesDestination,
    paramsFilterOffices,
    loadingOfficesDestination
  )

  const inputs = inputsStepThree({
    series,
    loadingSeries,
    modalSeries,
    carpetas: carpetas?.data?.Carpetas ?? [],
    loadingCarpetas,
    modalCarpetas,
    tipoDocumentales,
    loadingTipoDocumentales,
    modalTipoDocumentales,
    tipoDocumento,
    loadingTipoDocumento,
    modalTipoDocumento,
    usuarioDestino: users,
    loadingUsuarioDestino: loadingUsers,
    modalUsuarioDestino: modalUser,
    officesDestination,
    loadingOfficesDestination,
    modalOfficesDestination,
    searchDestinyOffice,
  })

  const arrayModals = buildArrayOfModalsSigedoc({
    series,
    loadingSeries,
    modalSeries,
    carpetas: carpetas?.data ?? [],
    modalCarpetas,
    tipoDocumentales,
    modalTipoDocumentales,
    tipoDocumento,
    modalTipoDocumento,
    users,
    modalUser,
    officesDestination,
    loadingOfficesDestination,
    modalOfficesDestination,
    searchDestinyOffice,
    paginationOffices: {
      handlePaginationModelChange,
      rowCountState,
      paginationModel,
    },
  })

  const infoModal = selectVL(arrayModals)

  const INPUTS_CREATE_FOLDER = inputForFolderCreation(false)

  const onSuccessFolder = (response) => {
    if (!response?.success) {
      toast.error('Error al crear el expediente')
      return
    }
    toast.success('Expediente creado con éxito')
    refetchFolders()
    modalFolder?.handleShow()
  }

  const onErrorEvent = () => toast.error('Error al crear el expediente')

  const { mutateAsync: createFolder, isPending: loadingCreateFolder } = useMutationDynamicBaseUrl({
    baseKey: 'urlCgrInt',
    isCompanyRequest: true,
    url: `/SIGEDOC/crear-carpeta`,
    onSuccess: onSuccessFolder,
    onError: onErrorEvent,
  })

  const onSubmitFolder = (data) => {
    createFolder({ body: data })
  }

  const actions = [
    {
      label: 'Cancelar',
      color: 'error',
      variant: 'contained',
      onClick: () => {
        modalFolder?.handleShow()
        formFolder?.setValue('nombre', '')
        formFolder?.setValue('fechaInicial', '')
      },
    },
    {
      label: 'Guardar',
      variant: 'contained',
      onClick: () => {
        onSubmitFolder(formFolder?.getValues())
      },
    },
  ]

  useEffect(() => {
    formFolder?.setValue('serie.codigo', seriesForm?.codigo)
  }, [seriesForm])

  return (
    <>
      <BackdropLoading loading={loadingCreateFolder} />
      <GenericForm
        inputs={inputs}
        control={form?.control}
      />
      <ValueListGlobal
        {...infoModal}
        selectedOption={(params) => {
          selectAutocompleteValue(infoModal.name, params.row)
        }}
        //searchOptions={searchDestinyOffice}
      />
      {modalFolder?.show && (
        <CustomModal
          title={'Creacion de Expediente'}
          open={modalFolder?.show}
          handleClose={modalFolder?.handleShow}
          modalType='div'
          size='md'
          height='200px'
          actions={actions}
        >
          <Grid
            container
            spacing={2}
          >
            <GenericForm
              inputs={INPUTS_CREATE_FOLDER}
              control={formFolder?.control}
            />
          </Grid>
        </CustomModal>
      )}
    </>
  )
}

export default StepThree
