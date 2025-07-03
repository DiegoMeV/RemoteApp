import { useSearch } from '../searchTable'
import {
  BackdropLoading,
  GenericForm,
  GenericSelect,
  ValueListGlobal,
  useBoolean,
  usePaginationGlobal,
} from '@/lib/ui'
import { useEffect, useState } from 'react'
import { useGetOffices, useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/lib/api'
import { userSigedoc } from '@/app/inbox/[...ids]/components/ManagementActions/funcs'
import { getFormByType } from './funcs'
import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'
import { columnsValueListUsers, subseriesColumns } from './constants'
import toast from 'react-hot-toast'
import { toArray } from '@/lib/utils'
import { buildQueryWithPagination } from '@/lib/funcs'
import { columnsOfficesDestination } from '@/app/inbox/sendsAlerts/funcs/ValueListColumns'

const FormSIGEDOC = ({ form, sigedocData, disabled, originOfficeData }) => {
  const communications = form?.watch('communications')

  const searchUser = useSearch()
  const openModalUser = useBoolean()

  const destinyOffice = form?.watch('destinyOffice')

  const [userTransform, setSignersTransform] = useState([])

  const searchDestinyOffice = useSearch()

  const { mutateAsync: terceroRegistro, isPending: loadingTerceroRegistro } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlCgrInt',
      method: 'get',
      isCompanyRequest: true,
      url: `/SIGEDOC/consultar-tercero`,
      onSuccess: (response) => {
        if (response?.success) {
          const terceroExtract = response?.data?.terceraPersona
          form?.setValue('tercero.nombre', terceroExtract?.nombre ?? '')
          form?.setValue('tercero.apellido', terceroExtract?.apellidos ?? '')
          form?.setValue('tercero.correo', terceroExtract?.correo ?? '')
        }
      },
    })

  const handleBlurTercero = (ev) => {
    if (ev.target.value === '') return

    if (
      ev.target.name !== 'tercero.identificacion' &&
      ev.target.name !== 'tercero.tipoIdentificacion'
    )
      return

    const tercero = form?.getValues('tercero')
    if (tercero?.tipoIdentificacion === '' || tercero?.identificacion === '') return
    const qry = `/tipo-documento/${tercero.tipoIdentificacion}/numero-documento/${tercero.identificacion}`

    terceroRegistro({ qry })
  }

  const [cursorOffices, setCursorOffices] = useState()
  const [pageSizeOffices, setPageSizeOffices] = useState(50)
  const openModalOffice = useBoolean()

  const qryDO = buildQueryWithPagination(
    pageSizeOffices,
    cursorOffices,
    searchDestinyOffice?.searchText
  )
  const { data: destinityOffice, isLoading: loadingDestinityOffice } = useGetOffices({
    qry: qryDO,
  })

  const searchUsers =
    typeof destinyOffice?.TRDcode === 'string'
      ? destinyOffice.TRDcode.split(' ').join('')
      : destinyOffice?.TRDcode != null
      ? String(destinyOffice.TRDcode)
      : ''

  const { data: users, isLoading: loadingUsers } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    enabled: !!destinyOffice?.TRDcode,
    url: `/SIGEDOC/dependencia/${searchUsers}/usuarios`,
  })

  // Series

  const openModalSeries = useBoolean()
  const searchSeries = useSearch()

  const { data: series, isLoading: loadingSeries } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    enabled: !!originOfficeData?.TRDcode,
    url: `/SIGEDOC/dependencia/${originOfficeData?.TRDcode}/series-documentales`,
  })

  const seriesForm = form?.watch('serie')

  //Typology
  const { data: typology, isLoading: loadingTypology } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgrInt',
    url: `/SIGEDOC/serie/${seriesForm?.id}/tipologias-documentales`,
    enabled: !!seriesForm?.id,
  })

  //documentTypeRequest
  const { data: documentTypeRequest, isLoading: loadingDocumentTypeRequest } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: `/SIGEDOC/tiposDocumento`,
    enabled: !!originOfficeData,
  })

  useEffect(() => {
    const idTypology = sigedocData?.idTypology
    const defaultTypology = toArray(typology?.data)?.find((typology) => typology?.id === idTypology)
    form.setValue('typology', defaultTypology)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originOfficeData, seriesForm, typology?.data, sigedocData])

  useEffect(() => {
    const idDocumentType = sigedocData?.idDocumentType
    const defaultDocumentType = toArray(documentTypeRequest?.data)?.find(
      (documentType) => documentType?.id === idDocumentType
    )
    form.setValue('documentTypeRequest', defaultDocumentType)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentTypeRequest, sigedocData])

  useEffect(() => {
    if (users?.success === false) {
      toast.error('Error al cargar los usuarios')
      return
    }
    const newSignersStructure = userSigedoc(users?.data)
    setSignersTransform(newSignersStructure)
  }, [users?.data])

  useEffect(() => {
    if (destinityOffice?.error) {
      toast.error(destinityOffice?.error ?? 'Ha sucedido un error al obtener las dependencias')
      return
    }
  }, [loadingDestinityOffice, destinityOffice?.data])

  useEffect(() => {
    if (!disabled) {
      form?.setValue('userDestiny', { firstName: '', lastName: '' })
    }
  }, [destinyOffice])

  useEffect(() => {
    if (!disabled) {
      form?.setValue('typology', '')
      form?.setValue('folder', '')
    }
  }, [seriesForm])

  useEffect(() => {
    if (series?.error && !series?.success) {
      toast.error(series?.error ?? 'Ha sucedido un error al obtener las series')
    }
  }, [series])

  //TempSectValues

  const formByType = getFormByType({
    type: communications,
    infoUser: {
      data: userTransform,
      loading: loadingUsers,
      searchUser,
      openModal: openModalUser,
    },
    infoDestinityOffice: {
      data: destinityOffice,
      loading: loadingDestinityOffice,
      openModal: openModalOffice,
      searchOptions: searchDestinyOffice,
    },
    infoSeries: {
      data: series,
      loading: loadingSeries,
      openModal: openModalSeries,
    },
    infoTypology: {
      data: { data: toArray(typology?.data) },
      loading: loadingTypology,
    },
    infoDocumentTypeRequest: {
      data: { data: toArray(documentTypeRequest?.data) },
      loading: loadingDocumentTypeRequest,
    },
    disabled,
    handleBlurTercero,
  })

  const selectOptionVL = (row, name) => {
    form.setValue(name, row)
  }

  const paramsFilterOffices = {
    search: searchDestinyOffice,
    setCursor: setCursorOffices,
    setPageSize: setPageSizeOffices,
  }

  const { handlePaginationModelChange, rowCountState, paginationModel } = usePaginationGlobal(
    destinityOffice,
    paramsFilterOffices,
    loadingDestinityOffice
  )

  const VLS = [
    {
      title: 'Oficina Destino',
      openOptions: openModalOffice,
      columns: columnsOfficesDestination,
      rows: toArray(destinityOffice?.data),
      loading: loadingDestinityOffice,
      searchOptions: searchDestinyOffice,
      pagination: {
        handlePaginationModelChange,
        rowCountState,
        paginationModel,
      },
      selectedOption: (params) => {
        form.setValue('destinyOffice', params?.row)
      },
    },
    {
      title: 'Serie',
      openOptions: openModalSeries,
      columns: subseriesColumns,
      rows: toArray(series?.data),
      loading: loadingSeries,
      searchOptions: searchSeries,
      selectedOption: (params) => {
        form.setValue('serie', params?.row)
      },
    },
    {
      title: 'Usuarios',
      openOptions: openModalUser,
      columns: columnsValueListUsers,
      rows: toArray(userTransform),
      loading: loadingUsers,
      searchOptions: searchUser,
      selectedOption: (params) => {
        selectOptionVL(params?.row, 'userDestiny')
      },
    },
  ]

  const selectVL = (VLS) => {
    const vl = VLS.find((vl) => !!vl.openOptions.show)
    return vl
  }

  const vl = selectVL(VLS)

  return (
    <>
      <BackdropLoading loading={loadingTerceroRegistro} />
      <Grid
        item
        xs={12}
      >
        <Controller
          name='communications'
          control={form?.control}
          rules={{ required: 'Este campo es requerido' }}
          render={({ field, fieldState: { error } }) => {
            const helperText = error ? error.message : ''
            return (
              <GenericSelect
                label='Tipo de SIGEDOC *'
                options={[
                  { label: 'Comunicación Externa Recibida', value: 'ER' },
                  { label: 'Comunicación Interna Enviada', value: 'IE' },
                  { label: 'Comunicación Externa Enviada', value: 'EE' },
                ]}
                error={!!error}
                helperText={helperText}
                {...field}
                disabled={true}
              />
            )
          }}
        />
      </Grid>
      <GenericForm
        inputs={formByType}
        control={form?.control}
      />
      <ValueListGlobal {...vl} />
    </>
  )
}

export default FormSIGEDOC
